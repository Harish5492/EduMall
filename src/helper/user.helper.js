const bcrypt = require('bcrypt');
const Question = require('../models/questionsSchema');
const model = require('../models/usermodel');

class UserHelper {

  async encryptPassword(userPassword) {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(userPassword, salt);
    console.log("password", password)
    return password;

  }

  async updateData(email, password) {
    await model.findOneAndUpdate(
      { email: email },
      { password: password },
      { new: true }
    ); 
  }

  async userCheck(email, userName, phoneNumber) {
    console.log("inside usercheck")
    const emailExist = await model.findOne({ email: email })
    if (emailExist) throw { message: "Email already exists", status: false };
    const usernameExist = await model.findOne({ userName: userName })
    if (usernameExist) throw { message: "UserName already exists", status: false };
    const phoneExist = await model.findOne({ phoneNumber: phoneNumber })
    if (phoneExist) throw { message: "phoneNumber already exists", status: false }
  }

  async checkRequest(decodedToken,responses){
    if (!decodedToken.id || !responses || !Array.isArray(responses)) {
      return res.status(400).json({ msg: 'Invalid request body' });
  }
  }

async calculateScore(responses){
  const userResponses = [];
 
  // Calculate score
  let score = 0;
  for (const response of responses) {
      const question = await Question.findById(response.questionId);
      if (!question) {
          return res.status(400).json({ msg: 'Question not found' });
      }
      if (question.correctOptionIndex === response.selectedOptionIndex) {
          score++;
      }
      userResponses.push({
          questionId: response.questionId,
          selectedOptionIndex: response.selectedOptionIndex
      });
  }

  return {userResponses,score};
}
}

module.exports = new UserHelper()