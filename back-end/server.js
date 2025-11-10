const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// mock in-memory data for now will fix when implementing database
let moods = [];
let entries = []; //for journal entry route
let users = []; // for auth routes

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Endpoint to log a new mood
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

app.get('/', (req, res) => {
  res.send('Moodsphere backend is running');
});

app.get('/api/entries', (req, res) => {
  res.json({ entries });
});

app.post ('/api/entries', (req, res) => {
  const { title, content, createdAt } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }

  const newEntry = {
    id: String(entries.length + 1),
    title: title || 'Untitled',
    content,
    createdAt: createdAt || new Date().toISOString(),
  }

  entries.push(newEntry);
  res.status(201).json(newEntry);
});

// Auth routes
app.post('/api/auth/signup', (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Check if user already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({ error: 'User already exists' });
  }

  const newUser = {
    id: String(users.length + 1),
    name: name || 'Anonymous',
    email,
    password, // In real app, this would be hashed
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);

  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json({
    message: 'User created successfully',
    user: userWithoutPassword,
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Find user by email
  const user = users.find(u => u.email === email);

  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  res.status(200).json({
    message: 'Login successful',
    user: userWithoutPassword,
  });
});

// Sign out route
app.post('/api/auth/signout', (req, res) => {
  // In a real app with sessions/tokens, we would invalidate the session here
  // For now, just return a success message
  res.status(200).json({
    message: 'Sign out successful'
  });
});

// Calendar route - returns dates with mood/journal entries
app.get('/api/calendar', (req, res) => {
  // Get unique dates from moods
  const moodDates = moods.map(mood => {
    const date = new Date(mood.loggedAt);
    return date.toISOString().split('T')[0];
  });

  // Get unique dates from entries
  const entryDates = entries.map(entry => {
    const date = new Date(entry.createdAt);
    return date.toISOString().split('T')[0];
  });

  // Combine and deduplicate dates
  const allDates = [...new Set([...moodDates, ...entryDates])];

  res.json({
    dates: allDates.sort(),
    count: allDates.length
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Moodsphere backend listening on http://localhost:${PORT}`);
  });
}

module.exports = app;
