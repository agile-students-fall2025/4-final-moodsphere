import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Reflections.css'

export default function Reflections() {
  // State for the user's reflection text
  const [value, setValue] = useState('')

  // Daily prompt fetched from backend
  const [prompt, setPrompt] = useState("What is one thing you're grateful for today?")

  // All saved reflections (previous days)
  const [savedReflections, setSavedReflections] = useState([])

  // If user already wrote today's reflection, store its ID for editing
  const [todayReflectionId, setTodayReflectionId] = useState(null)

  // Controls loading state while fetching data
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  // Today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0]

  // Fetch prompt + reflections when component mounts or when 'today' changes
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token')

      try {
        // 1) Fetch today's prompt
        const promptRes = await fetch('/api/reflections/prompt')
        const promptData = await promptRes.json()
        
        // Update prompt only if request succeeded
        if (promptRes.ok) {
          setPrompt(promptData.prompt)
        }

        // 2) Fetch all saved reflections for the user
        const reflectionsRes = await fetch('/api/reflections', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        const reflectionsData = await reflectionsRes.json()

        // If reflections fetch succeeded, save them to state
        if (reflectionsRes.ok) {
          setSavedReflections(reflectionsData.reflections || [])

          // Check if today already has a saved reflection
          const todayReflection = reflectionsData.reflections.find(r => r.date === today)
          if (todayReflection) {
            // Pre-fill textarea with today's text
            setValue(todayReflection.text)
            setTodayReflectionId(todayReflection._id)
          }
        }
      } catch (error) {
        // Log fetch issues (e.g., server down)
        console.error('Error fetching data:', error)
      } finally {
        // Remove loading screen no matter what
        setLoading(false)
      }
    }

    fetchData()
  }, [today])

  // Save or update today's reflection
  const handleSave = async () => {
    // Prevent saving an empty entry
    if (!value.trim()) {
      alert('Please write a reflection before saving')
      return
    }

    try {
      const token = localStorage.getItem('token')

      // POST always creates or updates on backend depending on existing entry
      const response = await fetch('/api/reflections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ text: value.trim() }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Reflection saved:', data)

        // Notify user based on whether this was an update
        alert(todayReflectionId ? 'Reflection updated!' : 'Reflection saved!')

        // Go back to dashboard after saving
        navigate('/dashboard')
      } else {
        // Handle backend error response
        const error = await response.json()
        alert(`Failed to save reflection: ${error.error}`)
      }
    } catch (error) {
      console.error('Error saving reflection:', error)
      alert('Error saving reflection')
    }
  }

  // Delete a reflection by ID
  const handleDelete = async (id) => {
    // Confirm deletion since it's irreversible
    if (!window.confirm('Are you sure you want to delete this reflection?')) {
      return
    }

    try {
      const token = localStorage.getItem('token')

      const response = await fetch(`/api/reflections/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        // Remove from UI immediately
        setSavedReflections(savedReflections.filter(r => r._id !== id))

        // If the deleted reflection was today's, reset input
        if (id === todayReflectionId) {
          setValue('')
          setTodayReflectionId(null)
        }

        alert('Reflection deleted successfully!')
      } else {
        const error = await response.json()
        alert(`Failed to delete reflection: ${error.error}`)
      }
    } catch (error) {
      console.error('Error deleting reflection:', error)
      alert('Error deleting reflection')
    }
  }

  // Format date for display (human-readable)
  const formatDate = (dateString) => {
    // Add a static time to avoid timezone offset issues
    const date = new Date(dateString + 'T12:00:00')

    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Check if a reflection belongs to today
  const isToday = (dateString) => dateString === today

  // Loading screen shown while fetching prompt + reflections
  if (loading) {
    return (
      <div className='reflections'>
        <div className='ref-container' style={{ paddingTop: '2rem' }}>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='reflections'>
      {/* Top navigation bar */}
      <header className='ref-topbar'>
        <div className='ref-container ref-topbar-row'>
          <button
            className='ref-back'
            onClick={() => navigate('/dashboard')}
            aria-label='Back'
          >
            ←
          </button>
          <h1 className='ref-title'>Daily Reflection</h1>
        </div>
      </header>

      <main className='ref-container ref-main'>
        {/* Daily prompt card */}
        <section className='ref-card ref-card-prompt' aria-labelledby='prompt-h'>
          <h2 id='prompt-h' className='ref-card-title'>
            Today's Prompt
          </h2>
          <p className='ref-card-body'>{prompt}</p>
        </section>

        {/* Reflection input */}
        <h3 className='ref-section-title'>
          {todayReflectionId ? 'Your Reflection (Edit)' : 'Your Reflection'}
        </h3>
        <label htmlFor='reflection' className='sr-only'>
          Reflection text
        </label>
        <textarea
          id='reflection'
          className='ref-input'
          placeholder='Take a moment to reflect and write your thoughts...'
          rows={10}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        {/* List of past reflections */}
        {savedReflections.length > 0 && (
          <section className='ref-saved-section'>
            <h3 className='ref-section-title'>Previous Reflections</h3>

            {savedReflections.map((reflection) => (
              <div key={reflection._id} className='ref-saved-card'>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    {/* Date */}
                    <p className='ref-saved-date'>
                      {formatDate(reflection.date)}
                      {isToday(reflection.date) && ' (Today)'}
                    </p>

                    {/* Prompt for that day */}
                    <p className='ref-saved-prompt'>
                      <strong>"{reflection.prompt}"</strong>
                    </p>

                    {/* Reflection text */}
                    <p className='ref-saved-text'>{reflection.text}</p>
                  </div>

                  {/* Delete button for that specific reflection */}
                  <button
                    onClick={() => handleDelete(reflection._id)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#EF4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: '500',
                      marginLeft: '10px'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Tips section */}
        <section className='ref-card ref-card--tips' aria-labelledby='tips-h'>
          <h2 id='tips-h' className='ref-card-title'>
            Reflection Tips:
          </h2>
          <ul className='ref-tips'>
            <li>Be honest and authentic</li>
            <li>There are no wrong answers</li>
            <li>Take your time to think deeply</li>
            <li>Focus on growth and learning</li>
          </ul>
        </section>
      </main>

      {/* Bottom save button */}
      <footer className='ref-bottom'>
        <div className='ref-container'>
          <button
            className='ref-save'
            onClick={handleSave}
            disabled={!value.trim()}
          >
            {todayReflectionId ? 'Update Reflection' : 'Save Reflection'}
          </button>
        </div>
      </footer>
    </div>
  )
}