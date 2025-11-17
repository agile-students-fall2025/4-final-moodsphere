import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Reflections.css'

export default function Reflections() {
  const [value, setValue] = useState('')
  const [savedReflections, setSavedReflections] = useState([])
  const navigate = useNavigate()

  const prompt = "What is one thing you're grateful for today?"

  // Fetch saved reflections on component mount
  useEffect(() => {
    const fetchReflections = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/reflections')
        const data = await res.json()
        if (res.ok) {
          setSavedReflections(data.reflections || [])

          // Load the latest reflection into the text area for editing
          if (data.reflections && data.reflections.length > 0) {
            const latest = data.reflections[data.reflections.length - 1]
            setValue(latest.text)
          }
        }
      } catch (error) {
        console.error('Error fetching reflections:', error)
      }
    }
    fetchReflections()
  }, [])

  async function handleSave() {
    try {
      const res = await fetch('http://localhost:5001/api/reflections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          text: value,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        console.log('✅ REFLECTION SAVED:', data)
        alert('Reflection saved!')
        navigate('/dashboard')
      } else {
        console.error('Failed to save reflection')
        alert('Failed to save reflection')
      }
    } catch (error) {
      console.error('Error saving reflection:', error)
      alert('Error saving reflection')
    }
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
        <section
          className='ref-card ref-card-prompt'
          aria-labelledby='prompt-h'
        >
          <h2 id='prompt-h' className='ref-card-title'>
            Today's Prompt
          </h2>
          <p className='ref-card-body'>
            {prompt}
          </p>
        </section>

        {/* Display saved reflections */}
        {savedReflections.length > 0 && (
          <section className='ref-saved-section'>
            <h3 className='ref-section-title'>Previous Reflections</h3>
            {savedReflections.map((reflection) => (
              <div key={reflection.id} className='ref-saved-card'>
                <p className='ref-saved-date'>
                  {new Date(reflection.createdAt).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className='ref-saved-prompt'><strong>"{reflection.prompt}"</strong></p>
                <p className='ref-saved-text'>{reflection.text}</p>
              </div>
            ))}
          </section>
        )}

        <h3 className='ref-section-title'>Your Reflection</h3>
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

        <section className='ref-card ref-card--tips' aria-labelledby='tips-h'>
          <h2 id='tips-h' className='ref-card-title'>
            Reflection Tips:
          </h2>
          <ul className='ref-tips'>
            <br></br>
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
            Save Reflection
          </button>
        </div>
      </footer>
    </div>
  )
}
