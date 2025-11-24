import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Calendar from '../components/Calendar'
import './Dashboard.css'

// Mood to emoji mapping
const MOOD_EMOJIS = {
  happy: '😊',
  excited: '🤩',
  calm: '😌',
  grateful: '🙏',
  sad: '😢',
  anxious: '😰',
  angry: '😠',
  tired: '😴',
}

// Mood to background color mapping
const MOOD_COLORS = {
  happy: '#FFD93D',      // Yellow
  excited: '#FF6B9D',    // Pink
  calm: '#A7C7E7',       // Light blue
  grateful: '#C9A0DC',   // Purple
  sad: '#6CB4EE',        // Blue
  anxious: '#FFA07A',    // Light orange
  angry: '#FF6B6B',      // Red
  tired: '#B0C4DE',      // Light steel blue
}

// Capitalize first letter
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

export default function Dashboard() {
  const navigate = useNavigate()

  const [currentMood, setCurrentMood] = useState(null)

  const [reflectionPrompt] = useState(
    "What is one thing you're grateful for today?"
  )
  const [journalDates, setJournalDates] = useState([])
  const [latestReflection, setLatestReflection] = useState(null)

  // Fetch calendar dates and latest reflection from backend
  useEffect(() => {
    const fetchCalendarDates = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/calendar')
        const data = await response.json()
        if (response.ok) {
          setJournalDates(data.dates || [])
        }
      } catch (error) {
        console.error('Error fetching calendar dates:', error)
        // Keep empty array as fallback
      }
    }

    const fetchLatestReflection = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/reflections')
        const data = await response.json()
        if (response.ok && data.reflections && data.reflections.length > 0) {
          // Get the most recent reflection
          const latest = data.reflections[data.reflections.length - 1]
          setLatestReflection(latest)
        }
      } catch (error) {
        console.error('Error fetching reflections:', error)
      }
    }

    const fetchLatestMood = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/moods')
        const data = await response.json()
        if (response.ok && data.moods && data.moods.length > 0) {
          // Get the most recent mood
          const latest = data.moods[data.moods.length - 1]
          const moodKey = latest.mood.toLowerCase()
          const moodData = {
            emoji: MOOD_EMOJIS[moodKey] || '😊',
            label: capitalize(latest.mood),
            color: MOOD_COLORS[moodKey] || '#A7C7E7',
            timestamp: new Date(latest.loggedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            }),
          }
          setCurrentMood(moodData)
        }
      } catch (error) {
        console.error('Error fetching moods:', error)
      }
    }

    fetchCalendarDates()
    fetchLatestReflection()
    fetchLatestMood()
  }, [])

  const handleLogMood = () => navigate('/log-mood')
  const handleJournalEntry = () => navigate('/journal-editor')
  const handleViewJournal = () => navigate('/view-entry')
  const handleChat = () => navigate('/contacts')
  const handleWriteReflection = () => {
    navigate('/reflections')
  }

  const handleSignOut = async () => {
    try {
      // Call backend signout endpoint
      await fetch('http://localhost:5001/auth/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // Clear user data from localStorage
      localStorage.removeItem('user')

      // Navigate to auth page
      navigate('/auth')
    } catch (error) {
      console.error('Error signing out:', error)
      // Still clear local data and navigate even if backend call fails
      localStorage.removeItem('user')
      navigate('/auth')
    }
  }

  return (
    <div className='dashboard'>
      <div className='dashboard-container'>
        <header className='dashboard-header'>
          <div>
            <h1 className='dashboard-title'>Dashboard</h1>
            <p className='dashboard-subtitle'>Welcome back!</p>
          </div>
          <button
            onClick={handleSignOut}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#ff4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '0.9rem'
            }}
          >
            Sign Out
          </button>
        </header>

        <div className='dashboard-content'>
          {/* Daily Reflection Card */}
          <div className='reflection-card'>
            <h2 className='card-title'>Daily Reflection</h2>
            <p className='card-subtitle'>Take a moment to reflect</p>
            <div className='reflection-prompt'>"{reflectionPrompt}"</div>

            {latestReflection ? (
              <>
                <div className='reflection-answer'>
                  {latestReflection.text}
                </div>
                <button
                  className='reflection-button'
                  onClick={handleWriteReflection}
                >
                  Edit Reflection
                </button>
              </>
            ) : (
              <button
                className='reflection-button'
                onClick={handleWriteReflection}
              >
                Write Reflection
              </button>
            )}
          </div>

          {/* Current Mood Card */}
          <div className='mood-card'>
            <div className='mood-header'>
              <h2 className='card-title'>Current Mood</h2>
              {currentMood && (
                <p className='mood-timestamp'>Last updated {currentMood.timestamp}</p>
              )}
            </div>

            {currentMood ? (
              <div className='mood-display'>
                <div className='mood-emoji-container' style={{ backgroundColor: currentMood.color }}>
                  <div className='mood-emoji'>{currentMood.emoji}</div>
                </div>
                <div className='mood-label'>{currentMood.label}</div>
              </div>
            ) : (
              <div className='mood-display'>
                <p style={{ textAlign: 'center', color: '#7a8899', fontStyle: 'italic' }}>
                  No mood logged yet. Click "Log Mood" to track how you're feeling!
                </p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className='quick-actions'>
            <h2 className='card-title'>Quick Actions</h2>
            <div className='action-buttons'>
              <button className='action-button' onClick={handleLogMood}>
                <span className='action-icon'>📊</span>
                <span className='action-text'>Log Mood</span>
              </button>
              <button className='action-button' onClick={handleJournalEntry}>
                <span className='action-icon'>✍️</span>
                <span className='action-text'>Journal Entry</span>
              </button>
              <button className='action-button' onClick={handleViewJournal}>
                <span className='action-icon'>📖</span>
                <span className='action-text'>View Journal Entries</span>
              </button>
              <button className='action-button' onClick={handleChat}>
                <span className='action-icon'>💬</span>
                <span className='action-text'>Chat with Friends</span>
              </button>
            </div>
          </div>

          {/* Journal Calendar */}
          <div className='calendar-section'>
            <h2 className='card-title'>Journal Calendar</h2>
            <p className='card-subtitle'>Track your journaling journey</p>
            <Calendar journalDates={journalDates} />
          </div>
        </div>
      </div>
    </div>
  )
}
