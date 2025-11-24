const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());


const authRoutes = require('./routes/auth');

app.use("/auth", authRoutes);
app.use("/api/auth", authRoutes);

let moods = [];
let entries = [];
let reflections = [];
let messages = [
  { id: '1', sender: 'Sarah Chen', text: 'Hey there!', time: '10:00 AM' },
  { id: '2', sender: 'You', text: "Hey Sarah! How's your day going?", time: '10:02 AM' }
];


app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});


app.post('/api/moods', (req, res) => {
  const { mood, loggedAt } = req.body;

  if (!mood) {
    return res.status(400).json({ error: 'Mood is required' });
  }

  const newMood = {
    id: String(moods.length + 1),
    mood,
    loggedAt: loggedAt || new Date().toISOString(),
  };

  moods.push(newMood);
  res.status(201).json(newMood);
});

app.get('/api/moods', (req, res) => {
  res.json({ moods });
});


app.get('/api/entries', (req, res) => {
  res.json({ entries });
});

app.post('/api/entries', (req, res) => {
  const { title, content, createdAt } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }

  const newEntry = {
    id: String(entries.length + 1),
    title: title || 'Untitled',
    content,
    createdAt: createdAt || new Date().toISOString(),
  };

  entries.push(newEntry);
  res.status(201).json(newEntry);
});


app.get('/api/reflections', (req, res) => {
  res.json({ reflections });
});

app.post('/api/reflections', (req, res) => {
  const { prompt, text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Reflection text is required' });
  }

  const newReflection = {
    id: String(reflections.length + 1),
    prompt: prompt || 'Daily Reflection',
    text: text.trim(),
    createdAt: new Date().toISOString(),
  };

  reflections.push(newReflection);
  res.status(201).json(newReflection);
});


app.get('/api/chat', (req, res) => {
  res.status(200).json({ messages });
});

app.post('/api/chat', (req, res) => {
  const { sender, text } = req.body;

  if (!sender || !text) {
    return res.status(400).json({ error: 'Sender and text are required.' });
  }

  const newMessage = {
    id: String(messages.length + 1),
    sender,
    text,
    time: new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    }),
  };

  messages.push(newMessage);
  res.status(201).json(newMessage);
});


app.get('/api/calendar', (req, res) => {
  const moodDates = moods.map((m) =>
    new Date(m.loggedAt).toISOString().split('T')[0]
  );

  const entryDates = entries.map((e) =>
    new Date(e.createdAt).toISOString().split('T')[0]
  );

  const allDates = [...new Set([...moodDates, ...entryDates])];

  res.json({
    dates: allDates.sort(),
    count: allDates.length,
  });
});

app.get('/', (req, res) => {
  res.send('Moodsphere backend is running');
});


if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Moodsphere backend listening on http://localhost:${PORT}`);
  });
}

module.exports = app;
