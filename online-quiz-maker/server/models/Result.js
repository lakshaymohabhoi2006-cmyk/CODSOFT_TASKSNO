const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema(
  {
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    answers: { type: [Number], required: true },
    reviewQuestions: [
      {
        text: { type: String, required: true },
        options: { type: [String], required: true },
        correctIndex: { type: Number, required: true },
      },
    ],
    score: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Result', resultSchema);
