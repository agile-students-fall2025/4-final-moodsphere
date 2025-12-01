// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const requireAuth = require('./middleware/requireAuth');
const authRoutes = require('./routes/auth');
const { body, validationResult } = require('express-validator');
const connectDB = require('./config/database');
const Mood = require('./models/Mood');

const app = express();
const PORT = process.env.PORT || 5001;

// -------------------- Middleware --------------------
app.use(cors());
app.use(express.json());

// Centralized validation error handler
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};

// -------------------- Auth Routes --------------------
app.use('/auth', authRoutes);
app.use('/api/auth', authRoutes);

// -------------------- Temporary In-Memory Data --------------------
// Moods now stored in MongoDB (see models/Mood.js)
let entries = [];
let reflections = [];
let messages = [
  { id: '1', sender: 'Sarah Chen', text: 'Hey there!', time: '10:00 AM' },
  { id: '2', sender: 'You', text: "Hey Sarah! How's your day going?", time: '10:02 AM' }
];

// -------------------- Health --------------------
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// -------------------- Moods --------------------
app.get('/api/moods', requireAuth, async (req, res) => {
  try {
    const userMoods = await Mood.find({ userId: req.userId }).sort({ loggedAt: -1 });
    res.json({ moods: userMoods });
  } catch (error) {
    console.error('Error fetching moods:', error);
    res.status(500).json({ error: 'Failed to fetch moods' });
  }
});

app.post(
  '/api/moods',
  requireAuth,
  [body('mood').notEmpty().withMessage('Mood is required')],
  handleValidation,
  async (req, res) => {
    try {
      const { mood, loggedAt } = req.body;
      const newMood = await Mood.create({
        userId: req.userId,
        mood,
        loggedAt: loggedAt || new Date(),
      });
      res.status(201).json(newMood);
    } catch (error) {
      console.error('Error creating mood:', error);
      res.status(500).json({ error: 'Failed to create mood' });
    }
  }
);

// -------------------- Journal Entries --------------------
app.get('/api/entries', requireAuth, (req, res) => {
  res.json({ entries });
});

app.post(
  '/api/entries',
  requireAuth,
  [body('content').notEmpty().withMessage('Content is required')],
  handleValidation,
  (req, res) => {
    const { title, content, createdAt } = req.body;
    const newEntry = {
      id: String(entries.length + 1),
      title: title || 'Untitled',
      content,
      createdAt: createdAt || new Date().toISOString(),
    };
    entries.push(newEntry);
    res.status(201).json(newEntry);
  }
);

// -------------------- Reflections --------------------
app.get('/api/reflections', requireAuth, (req, res) => {
  res.json({ reflections });
});

app.post(
  '/api/reflections',
  requireAuth,
  [body('text').notEmpty().withMessage('Reflection text is required')],
  handleValidation,
  (req, res) => {
    const { prompt, text } = req.body;
    const newReflection = {
      id: String(reflections.length + 1),
      prompt: prompt || 'Daily Reflection',
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };
    reflections.push(newReflection);
    res.status(201).json(newReflection);
  }
);

// -------------------- Chat --------------------
app.get('/api/chat', (req, res) => {
  res.json({ messages });
});

app.post(
  '/api/chat',
  [body('sender').notEmpty().withMessage('Sender is required'), body('text').notEmpty().withMessage('Text is required')],
  handleValidation,
  (req, res) => {
    const { sender, text } = req.body;
    const newMessage = {
      id: String(messages.length + 1),
      sender,
      text,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    };
    messages.push(newMessage);
    res.status(201).json(newMessage);
  }
);

// -------------------- Calendar --------------------
app.get('/api/calendar', requireAuth, (req, res) => {
  const moodDates = moods.map((m) => new Date(m.loggedAt).toISOString().split('T')[0]);
  const entryDates = entries.map((e) => new Date(e.createdAt).toISOString().split('T')[0]);
  const allDates = [...new Set([...moodDates, ...entryDates])].sort();
  res.json({ dates: allDates, count: allDates.length });
});

// -------------------- Root --------------------
app.get('/', (req, res) => {
  res.send('Moodsphere backend is running');
});

// -------------------- Global Error Handler --------------------
app.use((err, req, res, next) => {
  console.error(err.stack || err);
  res.status(err.status || 500).json({ success: false, error: err.message || 'Internal Server Error' });
});

// -------------------- Server --------------------
if (require.main === module) {
  // Connect to MongoDB, then start the server
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Moodsphere backend listening on http://localhost:${PORT}`);
    });
  });
}

module.exports = app;