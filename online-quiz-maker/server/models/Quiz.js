const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true, maxlength: 500 },
    options: {
      type: [{ type: String, required: true, trim: true, maxlength: 200 }],
      validate: {
        validator: (options) => options.length >= 2,
        message: 'Each question needs at least two options.',
      },
    },
    correctIndex: { type: Number, required: true, min: 0 },
  },
  { _id: true }
);

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, trim: true, maxlength: 500, default: '' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    questions: {
      type: [questionSchema],
      validate: {
        validator: (questions) => questions.length > 0,
        message: 'A quiz must have at least one question.',
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Quiz', quizSchema);
