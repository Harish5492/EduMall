const mongoose = require('mongoose');

const userResponseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
  }
}, { timestamps: true });

const UserResponse = mongoose.model('UserResponse', userResponseSchema);

module.exports = UserResponse;