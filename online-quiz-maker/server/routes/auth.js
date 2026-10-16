const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const requireAuth = require('../middleware/auth');

const router = express.Router();

function createToken(user) {
  return jwt.sign({ id: user._id.toString(), name: user.name }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
}

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: 'Use a password with at least 8 characters.' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (await User.exists({ email: normalizedEmail })) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: await bcrypt.hash(password, 12),
    });

    return res.status(201).json({
      token: createToken(user),
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    return next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const user = email ? await User.findOne({ email }) : null;
    const passwordIsValid = user && (await bcrypt.compare(req.body.password || '', user.password));

    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Email or password is incorrect.' });
    }

    return res.json({
      token: createToken(user),
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    return next(error);
  }
});

router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('name email');
    if (!user) return res.status(404).json({ message: 'Account not found.' });
    return res.json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
