const Question = require('../models/questionsSchema');
const UserResponse = require('../models/responseSchema');
class QuestionsAns{

 async question (req, res) {
    try {
      console.log("inside question add",req.body)
      const { questionText, options, correctOptionIndex,subject } = req.body;
      const question = new Question({ questionText, options, correctOptionIndex,subject });
      await question.save();
      res.status(201).json(question);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  
  async getSubjects(req,res){
    try {
      console.log("inside getSubjects")
      const subjects = await Question.distinct('subject');
      res.json({subjects,status:true});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    }
  }
 async getSubjectCount(req, res) {
    try {
        console.log("inside getSubjects");
        const subjects = await Question.aggregate([
            {
                $group: {
                    _id: "$subject",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    subject: "$_id",
                    count: 1
                }
            }
        ]);

        res.json({ subjects, status: true });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
}

  
  async getAllQuestions(req,res){ 
    try {
      console.log("inside getallquestions",req.params.subject)
      const questions = await Question.find({subject:req.params.subject}).select('options _id questionText');
      res.json({questions,status:true});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    }
  }
   async getAllQuestionsDirect(req, res) {
    try {
      console.log("inside getallquestions")
      const questions = await Question.find().select('_id questionText createdAt subject ');
      res.json({questions,status:true});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    }
  } async getQuestionById (req, res) {
    try {
      console.log("inside getQuestions",req.params.id)
      const {id} = req.params
      
      const questions = await Question.findById(id);
      res.json({questions,status:true});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    } 
  }
 async updateQuestion (req, res)  {
    try {
        const { id } = req.params;
        const updatedQuestion = req.body;
  
        const question = await Question.findByIdAndUpdate(id, updatedQuestion, { new: true });
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
  
        res.json({ question, status: true });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
  }

  // Route for deleting a question
  async deleteQuestion (req, res) {
  try {
    console.log("inside deleteQuestion",req.params)
      const { id } = req.params;

      const deletedQuestion = await Question.findByIdAndDelete(id);
      if (!deletedQuestion) {
          return res.status(404).json({ message: 'Question not found' });
      }

      res.json({ message: 'Question deleted successfully', status: true });
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
  }
  }
  
  async Submit(req,res){ try {
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
      res.status(500).send('Internal  Server Error');
    }
  }

  async getResponse(req,res){ try {
      console.log("inside getResponses")

      const responses = await UserResponse.find().populate({
      path: 'userId',
      select: 'firstName lastName email' // Specify the field you want to include
  });

      res.json({responses,status:true});
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }
}
  
  

module.exports = new QuestionsAns()
