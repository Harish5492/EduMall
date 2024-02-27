const otpRouter = require('express').Router();
const Controller = require('../controllers/index')
const {UserController} = Controller.module

otpRouter.get('/generateOTP', UserController.generateOTP),
otpRouter.get('/otpbyemail',UserController.otpbyemail),
otpRouter.get('/verifyOTP',UserController.verifyOTP),


module.exports = otpRouter;