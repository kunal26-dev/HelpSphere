import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Navigate, Routes, Route, Link } from 'react-router-dom'
import './App.css'

import GovtDashboard from './pages/GovtDashboard'
import Home from './pages/Home'
import Login from './pages/Login'
import ProblemPortal from './pages/ProblemPortal'
import NewSchemes from './pages/NewSchemes'
import TownMeeting from './pages/TownMeeting'
import TownHealthcare from './pages/TownHealthcare'
import TownEducation from './pages/TownEducation'

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('helpsphereUser')

    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogin = (user) => {
    localStorage.setItem('helpsphereUser', JSON.stringify(user))
    setCurrentUser(user)
  }

  const handleLogout = () => {
    localStorage.removeItem('helpsphereUser')
    setCurrentUser(null)
  }

  if (!currentUser) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    )
  }

  return (
    <Router>
      <div className="app">

        {/* Navbar */}
        <nav className="navbar">
          <div className="container">
            <div className="nav-brand">
              <h1>HelpSphere</h1>
            </div>

            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/problems">Problem Portal</Link></li>
              <li><Link to="/schemes">New Schemes</Link></li>
              <li><Link to="/meeting">Town Meeting</Link></li>
              <li><Link to="/healthcare">Healthcare</Link></li>
              <li><Link to="/education">Education</Link></li>
              {currentUser.role === 'official' && (
                <li><Link to="/dashboard">Govt Dashboard</Link></li>
              )}
            </ul>

            <div className="user-menu">
              <span>{currentUser.name}</span>
              <small>{currentUser.role}</small>
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/problems" element={<ProblemPortal currentUser={currentUser} />} />
            <Route path="/schemes" element={<NewSchemes />} />
            <Route path="/meeting" element={<TownMeeting currentUser={currentUser} />} />
            <Route path="/healthcare" element={<TownHealthcare />} />
            <Route path="/education" element={<TownEducation />} />
            <Route
              path="/dashboard"
              element={
                currentUser.role === 'official'
                  ? <GovtDashboard currentUser={currentUser} />
                  : <Navigate to="/" replace />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <p>
              &copy; 2026 HelpSphere - Town Management Portal. All rights reserved.
            </p>
          </div>
        </footer>

      </div>
    </Router>
  )
}

export default App
