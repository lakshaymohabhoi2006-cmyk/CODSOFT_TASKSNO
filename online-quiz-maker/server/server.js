require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quizzes');
const resultRoutes = require('./routes/results');

const app = express();
const port = process.env.PORT || 5000;
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/results', resultRoutes);

app.use((error, _req, res, _next) => {
  console.error(error);
  if (error.code === 11000) {
    return res.status(409).json({ message: 'An account with this email already exists.' });
  }
  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return res.status(400).json({ message: error.message });
  }
  return res.status(500).json({ message: 'Something went wrong. Please try again.' });
});

async function startServer() {
  if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
    throw new Error('Set MONGO_URI and JWT_SECRET in online-quiz-maker/.env before starting the API.');
  }
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(port, () => console.log(`Quiz Maker API listening on port ${port}`));
}

startServer().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
