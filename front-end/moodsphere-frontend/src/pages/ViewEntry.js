import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewEntry.css';
import { getMoodEmoji, getMoodColor } from '../utils/moodHelpers';

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
  },
  {
    id: 4,
    mood: 'Inspired',
    date: 'Oct 10, 2025',
    time: '10:00 AM',
    note: 'Had a burst of creativity during brainstorming!',
    playlist: false
  },
  {
    id: 5,
    mood: 'Stressed',
    date: 'Oct 9, 2025',
    time: '6:30 PM',
    note: 'Too many deadlines piling up 😩',
    playlist: false
  },
  {
    id: 6,
    mood: 'Grateful',
    date: 'Oct 8, 2025',
    time: '9:15 PM',
    note: 'So thankful for my supportive friends and family.',
    playlist: false
  }
];

export default function ViewEntry({ entries = defaultEntries }) {
  const [filterMood, setFilterMood] = useState('all');
  const navigate = useNavigate();

  const filteredEntries =
    filterMood === 'all'
      ? entries
      : entries.filter(entry => entry.mood === filterMood);

  const clearFilter = () => setFilterMood('all');

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
          <option value="Burnt Out">Burnt Out</option>
          <option value="Annoyed">Annoyed</option>
          <option value="Inspired">Inspired</option>
          <option value="Stressed">Stressed</option>
          <option value="Grateful">Grateful</option>
        </select>

        {filterMood !== 'all' && (
          <button className="clear-btn" onClick={clearFilter}>Clear Filter</button>
        )}
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
