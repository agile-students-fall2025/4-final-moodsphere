import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Reflections.css'

export default function Reflections() {
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  async function handleSave() {
    const res = await fetch('/api/reflections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        text: value,
      }),
    })
    if (res.ok) {
      navigate('/dashboard')
    } else {
      console.error('Failed to save reflection')
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
            Today’s Prompt
          </h2>
          <p className='ref-card-body'>
            What challenged you today and what did you learn from it?
          </p>
        </section>

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
