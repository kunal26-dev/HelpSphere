import { useEffect, useState } from 'react'
import '../styles/GovtDashboard.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

async function readJsonResponse(response) {
  const text = await response.text()

  if (!text) {
    return {}
  }

  try {
    return JSON.parse(text)
  } catch (error) {
    return {
      message: text
    }
  }
}

export default function GovtDashboard({ currentUser }) {
  const [complaints, setComplaints] = useState([])
  const [meetings, setMeetings] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function loadDashboard() {
      const params = new URLSearchParams({
        role: currentUser.role,
        userId: currentUser.id
      })

      const [complaintsError, meetingsError] = await Promise.all([
        loadDashboardResource(
          `/api/complaints?${params}`,
          setComplaints,
          'Problems'
        ),
        loadDashboardResource(
          `/api/meetings?${params}`,
          setMeetings,
          'Meetings'
        )
      ])

      const errors = [complaintsError, meetingsError].filter(Boolean)

      if (errors.length > 0) {
        setMessage(errors.join(' '))
      } else {
        setMessage('')
      }
    }

    loadDashboard()
  }, [currentUser])

  const loadDashboardResource = async (path, setItems, label) => {
    try {
      const response = await fetch(`${API_BASE_URL}${path}`)
      const data = await readJsonResponse(response)

      if (!response.ok) {
        return `${label}: ${data.message || 'Unable to load data.'}`
      }

      setItems(data)
      return ''
    } catch (error) {
      return `${label}: ${error.message}`
    }
  }

  const updateComplaintStatus = async (id, status) => {
    await updateStatus(`/api/complaints/${id}/status`, { status })
    setComplaints((items) => items.map((item) => (
      item.id === id ? { ...item, status } : item
    )))
  }

  const updateMeetingStatus = async (id, status) => {
    await updateStatus(`/api/meetings/${id}/status`, { status })
    setMeetings((items) => items.map((item) => (
      item.id === id ? { ...item, status } : item
    )))
  }

  const updateStatus = async (path, payload) => {
    setMessage('')
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    const data = await readJsonResponse(response)

    if (!response.ok) {
      setMessage(data.message || 'Unable to update status')
    }
  }

  return (
    <main>
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h2 className="section-title">Government Official Dashboard</h2>
            <p className="section-subtitle">
              Review submitted problems and meeting requests from town members.
            </p>
          </div>
          <div className="dashboard-summary">
            <span>{complaints.length} Problems</span>
            <span>{meetings.length} Meetings</span>
          </div>
        </div>

        {message && (
          <p className="dashboard-message">
            {message}
          </p>
        )}

        <section className="dashboard-section">
          <h3>Submitted Problems</h3>
          <div className="dashboard-grid">
            {complaints.length === 0 && (
              <p className="empty-dashboard-state">
                No submitted problems yet.
              </p>
            )}

            {complaints.map((complaint) => (
              <article key={complaint.id} className="dashboard-card">
                <div className="dashboard-card-header">
                  <h4>{complaint.type}</h4>
                  <span className={`badge badge-${complaint.status}`}>{complaint.status}</span>
                </div>
                <p><strong>By:</strong> {complaint.submitterName}</p>
                <p><strong>Location:</strong> {complaint.location}</p>
                <p><strong>Description:</strong> {complaint.description}</p>
                <p><strong>Reported:</strong> {complaint.date}</p>
                <div className="status-actions">
                  <button onClick={() => updateComplaintStatus(complaint.id, 'pending')}>Pending</button>
                  <button onClick={() => updateComplaintStatus(complaint.id, 'resolved')}>Resolved</button>
                  <button onClick={() => updateComplaintStatus(complaint.id, 'escalated')}>Escalated</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <h3>Meeting Requests</h3>
          <div className="dashboard-grid">
            {meetings.length === 0 && (
              <p className="empty-dashboard-state">
                No meeting requests yet.
              </p>
            )}

            {meetings.map((meeting) => (
              <article key={meeting.id} className="dashboard-card">
                <div className="dashboard-card-header">
                  <h4>{meeting.title}</h4>
                  <span className={`status-badge ${meeting.status}`}>{meeting.status}</span>
                </div>
                <p><strong>By:</strong> {meeting.submitterName}</p>
                <p><strong>Date:</strong> {meeting.date}</p>
                <p><strong>Time:</strong> {meeting.time}</p>
                <p><strong>Location:</strong> {meeting.location}</p>
                <p><strong>Description:</strong> {meeting.description}</p>
                <div className="status-actions">
                  <button onClick={() => updateMeetingStatus(meeting.id, 'requested')}>Requested</button>
                  <button onClick={() => updateMeetingStatus(meeting.id, 'approved')}>Approved</button>
                  <button onClick={() => updateMeetingStatus(meeting.id, 'rejected')}>Rejected</button>
                  <button onClick={() => updateMeetingStatus(meeting.id, 'completed')}>Completed</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
