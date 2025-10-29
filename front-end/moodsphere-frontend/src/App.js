import './App.css'
import { Routes, Route } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import Contacts from './pages/Contacts'
import Chat from './pages/Chat'
import JournalEntry from './pages/JournalEntry'
import ViewEntry from './pages/ViewEntry'

import LogMood from './pages/LogMood'
import JournalEditor from './pages/JournalEditor'
import Reflections from './pages/Reflections'

export default function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/contacts' element={<Contacts />} />
        <Route path='/chat/:contactId' element={<Chat />} />
        <Route path='/journal/:date' element={<JournalEntry />} />
        <Route path='/view-entry' element={<ViewEntry />} />

        {/* new pages */}
        <Route path='/log-mood' element={<LogMood />} />
        <Route path='/journal-editor' element={<JournalEditor />} />
        <Route path='/reflections' element={<Reflections />} />
      </Routes>
    </div>
  )
}
