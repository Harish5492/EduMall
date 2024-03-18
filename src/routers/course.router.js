const courseRouter = require('express').Router();
const Controller = require('../controllers/index');
const { CourseController } = Controller.module;

const authMiddleware = require('../middleware/authenticate');
const role = require('../middleware/role');
courseRouter.get('/allCourses', CourseController.getAllCourses);
courseRouter.get('/getCourse/:id', CourseController.getCourseById);
courseRouter.get(
  '/allCourses/:id',
  authMiddleware,
  CourseController.getAllLesson
);

module.exports = courseRouter;
