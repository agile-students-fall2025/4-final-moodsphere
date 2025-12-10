import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Reflections.css'

export default function Reflections() {
  const [value, setValue] = useState('')
  const [prompt, setPrompt] = useState("What is one thing you're grateful for today?")
  const [savedReflections, setSavedReflections] = useState([])
  const [todayReflectionId, setTodayReflectionId] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const today = new Date().toISOString().split('T')[0]

  // Fetch daily prompt and reflections on mount
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token')

      try {
        // Fetch daily prompt
        const promptRes = await fetch('/api/reflections/prompt')
        const promptData = await promptRes.json()
        if (promptRes.ok) {
          setPrompt(promptData.prompt)
        }

        // Fetch all reflections
        const reflectionsRes = await fetch('/api/reflections', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        const reflectionsData = await reflectionsRes.json()

        if (reflectionsRes.ok) {
          setSavedReflections(reflectionsData.reflections || [])

          // Check if there's a reflection for today
          const todayReflection = reflectionsData.reflections.find(r => r.date === today)
          if (todayReflection) {
            setValue(todayReflection.text)
            setTodayReflectionId(todayReflection._id)
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [today])

  const handleSave = async () => {
    if (!value.trim()) {
      alert('Please write a reflection before saving')
      return
    }

    try {
      const token = localStorage.getItem('token')

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
        alert(todayReflectionId ? 'Reflection updated!' : 'Reflection saved!')
        navigate('/dashboard')
      } else {
        const error = await response.json()
        alert(`Failed to save reflection: ${error.error}`)
      }
    } catch (error) {
      console.error('Error saving reflection:', error)
      alert('Error saving reflection')
    }
  }

  const handleDelete = async (id) => {
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
        setSavedReflections(savedReflections.filter(r => r._id !== id))
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

  const formatDate = (dateString) => {
    const date = new Date(dateString + 'T12:00:00')
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const isToday = (dateString) => dateString === today

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
        <section className='ref-card ref-card-prompt' aria-labelledby='prompt-h'>
          <h2 id='prompt-h' className='ref-card-title'>
            Today's Prompt
          </h2>
          <p className='ref-card-body'>{prompt}</p>
        </section>

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

        {savedReflections.length > 0 && (
          <section className='ref-saved-section'>
            <h3 className='ref-section-title'>Previous Reflections</h3>
            {savedReflections.map((reflection) => (
              <div key={reflection._id} className='ref-saved-card'>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <p className='ref-saved-date'>
                      {formatDate(reflection.date)}
                      {isToday(reflection.date) && ' (Today)'}
                    </p>
                    <p className='ref-saved-prompt'>
                      <strong>"{reflection.prompt}"</strong>
                    </p>
                    <p className='ref-saved-text'>{reflection.text}</p>
                  </div>
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
