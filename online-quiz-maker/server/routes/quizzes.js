const express = require('express');
const mongoose = require('mongoose');
const Quiz = require('../models/Quiz');
const Result = require('../models/Result');
const requireAuth = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

function validQuestions(questions) {
  return (
    Array.isArray(questions) &&
    questions.length > 0 &&
    questions.every(
      (question) =>
        question.text?.trim() &&
        Array.isArray(question.options) &&
        question.options.length >= 2 &&
        question.options.every((option) => typeof option === 'string' && option.trim()) &&
        Number.isInteger(question.correctIndex) &&
        question.correctIndex >= 0 &&
        question.correctIndex < question.options.length
    )
  );
}

function quizInput(body) {
  return {
    title: body.title.trim(),
    description: body.description?.trim() || '',
    questions: body.questions.map((question) => ({
      text: question.text.trim(),
      options: question.options.map((option) => option.trim()),
      correctIndex: question.correctIndex,
    })),
  };
}

router.get('/mine', async (req, res, next) => {
  try {
    const quizzes = await Quiz.find({ createdBy: req.user.id })
      .select('title description questions createdAt')
      .sort({ createdAt: -1 });
    return res.json({ quizzes });
  } catch (error) {
    return next(error);
  }
});

router.get('/', async (_req, res, next) => {
  try {
    const quizzes = await Quiz.find()
      .select('title description questions createdBy createdAt')
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });
    return res.json({
      quizzes: quizzes.map((quiz) => ({
        id: quiz._id,
        title: quiz.title,
        description: quiz.description,
        questionCount: quiz.questions.length,
        createdBy: quiz.createdBy?.name || 'Quiz maker',
        createdAt: quiz.createdAt,
      })),
    });
  } catch (error) {
    return next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    if (!req.body.title?.trim() || !validQuestions(req.body.questions)) {
      return res.status(400).json({ message: 'Add a title and at least one valid question with two options.' });
    }

    const quiz = await Quiz.create({ ...quizInput(req.body), createdBy: req.user.id });
    return res.status(201).json({ quiz: { id: quiz._id, title: quiz.title } });
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Quiz not found.' });
    }
    const quiz = await Quiz.findById(req.params.id).populate('createdBy', 'name');
    if (!quiz) return res.status(404).json({ message: 'Quiz not found.' });

    return res.json({
      quiz: {
        id: quiz._id,
        title: quiz.title,
        description: quiz.description,
        createdBy: quiz.createdBy?.name || 'Quiz maker',
        questions: quiz.questions.map(({ text, options }) => ({ text, options })),
      },
    });
  } catch (error) {
    return next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Quiz not found.' });
    }
    if (!req.body.title?.trim() || !validQuestions(req.body.questions)) {
      return res.status(400).json({ message: 'Add a title and at least one valid question with two options.' });
    }

    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found.' });
    if (quiz.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only the quiz creator can edit this quiz.' });
    }

    Object.assign(quiz, quizInput(req.body));
    await quiz.save();
    return res.json({ quiz: { id: quiz._id, title: quiz.title } });
  } catch (error) {
    return next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Quiz not found.' });
    }
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found.' });
    if (quiz.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only the quiz creator can delete this quiz.' });
    }

    await Promise.all([
      Quiz.deleteOne({ _id: quiz._id }),
      Result.deleteMany({ quiz: quiz._id }),
    ]);
    return res.json({ message: 'Quiz deleted.' });
  } catch (error) {
    return next(error);
  }
});

router.post('/:id/submit', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Quiz not found.' });
    }
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found.' });

    const answers = req.body.answers;
    if (
      !Array.isArray(answers) ||
      answers.length !== quiz.questions.length ||
      answers.some(
        (answer, index) =>
          !Number.isInteger(answer) || answer < 0 || answer >= quiz.questions[index].options.length
      )
    ) {
      return res.status(400).json({ message: 'Submit one valid answer for every question.' });
    }

    const score = answers.reduce(
      (total, answer, index) => total + Number(answer === quiz.questions[index].correctIndex),
      0
    );
    const result = await Result.create({
      quiz: quiz._id,
      user: req.user.id,
      answers,
      reviewQuestions: quiz.questions.map((question) => ({
        text: question.text,
        options: question.options,
        correctIndex: question.correctIndex,
      })),
      score,
      total: quiz.questions.length,
    });

    return res.status(201).json({ resultId: result._id, score, total: result.total });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
