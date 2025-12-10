// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const requireAuth = require('./middleware/requireAuth');
const authRoutes = require('./routes/auth');
const { body, validationResult } = require('express-validator');
const connectDB = require('./config/database');
const Mood = require('./models/Mood');
const JournalEntry = require('./models/JournalEntry');
const Reflection = require('./models/Reflection');
const { getDailyPrompt } = require('./utils/reflectionPrompts');

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
// Journal Entries now stored in MongoDB (see models/JournalEntry.js)
// Reflections now stored in MongoDB (see models/Reflection.js)
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

app.delete('/api/moods/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const mood = await Mood.findOneAndDelete({ _id: id, userId: req.userId });

    if (!mood) {
      return res.status(404).json({ error: 'Mood not found or unauthorized' });
    }

    res.json({ message: 'Mood deleted successfully', mood });
  } catch (error) {
    console.error('Error deleting mood:', error);
    res.status(500).json({ error: 'Failed to delete mood' });
  }
});

// -------------------- Journal Entries --------------------
app.get('/api/entries', requireAuth, async (req, res) => {
  try {
    const { date } = req.query;

    let query = { userId: req.userId };

    // If date parameter provided, filter entries by that date
    if (date) {
      // Parse the requested date (YYYY-MM-DD format)
      const [year, month, day] = date.split('-').map(Number);

      // Get all entries for this user
      const allEntries = await JournalEntry.find({ userId: req.userId }).sort({ createdAt: -1 });

      // Filter by matching date components (year, month, day) ignoring timezone
      const filteredEntries = allEntries.filter(entry => {
        const entryDate = new Date(entry.createdAt);

        // Get date components in UTC
        const entryYear = entryDate.getUTCFullYear();
        const entryMonth = entryDate.getUTCMonth() + 1; // getUTCMonth is 0-indexed
        const entryDay = entryDate.getUTCDate();

        return entryYear === year && entryMonth === month && entryDay === day;
      });

      return res.json({ entries: filteredEntries });
    }

    const userEntries = await JournalEntry.find(query).sort({ createdAt: -1 });
    res.json({ entries: userEntries });
  } catch (error) {
    console.error('Error fetching journal entries:', error);
    res.status(500).json({ error: 'Failed to fetch journal entries' });
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
      const newEntry = await JournalEntry.create({
        userId: req.userId,
        title: title || 'Untitled',
        content,
        createdAt: createdAt || new Date(),
      });
      res.status(201).json(newEntry);
    } catch (error) {
      console.error('Error creating journal entry:', error);
      res.status(500).json({ error: 'Failed to create journal entry' });
    }
  }
);

app.put(
  '/api/entries/:id',
  requireAuth,
  [body('content').notEmpty().withMessage('Content is required')],
  handleValidation,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;

      const entry = await JournalEntry.findOne({ _id: id, userId: req.userId });

      if (!entry) {
        return res.status(404).json({ error: 'Entry not found or unauthorized' });
      }

      entry.title = title || 'Untitled';
      entry.content = content;
      await entry.save();

      res.json(entry);
    } catch (error) {
      console.error('Error updating journal entry:', error);
      res.status(500).json({ error: 'Failed to update journal entry' });
    }
  }
);

app.delete('/api/entries/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const entry = await JournalEntry.findOneAndDelete({ _id: id, userId: req.userId });

    if (!entry) {
      return res.status(404).json({ error: 'Entry not found or unauthorized' });
    }

    res.json({ message: 'Entry deleted successfully', entry });
  } catch (error) {
    console.error('Error deleting journal entry:', error);
    res.status(500).json({ error: 'Failed to delete journal entry' });
  }
});

// -------------------- Reflections --------------------
// Get daily prompt
app.get('/api/reflections/prompt', (req, res) => {
  const prompt = getDailyPrompt();
  res.json({ prompt });
});

// Get all reflections for the authenticated user
app.get('/api/reflections', requireAuth, async (req, res) => {
  try {
    const userReflections = await Reflection.find({ userId: req.userId }).sort({ date: -1 });
    res.json({ reflections: userReflections });
  } catch (error) {
    console.error('Error fetching reflections:', error);
    res.status(500).json({ error: 'Failed to fetch reflections' });
  }
});

// Get today's reflection for the authenticated user
app.get('/api/reflections/today', requireAuth, async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const todayReflection = await Reflection.findOne({ userId: req.userId, date: today });
    res.json({ reflection: todayReflection });
  } catch (error) {
    console.error('Error fetching today reflection:', error);
    res.status(500).json({ error: 'Failed to fetch today reflection' });
  }
});

// Create or update today's reflection
app.post(
  '/api/reflections',
  requireAuth,
  [body('text').notEmpty().withMessage('Reflection text is required')],
  handleValidation,
  async (req, res) => {
    try {
      const { text } = req.body;
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      const prompt = getDailyPrompt();

      // Check if reflection already exists for today
      let reflection = await Reflection.findOne({ userId: req.userId, date: today });

      if (reflection) {
        // Update existing reflection
        reflection.text = text.trim();
        reflection.prompt = prompt;
        await reflection.save();
        res.json(reflection);
      } else {
        // Create new reflection
        reflection = await Reflection.create({
          userId: req.userId,
          prompt,
          text: text.trim(),
          date: today,
        });
        res.status(201).json(reflection);
      }
    } catch (error) {
      console.error('Error saving reflection:', error);
      res.status(500).json({ error: 'Failed to save reflection' });
    }
  }
);

// Delete a reflection by ID
app.delete('/api/reflections/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const reflection = await Reflection.findOneAndDelete({ _id: id, userId: req.userId });

    if (!reflection) {
      return res.status(404).json({ error: 'Reflection not found or unauthorized' });
    }

    res.json({ message: 'Reflection deleted successfully', reflection });
  } catch (error) {
    console.error('Error deleting reflection:', error);
    res.status(500).json({ error: 'Failed to delete reflection' });
  }
});

// -------------------- Chat --------------------
app.get('/api/chat', (req, res) => {
  res.json({ messages });
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
    // Fetch journal entries for this user only (not moods)
    const userEntries = await JournalEntry.find({ userId: req.userId });

    // Extract YYYY-MM-DD dates using UTC to avoid timezone shifts
    const entryDates = userEntries.map(e => {
      const d = new Date(e.createdAt);
      return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
    });

    // Remove duplicates and sort
    const allDates = [...new Set(entryDates)].sort();

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