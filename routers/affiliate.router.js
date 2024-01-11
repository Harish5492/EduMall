const affiliateRouter = require('express').Router();
const affiliateController = require('../controllers/affiliatecontroller')
const authMiddleware = require('../middleware/authenticate');

affiliateRouter.post('/affiliateLink/:id',authMiddleware,affiliateController.affiliateLink)
affiliateRouter.get('/pendingRequests',authMiddleware,affiliateController.pendingRequests)
affiliateRouter.post('/affiliationRequest',authMiddleware,affiliateController.affiliationRequest)
affiliateRouter.post('/affiliationRequestAction/:id',authMiddleware,affiliateController.affiliationRequestAction)



module.exports = affiliateRouter ;