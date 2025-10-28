import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewEntry.css';

// Utility: emoji and color helpers
const moodMap = {
  'Happy': '😊',
  'Excited': '🤩',
  'Calm': '😌',
  'Sad': '😢',
  'Anxious': '😰',
  'Angry': '😠',
  'Tired': '😴',
  'Neutral': '😐',
};
const colorMap = {
  'Happy': 'mood-green',
  'Excited': 'mood-yellow',
  'Calm': 'mood-blue',
  'Sad': 'mood-indigo',
  'Anxious': 'mood-purple',
  'Angry': 'mood-red',
  'Tired': 'mood-gray',
  'Neutral': 'mood-slate',
};
function getMoodEmoji(mood) {
  return moodMap[mood] || '😊';
}
function getMoodColor(mood) {
  return colorMap[mood] || 'mood-gray';
}

// Sample entries for demo. Replace with your passed-in props.
const defaultEntries = [
  {
    id: 1,
    mood: 'Happy',
    date: 'Oct 13, 2025',
    time: '2:30 PM',
    note: 'Had a great day at work! Completed my project ahead of schedule.',
    playlist: true
  },
  {
    id: 2,
    mood: 'Calm',
    date: 'Oct 12, 2025',
    time: '8:00 AM',
    note: 'Morning meditation session was peaceful.',
    playlist: true
  },
  {
    id: 3,
    mood: 'Anxious',
    date: 'Oct 11, 2025',
    time: '3:45 PM',
    note: 'Feeling worried about upcoming presentation.',
    playlist: true
  }
];

export default function ViewEntry({ entries = defaultEntries }) {
  const [filterMood, setFilterMood] = useState('all');
  const navigate = useNavigate();

  const filteredEntries =
    filterMood === 'all'
      ? entries
      : entries.filter(entry => entry.mood === filterMood);

  return (
    <div className="journal-page">
      <div className="journal-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>← Back</button>
        <h2 className="journal-title">My Journal</h2>
      </div>
      <div className="journal-filter">
        <label>Filter:</label>
        <select
          className="journal-select"
          value={filterMood}
          onChange={e => setFilterMood(e.target.value)}
        >
          <option value="all">All Moods</option>
          <option value="Happy">Happy</option>
          <option value="Excited">Excited</option>
          <option value="Calm">Calm</option>
          <option value="Sad">Sad</option>
          <option value="Anxious">Anxious</option>
          <option value="Angry">Angry</option>
          <option value="Tired">Tired</option>
          <option value="Neutral">Neutral</option>
        </select>
      </div>
      <div className="journal-list">
        {filteredEntries.length === 0 ? (
          <div className="no-entries">
            <p>No entries found</p>
            <p className="no-entries-sub">Try a different filter or add a new entry</p>
          </div>
        ) : (
          filteredEntries.map(entry => (
            <div key={entry.id} className="journal-card">
              <div className="card-content">
                <div className={`mood-square ${getMoodColor(entry.mood)}`}>
                  <span className="mood-emoji">{getMoodEmoji(entry.mood)}</span>
                </div>
                <div className="card-main">
                  <div className="card-mood-row">
                    <span className="card-mood">{entry.mood}</span>
                    {entry.playlist && <span className="card-music">🎵</span>}
                  </div>
                  <span className="card-date">{entry.date} • {entry.time}</span>
                  <div className="card-desc">{entry.note}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
