import { useState } from 'react'
import '../styles/TownMeeting.css'

export default function TownMeeting() {
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: 'Road Development Discussion',
      host: 'Shri Ram Niwas - Gram Pradhan',
      date: '2026-06-25',
      time: '10:00 AM',
      location: 'Community Hall',
      description: 'Discussion on upcoming road construction and maintenance',
      attendees: 45,
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Healthcare Services Review',
      host: 'Smt. Meera Singh - Deputy Gram Pradhan',
      date: '2026-06-20',
      time: '2:00 PM',
      location: 'Municipal Office',
      description: 'Review of healthcare facilities and new clinic setup',
      attendees: 32,
      status: 'completed'
    },
    {
      id: 3,
      title: 'Education & Scholarship Programs',
      host: 'Shri Ram Niwas - Gram Pradhan',
      date: '2026-07-05',
      time: '11:00 AM',
      location: 'School Auditorium',
      description: 'Information about scholarship programs and school improvements',
      attendees: 60,
      status: 'upcoming'
    }
  ])

  const [newMeeting, setNewMeeting] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: ''
  })

  const [showForm, setShowForm] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newMeeting.title && newMeeting.date && newMeeting.time && newMeeting.location) {
      const meeting = {
        id: meetings.length + 1,
        ...newMeeting,
        host: 'Admin',
        attendees: 0,
        status: 'upcoming'
      }
      setMeetings([meeting, ...meetings])
      setNewMeeting({ title: '', date: '', time: '', location: '', description: '' })
      setShowForm(false)
      alert('Meeting scheduled successfully!')
    }
  }

  return (
    <main>
      <div className="container">
        <h2 className="section-title">Town Meeting Scheduler</h2>
        <p className="section-subtitle">Connect with gram pradhan and community leaders</p>

        <div className="meeting-controls">
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : 'Schedule a Meeting'}
          </button>
        </div>

        {showForm && (
          <div className="meeting-form-container">
            <h3>Schedule Community Meeting</h3>
            <form onSubmit={handleSubmit} className="meeting-form">
              <div className="form-group">
                <label>Meeting Title</label>
                <input
                  type="text"
                  value={newMeeting.title}
                  onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
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
                    onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    value={newMeeting.time}
                    onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={newMeeting.location}
                  onChange={(e) => setNewMeeting({...newMeeting, location: e.target.value})}
                  placeholder="Meeting venue"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newMeeting.description}
                  onChange={(e) => setNewMeeting({...newMeeting, description: e.target.value})}
                  placeholder="Agenda and details..."
                ></textarea>
              </div>

              <button type="submit" className="btn btn-success">Create Meeting</button>
            </form>
          </div>
        )}

        <div className="community-section">
          <h3>Upcoming & Recent Meetings</h3>
          <div className="meetings-list">
            {meetings.map(meeting => (
              <div key={meeting.id} className="meeting-card">
                <div className="meeting-status">
                  <span className={`status-badge ${meeting.status}`}>
                    {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                  </span>
                </div>

                <h4>{meeting.title}</h4>

                <div className="meeting-info">
                  <p><strong>Host:</strong> {meeting.host}</p>
                  <p><strong>📅 Date:</strong> {meeting.date}</p>
                  <p><strong>⏰ Time:</strong> {meeting.time}</p>
                  <p><strong>📍 Location:</strong> {meeting.location}</p>
                  <p><strong>Description:</strong> {meeting.description}</p>
                  <p><strong>👥 Expected Attendees:</strong> {meeting.attendees}</p>
                </div>

                <div className="meeting-actions">
                  <button className="btn btn-secondary btn-small">Learn More</button>
                  <button className="btn btn-primary btn-small">Register</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <section className="guidelines-section">
          <h3>Community Meeting Guidelines</h3>
          <ul>
            <li>Meetings are open to all town residents</li>
            <li>Come prepared with questions or suggestions</li>
            <li>Respect the agenda and time allocated</li>
            <li>Decisions are made by majority consensus</li>
            <li>Minutes are published within 48 hours</li>
            <li>Gram Pradhan holds office hours every Saturday 10-12 PM</li>
          </ul>
        </section>
      </div>
    </main>
  )
}
