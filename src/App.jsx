import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import ProblemPortal from './pages/ProblemPortal'
import NewSchemes from './pages/NewSchemes'
import TownMeeting from './pages/TownMeeting'
import TownHealthcare from './pages/TownHealthcare'
import TownEducation from './pages/TownEducation'

function App() {
  return (
    <Router>
      <div className="app">
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
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problems" element={<ProblemPortal />} />
          <Route path="/schemes" element={<NewSchemes />} />
          <Route path="/meeting" element={<TownMeeting />} />
          <Route path="/healthcare" element={<TownHealthcare />} />
          <Route path="/education" element={<TownEducation />} />
        </Routes>

        <footer className="footer">
          <div className="container">
            <p>&copy; 2026 HelpSphere - Town Management Portal. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App

