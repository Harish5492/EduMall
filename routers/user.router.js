const userRouter = require('express').Router();
const userController = require('../controllers/usercontroller');
const { validateSignup, handleValidationErrors } = require('../middleware/expressvalidator');
const authMiddleware = require('../middleware/authenticate');

userRouter.post('/signUp', validateSignup, handleValidationErrors, userController.signUp)
userRouter.get('/getUser', userController.getUser);
userRouter.get('/getAllUsers', userController.getAllUsers),
userRouter.post('/login', userController.login);
userRouter.put('/updateUser/:id', userController.updateUser);
userRouter.delete('/removeUser/:id', userController.removeUser);
userRouter.put('/forgotPassword/:email', validateSignup[4], validateSignup[5], handleValidationErrors, userController.forgotPassword);
userRouter.get('/profile', authMiddleware, userController.profile);

userRouter.post('/changePassword',validateSignup[5],validateSignup[6],handleValidationErrors,userController.updatePassword); 
userRouter.get('/getUserbyID/:id', userController.getUserbyID);
userRouter.get('/myCourses',authMiddleware,userController.myCourses);
userRouter.get('/referalCode',authMiddleware,userController.referalCode)

module.exports = userRouter;    