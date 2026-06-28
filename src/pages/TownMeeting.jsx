import { useEffect, useState } from 'react'
import '../styles/TownMeeting.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

async function readJsonResponse(response) {
  const text = await response.text()
  return text ? JSON.parse(text) : {}
}

export default function TownMeeting({ currentUser }) {
  const [meetings, setMeetings] = useState([])
  const [message, setMessage] = useState('')
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: ''
  })
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    async function loadMeetings() {
      try {
        const params = new URLSearchParams({
          role: currentUser.role,
          userId: currentUser.id
        })
        const response = await fetch(`${API_BASE_URL}/api/meetings?${params}`)
        const data = await readJsonResponse(response)

        if (!response.ok) {
          throw new Error(data.message || 'Unable to load meetings')
        }

        setMeetings(data)
      } catch (error) {
        setMessage(error.message)
      }
    }

    loadMeetings()
  }, [currentUser])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    if (!newMeeting.title || !newMeeting.date || !newMeeting.time || !newMeeting.location) {
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/meetings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...newMeeting,
          userId: currentUser.id,
          submitterName: currentUser.name
        })
      })
      const data = await readJsonResponse(response)

      if (!response.ok) {
        throw new Error(data.message || 'Unable to submit meeting request')
      }

      setMeetings([data, ...meetings])
      setNewMeeting({ title: '', date: '', time: '', location: '', description: '' })
      setShowForm(false)
      setMessage('Meeting request sent to government officials.')
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <main>
      <div className="container">
        <h2 className="section-title">Town Meeting Scheduler</h2>
        <p className="section-subtitle">Request meetings with gram pradhan and community leaders</p>

        {message && (
          <p className="meeting-message">
            {message}
          </p>
        )}

        <div className="meeting-controls">
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : 'Request a Meeting'}
          </button>
        </div>

        {showForm && (
          <div className="meeting-form-container">
            <h3>Request Community Meeting</h3>
            <form onSubmit={handleSubmit} className="meeting-form">
              <div className="form-group">
                <label>Meeting Title</label>
                <input
                  type="text"
                  value={newMeeting.title}
                  onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
                  placeholder="e.g., Community Welfare Discussion"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={newMeeting.date}
                    onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    value={newMeeting.time}
                    onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={newMeeting.location}
                  onChange={(e) => setNewMeeting({ ...newMeeting, location: e.target.value })}
                  placeholder="Meeting venue"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newMeeting.description}
                  onChange={(e) => setNewMeeting({ ...newMeeting, description: e.target.value })}
                  placeholder="Agenda and details..."
                ></textarea>
              </div>

              <button type="submit" className="btn btn-success">Send Request</button>
            </form>
          </div>
        )}

        <div className="community-section">
          <h3>{currentUser.role === 'official' ? 'All Meeting Requests' : 'Your Meeting Requests'}</h3>
          <div className="meetings-list">
            {meetings.map((meeting) => (
              <div key={meeting.id} className="meeting-card">
                <div className="meeting-status">
                  <span className={`status-badge ${meeting.status}`}>
                    {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                  </span>
                </div>

                <h4>{meeting.title}</h4>

                <div className="meeting-info">
                  <p><strong>Requested By:</strong> {meeting.submitterName}</p>
                  <p><strong>Date:</strong> {meeting.date}</p>
                  <p><strong>Time:</strong> {meeting.time}</p>
                  <p><strong>Location:</strong> {meeting.location}</p>
                  <p><strong>Description:</strong> {meeting.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <section className="guidelines-section">
          <h3>Community Meeting Guidelines</h3>
          <ul>
            <li>Requests are sent to government officials for review</li>
            <li>Come prepared with questions or suggestions</li>
            <li>Respect the agenda and time allocated</li>
            <li>Minutes are published within 48 hours after approved meetings</li>
          </ul>
        </section>
      </div>
    </main>
  )
}
