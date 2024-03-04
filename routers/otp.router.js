const otpRouter = require('express').Router();
const Controller = require('../controllers/index')
const {UserController} = Controller.module

otpRouter.post('/generateOTP', UserController.generateOTP),
otpRouter.get('/otpbyemail',UserController.otpbyemail),
otpRouter.post('/verifyOTP',UserController.verifyOTP),


module.exports = otpRouter;