// const { Number } = require('twilio/lib/twiml/VoiceResponse');
const billing = require('../models/billingmodel')
const payment = require('../models/payment.model')
const { Course } = require('../models/coursemodel')
const model = require('../models/usermodel')
const axios = require('axios');
const Helper = require('../helper/index');
const { decode } = require('jsonwebtoken');
const { sendNotificationToAll } = require('../websocket/websocket');
const { paymentHelper } = Helper.module
require("dotenv").config();
// const paymentMerchantId = process.env.MERCHANTID
const paymentMerchantId = 'PGTESTPAYUAT'

class BillingController {

  async billingDetails(req, res) {
    try {
      console.log('inside billingDetails')
      await billing.create({ ...req.body })
      res.json({ message: "details Added" })
    }
    catch (error) {
      res.status(500).send(error)
    }
  }

  async getDetails(req, res) {
    try {
      console.log("inside get payment Details");
      const { decodedToken } = req.body

      const page = parseInt(req.query.page) || 1;
      const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
      const skip = (page - 1) * itemsPerPage;

      // Extract the search query from the request
      const searchQuery = req.query.search || '';

      // Use the regex in the query to filter the data
      let details = await payment.find({
        $or: [
          { email: { $regex: new RegExp(searchQuery, 'i') } },
          { amount: { $regex: new RegExp(searchQuery, 'i') } },
          { status: { $regex: new RegExp(searchQuery, 'i') } },

        ]
      })
        .skip(skip)
        .limit(itemsPerPage)
        .exec();
      console.log("details", details)

      let totalRecords = await payment.countDocuments({
        $or: [
          { email: { $regex: new RegExp(searchQuery, 'i') } },
          { amount: { $regex: new RegExp(searchQuery, 'i') } },
          { status: { $regex: new RegExp(searchQuery, 'i') } },

        ]
      })

      // console.log("before if")
      // if(details.length==0){
      //   console.log("inside if")
      //    details = await payment.find()
      // .skip(skip)
      // .limit(itemsPerPage)
      // .exec();

      //  totalRecords = await payment.countDocuments()

      // }


      res.json({
        status: true, details, totalRecords,
        role: decodedToken.id
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
        status: false
      });
    }
  }





  async payment(req, res) {
    console.log("inside payment", req.body)
    try {
      const { totalPrice, queryString, decodedToken, affiliateToken } = req.body
      const student = decodedToken.id
      console.log("studentid", student)
      const queryParams = queryString.split('&');
      const productIds = queryParams.map(param => {
        const [, productId] = param.split('='); // Using destructuring to get the second part after '='
        return productId
      })
      console.log("id", productIds)
      console.log("affiliateTokenaffiliateTokenaffiliateToken", affiliateToken)
      console.log("affiliateToken.....", affiliateToken)
      await paymentHelper.alreadyHaveCourse(decodedToken, productIds)
      await paymentHelper.checkAmount(productIds, totalPrice)

      // const que = `${queryString}&student=${student}`
      // ... (previous code)
      const encodedToken = encodeURIComponent(affiliateToken);
      console.log("daffffffffffffffffaaaaaaaaaaaa",affiliateToken,"fffffffff",encodedToken)
      const que = `${queryString}&student=${student}&affiliateToken=${encodedToken}&totalPrice=${totalPrice}`;


      const merchantTransactionId = paymentHelper.generateTransactionId()
      const data = paymentHelper.getData(merchantTransactionId, totalPrice, que)
      const { checksum, payloadMain } = paymentHelper.hashing(data)
      const options = paymentHelper.getOptions(checksum, payloadMain, affiliateToken)

      const paymentDetail = {
        user: student,
        merchantTransactionId: merchantTransactionId,
        amount: totalPrice,
        email: decodedToken.email,
        courseBought: productIds
      }
      console.log(paymentDetail)
      await paymentHelper.addPayment(paymentDetail)

      axios.request(options).then(function (response) {
        console.log("inside axios request")
        console.log(response.data.data.instrumentResponse.redirectInfo.url)

        res.send(response.data.data.instrumentResponse.redirectInfo.url)
        // res.send({message:'successful'})
      })
        .catch(function (error) {
          console.error(error);
          throw error;
        });

    } catch (error) {
      res.status(500).send({
        message: error.message,
        success: false
      })
    }
  }


  async checkStatus(req, res) {
    console.log("query", req.query)
    const { course, student, totalPrice } = req.query
    const merchantTransactionId = req.params['txnId']
    const affiliateToken = (req.query.affiliateToken) || '';


    console.log("affiliation",affiliateToken)
    const merchantId = paymentMerchantId
    const { checksum } = paymentHelper.checkHashing(merchantTransactionId)
    const options = paymentHelper.getCheckOptions(merchantId, merchantTransactionId, checksum)
    axios.request(options).then(async (response) => {
      console.log("inside")
      if (response.data.success === true && response.data.code != "PAYMENT_PENDING") {

        await paymentHelper.addCourse(student, course)
        await paymentHelper.updateStatus(merchantTransactionId, "Success")
        await paymentHelper.studentEnrolled(student, course)
        sendNotificationToAll(`Congratulations, successfully purchased`);

        if (affiliateToken !='') {
          const affiliateToken1 = decodeURIComponent(affiliateToken);
          console.log("decoded",affiliateToken1)
          await paymentHelper.updateReward(affiliateToken1, totalPrice)
        }
        console.log("insideUpdateCheck", affiliateToken)
        // return res.status(200).send({ success: true, message: "Payment Success" });

        return res.redirect('http://10.10.2.30:3000/mycourses')

      } else if (response.data.success === false && response.data.code != "PAYMENT_PENDING") {
        paymentHelper.updateStatus(merchantTransactionId, "Failure")
        return res.status(400).send({ success: false, message: "Payment Failure" });
      }
      else {
        return res.status(400).send({ success: false, message: "Payment Pending" });
      }
    })
      .catch((err) => {
        console.error("rrrrrrrrrrrrrrr", err);
        res.status(500).send({ msg: err.message });
      });

  };



  async deleteMany(req, res) {
    try {
      console.log("inside delete")
      console.log(req.params.id)

      const del = await payment.deleteMany({ user: req.params.id }, (error, result) => {
        if (error) {
          console.error(error);
        } else {
          console.log(`${result.deletedCount} documents deleted`);
        }
      }
      )
      // console.log(del)
      res.send({ status: true, del })
    }
    catch (error) {
      res.status(500).send(error)
    }
  }
};

module.exports = new BillingController();