// const coursemodel = require('../models/coursemodel')
const UserDetails = require('../models/usermodel');
const { Course, Lesson } = require('../models/coursemodel');
const {AffiliateMarketings,AffiliateDetails} = require('../models/affiliatemodel')  // Remove curly braces
const rewardPayment = require('../models/rewardPayment')
const payment = require('../models/payment.model')




class dashboardController {
    async dashboardData(req, res) {
        try {
            const totalUserCount = await UserDetails.countDocuments();
            const courseCount = await Course.countDocuments();
            let totalRewards = await AffiliateMarketings.aggregate([
                {
                    $group: {
                        _id: null,
                        totalRewards: { $sum: "$totalRewards" }
                    }
                }
            ]);
            
            // Check if totalRewards array is empty
            if (totalRewards.length === 0) {
                // If it's empty, set totalRewards to 0 or any other default value
                totalRewards = [{ totalRewards: 0 }];
            }
            
            const userCount = await UserDetails.countDocuments({ role: 'user' });
            const adminCount = await UserDetails.countDocuments({ role: 'admin' });
            const subadminCount = await UserDetails.countDocuments({ role: 'subAdmin' });
            
            res.json({ status: true, totalUserCount, courseCount, totalRewards: totalRewards[0].totalRewards, userCount, adminCount, subadminCount });
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

module.exports = new dashboardController();