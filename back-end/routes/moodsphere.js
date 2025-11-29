const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const { entries, moods, chats } = require('../models/TempModels');

// Utility to handle validation errors
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};

/* -------------------- JOURNAL ENTRIES -------------------- */

router.get('/entries', (req, res) => {
  res.json({ entries });
});

router.post(
  '/entries',
  [
    body('content').notEmpty().withMessage('Content is required'),
    body('title').optional(),
    body('mood').optional(),
    body('createdAt').optional().isISO8601().withMessage('Invalid date format'),
  ],
  handleValidation,
  (req, res) => {
    const { title = 'Untitled', content, mood, createdAt = new Date().toISOString() } = req.body;
    const id = Date.now().toString();
    const entry = { id, title, content, mood, createdAt };
    entries.push(entry);
    res.status(201).json(entry);
  }
);

/* -------------------- MOODS -------------------- */

router.post(
  '/moods',
  [
    body('mood').notEmpty().withMessage('Mood is required'),
    body('loggedAt').optional().isISO8601().withMessage('Invalid date format'),
  ],
  handleValidation,
  (req, res) => {
    const { mood, loggedAt = new Date().toISOString() } = req.body;
    const id = Date.now().toString();
    const newMood = { id, mood, loggedAt };
    moods.push(newMood);
    res.status(201).json(newMood);
  }
);

/* -------------------- CALENDAR -------------------- */

router.get('/calendar', (req, res) => {
  const allDates = [
    ...entries.map(e => e.createdAt.slice(0, 10)),
    ...moods.map(m => m.loggedAt.slice(0, 10)),
  ];
  const uniqueDates = Array.from(new Set(allDates)).sort();
  res.json({ dates: uniqueDates, count: uniqueDates.length });
});

/* -------------------- CHAT -------------------- */

router.get('/chat', (req, res) => {
  res.json({ messages: chats });
});

router.post(
  '/chat',
  [
    body('sender').notEmpty().withMessage('Sender is required'),
    body('text').notEmpty().withMessage('Text is required'),
  ],
  handleValidation,
  (req, res) => {
    const { sender, text } = req.body;
    const id = Date.now().toString();
    const message = { id, sender, text };
    chats.push(message);
    res.status(201).json(message);
  }
);

/* -------------------- HEALTH -------------------- */

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = router;