import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import Contacts from './pages/Contacts'
import Chat from './pages/Chat'
import JournalEntry from './pages/JournalEntry'
import ViewEntry from './pages/ViewEntry'
import Reflections from './pages/Reflections'

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/chat/:contactId' element={<Chat />} />
          <Route path='/journal/:date' element={<JournalEntry />} />
          <Route path='/view-entry' element={<ViewEntry />} />
          <Route path='/reflections' element={<Reflections />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
