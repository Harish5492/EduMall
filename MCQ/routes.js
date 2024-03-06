const questionRouter = require('express').Router();

const authMiddleware = require('../middleware/authenticate');
const role = require('../middleware/role')

const Question = require('./models/questionsSchema');
const UserResponse = require('./models/responseSchema');

questionRouter.post('/addQuestions', async (req, res) => {
    try {
      const { questionText, options, correctOptionIndex } = req.body;
      const question = new Question({ questionText, options, correctOptionIndex });
      await question.save();
      res.status(201).json(question);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Route for fetching questions for the test
  questionRouter.get('/getAllQuestions',authMiddleware, async (req, res) => {
    try {
      console.log("inside getallquestions")
      const questions = await Question.find().select('options _id questionText');
      res.json(questions);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  // Route for submitting user responses
  questionRouter.post('/submit', authMiddleware, async (req, res) => {
    try {
        console.log("inside questions submit", req.body);

        const { decodedToken, responses } = req.body;

        // Validate user ID and responses
        if (!decodedToken.id || !responses || !Array.isArray(responses)) {
            return res.status(400).json({ msg: 'Invalid request body' });
        }

        const userResponses = [];

        // Calculate score
        let score = 0;
        for (const response of responses) {
            const question = await Question.findById(response.questionId);
            if (!question) {
                return res.status(400).json({ msg: 'Question not found' });
            }
            if (question.correctOptionIndex === response.selectedOptionIndex) {
                score++;
            }
            userResponses.push({
                questionId: response.questionId,
                selectedOptionIndex: response.selectedOptionIndex
            });
        }

        // Calculate percentage
        const totalQuestions = responses.length;
        let percentage = (score / totalQuestions) * 100;
        percentage = percentage.toFixed(2);

        // Save user responses to the database
        await UserResponse.create({
            userId: decodedToken.id,
            responses: userResponses,
            score: score,
            percentage: percentage
        });

        res.json({ status: true, score, totalQuestions, percentage });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  

module.exports = questionRouter;
