import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import Calendar from '../components/Calendar';
=======
>>>>>>> f97329d (Add View Journal Entries page and styling for the page)
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

  const [currentMood] = useState({
    emoji: '😊',
    label: 'Calm',
    note: 'Morning meditation session was peaceful.',
    date: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  });

  const [reflectionPrompt] = useState("What is one thing you're grateful for today?");

  // Sample journal dates - dates when user wrote journal entries
  const [journalDates] = useState([
    '2025-10-01',
    '2025-10-05',
    '2025-10-12',
    '2025-10-15',
    '2025-10-18',
    '2025-10-22',
    '2025-10-25',
    '2025-10-28',
  ]);

  const handleLogMood = () => {
    console.log('Log Mood clicked');
  };

  const handleJournalEntry = () => {
    console.log('Journal Entry clicked');
  };

  // Updated to navigate to ViewEntry page
  const handleViewJournal = () => {
    navigate("/view-entry");
  };

  const handleChat = () => {
    navigate('/contacts');
  };

  const handleWriteReflection = () => {
    console.log('Write Reflection clicked');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">Welcome back!</p>
        </header>

        <div className="dashboard-content">
          {/* Daily Reflection Card */}
          <div className="reflection-card">
            <h2 className="card-title">Daily Reflection</h2>
            <p className="card-subtitle">Take a moment to reflect</p>
            <div className="reflection-prompt">
              "{reflectionPrompt}"
            </div>
            <button className="reflection-button" onClick={handleWriteReflection}>
              Write Reflection
            </button>
          </div>

          {/* Current Mood Card */}
          <div className="mood-card">
            <div className="mood-header">
              <h2 className="card-title">Current Mood</h2>
              <p className="mood-timestamp">Last updated {currentMood.date}</p>
            </div>

            <div className="mood-display">
              <div className="mood-emoji-container">
                <div className="mood-emoji">{currentMood.emoji}</div>
              </div>
              <div className="mood-label">{currentMood.label}</div>
              <p className="mood-note">{currentMood.note}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h2 className="card-title">Quick Actions</h2>
            <div className="action-buttons">
              <button className="action-button" onClick={handleLogMood}>
                <span className="action-icon">📊</span>
                <span className="action-text">Log Mood</span>
              </button>
              <button className="action-button" onClick={handleJournalEntry}>
                <span className="action-icon">✍️</span>
                <span className="action-text">Journal Entry</span>
              </button>
              <button className="action-button" onClick={handleViewJournal}>
                <span className="action-icon">📖</span>
                <span className="action-text">View Journal Entries</span>
              </button>
              <button className="action-button" onClick={handleChat}>
                <span className="action-icon">💬</span>
                <span className="action-text">Chat with Friends</span>
              </button>
            </div>
          </div>

          {/* Journal Calendar */}
          <div className="calendar-section">
            <h2 className="card-title">Journal Calendar</h2>
            <p className="card-subtitle">Track your journaling journey</p>
            <Calendar journalDates={journalDates} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;