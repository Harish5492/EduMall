const adminRouter = require('express').Router();
const Controller = require('../controllers/index')
const { AffiliateController, BillingController, CourseController,ReferalController,UserController,RewardToSubAdminController,DashboardController} = Controller.module
const authMiddleware = require('../middleware/authenticate');
const role = require('../middleware/role')

adminRouter.post('/login', role.isAdminEmail , UserController.login);
adminRouter.get('/profile', authMiddleware, role.isSubAdmin ,UserController.profile);
adminRouter.get('/getUserbyID/:id',authMiddleware, role.isAdmin, UserController.getUserbyID);
adminRouter.post('/addCourse',authMiddleware, role.isAdmin, CourseController.addCourse)
adminRouter.post('/addLesson',authMiddleware, role.isAdmin, CourseController.addLesson)
adminRouter.get('/courseLink/:id',authMiddleware,role.isSubAdmin,AffiliateController.courseLink)
adminRouter.get('/allCourses', CourseController.getAllCourses)
adminRouter.get('/getCourse/:id', CourseController.getCourseById)
adminRouter.get('/allCourses/:id',authMiddleware, CourseController.getAllLesson)
adminRouter.post('/updateLesson/:id',authMiddleware, role.isAdmin, CourseController.updateLesson)
adminRouter.post('/updateCourse/:id',authMiddleware, role.isAdmin, CourseController.updateCourse)
adminRouter.post('/addMultipleLesson',authMiddleware,role.isAdmin, CourseController.addMultipleLesson)
adminRouter.delete('/deleteCourse/:id',authMiddleware,role.isAdmin, CourseController.deleteCourse)
adminRouter.delete('/deleteLesson/:id',authMiddleware,role.isAdmin, CourseController.deleteLesson)
adminRouter.get('/pendingRequests',authMiddleware,role.isAdmin,AffiliateController.pendingRequests)
adminRouter.post('/affiliationRequestAction/:id',authMiddleware,role.isAdmin,AffiliateController.affiliationRequestAction)

adminRouter.get('/affiliationRecords',authMiddleware,role.isSubAdmin,AffiliateController.affiliationRecords)

adminRouter.get('/payment/getDetails',authMiddleware,role.isAdmin,BillingController.getDetails)


adminRouter.get('/dashboard',authMiddleware,role.isSubAdmin,DashboardController.dashboardData)

module.exports = adminRouter ; 