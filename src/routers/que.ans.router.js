const questionRouter = require('express').Router();
const authMiddleware = require('../middleware/authenticate');
const questionAnsController = require('../controllers/questionsAns')
const role = require('../middleware/role')
questionRouter.post('/addQuestions',authMiddleware,role.isAdmin,questionAnsController.question)
questionRouter.get('/getSubjects',authMiddleware,questionAnsController.getSubjects)
questionRouter.get('/getAllQuestions/:subject',authMiddleware,questionAnsController.getAllQuestions)
questionRouter.post('/submit',authMiddleware,questionAnsController.Submit)
questionRouter.get('/getResponses',authMiddleware,role.isAdmin,questionAnsController.getResponse)
questionRouter.get('/getSubjectsCount',questionAnsController.getSubjectCount)
questionRouter.get('/getAllQuestions',authMiddleware,questionAnsController.getAllQuestionsDirect)
questionRouter.get('/getQuestion/:id',authMiddleware,questionAnsController.getQuestionById)
questionRouter.put('/updateQuestion/:id',authMiddleware,questionAnsController.updateQuestion)
questionRouter.delete('/deleteQuestion/:id',authMiddleware,questionAnsController.updateQuestion)

module.exports = questionRouter