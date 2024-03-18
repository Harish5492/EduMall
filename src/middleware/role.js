const model = require('../models/usermodel');

require('dotenv').config()

class role{
 async isAdminEmail (req, res, next) {
    try{
     console.log("inside isAdminEmail",req.body)
     const { usernameOrEmail } = req.body
     const userData = await model.findOne({ email: usernameOrEmail }, 'email firstName role').exec();
console.log(userData)
     if (!userData || (userData.role !== 'subAdmin' && userData.role !== 'admin')) throw { message: "Access Denied : Unauthorized Access", status: false };
    next()
    }
    catch(err) {
        return res.send(err)
    }
} 
async isAdmin (req, res, next) {
    try{
     console.log("inside isAdmin")
     const { decodedToken } = req.body
     if (decodedToken.role !== 'admin') throw { message: "only admin can access", status: false };
    next()
    }
    catch(err) {
        return res.send(err)
    }
}
async isSubAdmin (req, res, next) {
    try{
     console.log("inside isSubAdmin")
     const { decodedToken } = req.body
     if (decodedToken.role !== 'subAdmin' && decodedToken.role!== 'admin') throw { message: "only admin and sub admin can access", status: false };
    next()
    }
    catch(err) {
        return res.send(err)
    }
}
}
module.exports = new role();