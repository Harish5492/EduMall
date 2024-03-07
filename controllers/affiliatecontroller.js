const mongoose = require('mongoose')
const affiliateRequest = require('../models/affiliateRequestmodel')
const { Course } = require('../models/coursemodel');
const {AffiliateMarketings,AffiliateDetails} = require('../models/affiliatemodel')  // Remove curly braces
const {sendNotificationToAll} = require('../websocket/websocket');
const model = require('../models/usermodel');
const validStatus = ['Success', 'Failure', 'Pending'];
const CryptoJS = require("crypto-js");
const Helper = require('../helper/index');
const { checkEmail } = require('../helper/otp.helper');

const { referalAndAffiliate } = Helper.module


require('dotenv').config(); 

const key = process.env.AFFILIATETOKENKEY
class affiliate {

    async affiliationRequestStatus(req, res) {
        try {
            console.log(req.body)
            const { decodedToken } = req.body
            const stat = await affiliateRequest.findOne({ requestorID: decodedToken.id })
                .sort({ requested_on: -1 }) // Sort in descending order based on createdAt (replace with your actual timestamp field)
                .exec()
         

            if (stat) {
                if (stat.requestStatus === 'Pending') {
                    res.json({ message: "Affiliation Request is Pending", status: true })
                }
                else if (stat.requestStatus === 'Success') {
              
                    res.json({ message: "Affiliation Request is Accepted ", status: true })
                }
                else {
                    res.json({ message: "Affiliation Request is Rejected ", status: true })
                }

            }

            else res.json({ message: "Please send request First ", status: false })
           
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async courseLink(req, res) {
        try {
            console.log("inside CourseLink")
            const { decodedToken } = req.body
            const { id } = req.params
            console.log(decodedToken,id)

            const check = await AffiliateMarketings.findOne({affiliator: decodedToken.id}).populate('courseDetails')
            if(check){
                 for (let elem of check.courseDetails){
                    if(elem.courseId == id){
                        console.log("insie",elem.courseId) 
                        // const token 
                        return res.json({ message: "token already sent", status: true,token: elem.affiliateToken  })
                    }
                 }
            }
            
            const Data = await Course.findById(id)
            const courseData = { course_id: Data.id, course_title: Data.title, course_instructor: Data.instructor, user_id: decodedToken.id }
            const token = CryptoJS.AES.encrypt(JSON.stringify(courseData), key).toString();
            const document = await AffiliateDetails.create({ courseId: Data._id, affiliateToken: token });

            const exists = await AffiliateMarketings.findOne({ affiliator: decodedToken.id })

            if (exists) {
            await AffiliateMarketings.findOneAndUpdate(
                { affiliator: decodedToken.id}, // Find the user by ID
            {
              $push: { courseDetails : document._id }
            } )

              } else {
                await AffiliateMarketings.create({ courseDetails : [document._id ], affiliator: decodedToken.id  })

              }
            console.log("token",token)
            res.json({ message: "token sent", status: true, token })
        }
        catch (error) {
            res.status(500).send(error.message)
        }
    }



    async affiliationRequest(req, res) {
        try {
            const { decodedToken } = req.body;
            const check = await model.findById(decodedToken.id, 'affilliationLinkRequested')

            if (!check.affilliationLinkRequested) throw { message: "already requested", status: false }

            console.log(decodedToken)
            await affiliateRequest.create({ requestorID: decodedToken.id, requestorEmail: decodedToken.email });

            await model.findByIdAndUpdate(
                decodedToken.id,
                { $set: { affilliationLinkRequested: false } }
            )
            sendNotificationToAll(`New Affiliation Request has been send by User having email is : - ${decodedToken.email} Sent Kindly Check!`);
         

            res.json({ message: "Request Sent", status: true })

        } catch (error) {
            res.status(500).send(error);
        }
    }
    async pendingRequests(req, res) {
        try {
            const { decodedToken } = req.body;
            console.log(decodedToken);

            const page = parseInt(req.query.page) || 1;
            const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
            const skip = (page - 1) * itemsPerPage;

            // Extract the search query from the request
            const searchQuery = req.query.search || '';

            // Create a case-insensitive regular expression for searching
            const searchRegex = new RegExp(searchQuery, 'i');

            const allRequests = await affiliateRequest.find({
                // Add the case-insensitive search condition
                $or: [
                    { requestorEmail: { $regex: searchRegex } },
                    // { requestorID: { $regex: searchRegex } },  // Replace 'fieldName1' with the actual field name you want to search
                    { requestStatus: { $regex: searchRegex } },  // Replace 'fieldName2' with another field if needed
                    // Add more fields as needed
                ]
            })
                .skip(skip)
                .limit(itemsPerPage)
                .exec();

            console.log("allRequests", allRequests);

            const totalRequests = await affiliateRequest.countDocuments({
                // Add the same case-insensitive search condition for counting total documents
                $or: [
                    { requestorEmail: { $regex: searchRegex } },
                    { requestStatus: { $regex: searchRegex } },
                    // Add more fields as needed
                ]
            });

            res.json({ message: "these are all requests", status: true, allRequests, totalRequests });

        } catch (error) {
            res.status(500).send(error);
        }
    }


    async affiliationRequestAction(req, res) {
        try {
            console.log("inside req action", req.body)
            const { decodedToken } = req.body;
            const { id } = req.params;
            const { status, remarks } = req.body;
            console.log("role is ", decodedToken.role)
            const check = await affiliateRequest.findById(id)
            console.log("Check", check)
            if (check.requestStatus !== 'Pending') throw { message: "Unauthorized task" }

            await referalAndAffiliate.reqAction(id, status, remarks, decodedToken)
            res.json({ message: "Updated", status: true })

        } catch (error) {
            res.status(500).send(error);
        }
    }

     async affiliationRecords(req, res) {
        try {
            console.log("inside affiliationRecords",req.body)

            const {decodedToken} = req.body

            const records = await AffiliateMarketings.findOne({affiliator:decodedToken.id}).populate({
                path: 'courseDetails',
                populate: {
                    path: 'courseId',
                    model: 'Course' 
                }
            })

            console.log(records)
            res.json({ message: "Your Records : ",records, status: true })

        } catch (error) {
            res.status(500).send(error);
        }
    }


}




module.exports = new affiliate();