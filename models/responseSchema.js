const mongoose = require('mongoose');
console.log(mongoose.models)
const userResponseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDetails',
    required: true
  },
  responses: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true
    },
    selectedOptionIndex: {
      type: Number,
      required: true
    }
  }],
  score: {
    type: Number,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  },
  subject: {
    type: String,
    required: true
  }
}, { timestamps: true });

const UserResponse = mongoose.model('UserResponse', userResponseSchema);

module.exports = UserResponse;