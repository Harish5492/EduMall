const questionRouter = require('express').Router();

const authMiddleware = require('../middleware/authenticate');
const role = require('../middleware/role')
const User = require('../models/usermodel');
const Question = require('./models/questionsSchema');
const UserResponse = require('./models/responseSchema');


questionRouter.post('/addQuestions',authMiddleware,role.isAdmin, async (req, res) => {
    try {
      const { questionText, options, correctOptionIndex,subject } = req.body;
      const question = new Question({ questionText, options, correctOptionIndex,subject });
      await question.save();
      res.status(201).json(question);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Route for fetching questions for the test
  questionRouter.get('/getSubjects',authMiddleware, async (req, res) => {
    try {
      console.log("inside getSubjects")
      const subjects = await Question.distinct('subject');
      res.json({subjects,status:true});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  questionRouter.get('/getAllQuestions/:subject',authMiddleware, async (req, res) => {
    try {
      console.log("inside getallquestions",req.params.subject)
      const questions = await Question.find({subject:req.params.subject}).select('options _id questionText');
      res.json({questions,status:true});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  // Route for submitting user responses
  questionRouter.post('/submit', authMiddleware, async (req, res) => {
    try {
        console.log("inside questions submit", req.body);

        const { decodedToken, responses, subject } = req.body;

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
            percentage: percentage,
            subject:subject
        });

        res.json({ status: true, score, totalQuestions, percentage });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  questionRouter.get('/getResponses',authMiddleware,role.isAdmin, async (req, res) => {
    try {
      console.log("inside getResponses")

      const responses = await UserResponse.find().populate({
      path: 'userId',
      select: 'firstName lastName email' // Specify the field you want to include
  });

      res.json({responses,status:true});
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });
  
  

module.exports = questionRouter;
