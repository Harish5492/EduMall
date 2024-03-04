const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  selectedOptionIndex: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;
