const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5001; // <-- frontend will hit this

app.use(cors());
app.use(express.json());

// ---- mock in-memory data for now ----
let moods = [];

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Route for LogMood page: create/save a mood
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

// (Optional) Get all moods – for a future mood history page
app.get('/api/moods', (req, res) => {
  res.json({ moods });
});

app.get('/', (req, res) => {
  res.send('Moodsphere backend is running');
});


app.listen(PORT, () => {
  console.log(`Moodsphere backend listening on http://localhost:${PORT}`);
});
