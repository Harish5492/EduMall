const asbRouter = require('express').Router();
const Controller = require('../controllers/index')
const { ASBController } = Controller.module
const authMiddleware = require('../middleware/authenticate');
const role = require('../middleware/role')
asbRouter.post('/addCourse', authMiddleware, role.isAdmin, ASBController.addCourse)
asbRouter.post('/updateCourse/:id', authMiddleware, role.isAdmin, ASBController.updateCourse)
asbRouter.get('/getAllCourses', ASBController.getAllCourses)
asbRouter.get('/getCourseById/:id', ASBController.getCourseById)
asbRouter.delete('/deleteCourse/:id', authMiddleware,role.isAdmin, ASBController.deleteCourse)
asbRouter.post('/asbStudentEnroll', ASBController.asbStudentEnroll)


module.exports = asbRouter;