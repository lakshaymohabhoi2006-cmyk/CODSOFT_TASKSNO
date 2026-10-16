const express = require('express');
const mongoose = require('mongoose');
const Result = require('../models/Result');
const requireAuth = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

router.get('/mine', async (req, res, next) => {
  try {
    const results = await Result.find({ user: req.user.id })
      .populate('quiz', 'title')
      .sort({ createdAt: -1 });
    return res.json({
      results: results.map((result) => ({
        id: result._id,
        quizTitle: result.quiz?.title || 'Deleted quiz',
        score: result.score,
        total: result.total,
        createdAt: result.createdAt,
      })),
    });
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Result not found.' });
    }
    const result = await Result.findOne({ _id: req.params.id, user: req.user.id }).populate(
      'quiz',
      'title'
    );
    if (!result) return res.status(404).json({ message: 'Result not found.' });

    return res.json({
      result: {
        id: result._id,
        quizTitle: result.quiz?.title || 'Deleted quiz',
        score: result.score,
        total: result.total,
        questions:
          result.reviewQuestions.map((question, index) => ({
            text: question.text,
            options: question.options,
            selectedIndex: result.answers[index],
            correctIndex: question.correctIndex,
          })),
      },
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
