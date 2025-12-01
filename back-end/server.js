// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const requireAuth = require('./middleware/requireAuth');
const authRoutes = require('./routes/auth');
const { body, validationResult } = require('express-validator');
const connectDB = require('./config/database');
const Mood = require('./models/Mood');
const Entry = require('./models/Entry');
const Reflection = require("./models/Reflection");
const Message = require('./models/Message');

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

// -------------------- Journal Entries (MongoDB) --------------------
app.get('/api/entries', requireAuth, async (req, res) => {
  try {
    const userEntries = await Entry.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json({ entries: userEntries });
  } catch (err) {
    console.error("Error fetching entries:", err);
    res.status(500).json({ error: "Failed to fetch entries" });
  }
});

app.post(
  '/api/entries',
  requireAuth,
  [body('content').notEmpty().withMessage('Content is required')],
  handleValidation,
  async (req, res) => {
    try {
      const { title, content, createdAt } = req.body;
      const newEntry = await Entry.create({
        userId: req.userId,
        title: title || "Untitled",
        content,
        createdAt: createdAt || new Date()
      });
      res.status(201).json(newEntry);
    } catch (err) {
      console.error("Error creating entry:", err);
      res.status(500).json({ error: "Failed to create entry" });
    }
  }
);

// -------------------- Reflections (MongoDB) --------------------
app.get('/api/reflections', requireAuth, async (req, res) => {
  try {
    const userReflections = await Reflection.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json({ reflections: userReflections });
  } catch (err) {
    console.error("Error fetching reflections:", err);
    res.status(500).json({ error: "Failed to fetch reflections" });
  }
});

app.post(
  '/api/reflections',
  requireAuth,
  [body('text').notEmpty().withMessage('Reflection text is required')],
  handleValidation,
  async (req, res) => {
    try {
      const { prompt, text } = req.body;

      const newReflection = await Reflection.create({
        userId: req.userId,
        prompt: prompt || "Daily Reflection",
        text: text.trim()
      });

      res.status(201).json(newReflection);
    } catch (err) {
      console.error("Error creating reflection:", err);
      res.status(500).json({ error: "Failed to create reflection" });
    }
  }
);

// -------------------- Chat (MongoDB) --------------------
app.get('/api/chat', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });
    res.json({ messages });
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

app.post(
  '/api/chat',
  [
    body('sender').notEmpty().withMessage('Sender is required'),
    body('text').notEmpty().withMessage('Text is required')
  ],
  handleValidation,
  async (req, res) => {
    try {
      const { sender, text } = req.body;

      const newMessage = await Message.create({
        sender,
        text,
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      });

      res.status(201).json(newMessage);
    } catch (err) {
      console.error("Error creating message:", err);
      res.status(500).json({ error: "Failed to create message" });
    }
  }
);

// -------------------- Calendar --------------------
app.get('/api/calendar', requireAuth, async (req, res) => {
  try {
    // Fetch moods for this user
    const userMoods = await Mood.find({ userId: req.userId });

    // Extract YYYY-MM-DD dates
    const moodDates = userMoods.map(m =>
      new Date(m.loggedAt).toISOString().split("T")[0]
    );

    const entryDates = entries.map(e =>
      new Date(e.createdAt).toISOString().split("T")[0]
    );

    // Combine + dedupe
    const allDates = [...new Set([...moodDates, ...entryDates])].sort();

    res.json({ dates: allDates, count: allDates.length });
  } catch (err) {
    console.error("Calendar route error:", err);
    res.status(500).json({ error: "Failed to load calendar data" });
  }
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