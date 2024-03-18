const affiliateRouter = require('express').Router();
const Controller = require('../controllers/index')
const { AffiliateController} = Controller.module
const authMiddleware = require('../middleware/authenticate');
const role = require('../middleware/role')

affiliateRouter.post('/affiliateRequestStatus',authMiddleware,AffiliateController.affiliationRequestStatus)
affiliateRouter.post('/affiliationRequest',authMiddleware,AffiliateController.affiliationRequest)



module.exports = affiliateRouter ;