const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  }, 
  options: [{
    type: String,
    required: true
  }],
  correctOptionIndex: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
