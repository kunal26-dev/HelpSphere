import { useEffect, useState } from 'react'
import { apiUrl } from '../api'
import '../styles/GovtDashboard.css'

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

function getComplaintStatusMessage(status) {
  if (status === 'resolved') {
    return 'This problem has been marked fixed. The member can see that it is solved.'
  }

  if (status === 'escalated') {
    return 'This problem has been escalated for higher-level action.'
  }

  return 'This problem is pending and still needs action.'
}

export default function GovtDashboard({ currentUser }) {
  const [complaints, setComplaints] = useState([])
  const [meetings, setMeetings] = useState([])
  const [schools, setSchools] = useState([])
  const [hospitals, setHospitals] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function loadDashboard() {
      const params = new URLSearchParams({
        role: currentUser.role,
        userId: currentUser.id
      })

      const dashboardErrors = await Promise.all([
        loadDashboardResource(
          `/api/complaints?${params}`,
          setComplaints,
          'Problems'
        ),
        loadDashboardResource(
          `/api/meetings?${params}`,
          setMeetings,
          'Meetings'
        ),
        loadDashboardResource(
          '/api/schools',
          setSchools,
          'Schools'
        ),
        loadDashboardResource(
          '/api/hospitals',
          setHospitals,
          'Healthcare'
        )
      ])

      const errors = dashboardErrors.filter(Boolean)

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
      const response = await fetch(apiUrl(path))
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
    const updated = await updateStatus(`/api/complaints/${id}/status`, { status })

    if (!updated) {
      return
    }

    setComplaints((items) => items.map((item) => (
      item.id === id ? { ...item, status } : item
    )))
    setMessage(`Problem status changed to ${status}.`)
  }

  const updateMeetingStatus = async (id, status) => {
    const updated = await updateStatus(`/api/meetings/${id}/status`, { status })

    if (!updated) {
      return
    }

    setMeetings((items) => items.map((item) => (
      item.id === id ? { ...item, status } : item
    )))
    setMessage(`Meeting status changed to ${status}.`)
  }

  const updateStatus = async (path, payload) => {
    setMessage('')
    const response = await fetch(apiUrl(path), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    const data = await readJsonResponse(response)

    if (!response.ok) {
      setMessage(data.message || 'Unable to update status')
      return false
    }

    return true
  }

  return (
    <main>
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h2 className="section-title">Government Official Dashboard</h2>
            <p className="section-subtitle">
              Review submitted problems, meeting requests, and town services.
            </p>
          </div>
          <div className="dashboard-summary">
            <span>{complaints.length} Problems</span>
            <span>{complaints.filter((item) => item.status === 'resolved').length} Fixed</span>
            <span>{meetings.length} Meetings</span>
            <span>{schools.length} Schools</span>
            <span>{hospitals.length} Health Centers</span>
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
                <p className={`status-note status-note-${complaint.status}`}>
                  {getComplaintStatusMessage(complaint.status)}
                </p>
                {complaint.photo && (
                  <a
                    href={complaint.photo}
                    target="_blank"
                    rel="noreferrer"
                    className="dashboard-photo-link"
                  >
                    <img
                      src={complaint.photo}
                      alt={complaint.type}
                      className="dashboard-photo"
                    />
                    <span>Open image</span>
                  </a>
                )}
                <div className="status-actions">
                  <button
                    className={complaint.status === 'pending' ? 'active pending' : ''}
                    onClick={() => updateComplaintStatus(complaint.id, 'pending')}
                  >
                    Pending
                  </button>
                  <button
                    className={complaint.status === 'resolved' ? 'active resolved' : ''}
                    onClick={() => updateComplaintStatus(complaint.id, 'resolved')}
                  >
                    Mark Fixed
                  </button>
                  <button
                    className={complaint.status === 'escalated' ? 'active escalated' : ''}
                    onClick={() => updateComplaintStatus(complaint.id, 'escalated')}
                  >
                    Escalated
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <h3>Town Information</h3>
          <div className="town-info-grid">
            <article className="dashboard-card">
              <h4>Education</h4>
              <p><strong>Total schools:</strong> {schools.length}</p>
              <p><strong>Total seats:</strong> {schools.reduce((total, school) => total + Number(school.seats || 0), 0)}</p>
              <div className="compact-list">
                {schools.slice(0, 5).map((school) => (
                  <span key={school.id}>{school.name}</span>
                ))}
              </div>
            </article>

            <article className="dashboard-card">
              <h4>Healthcare</h4>
              <p><strong>Health centers:</strong> {hospitals.length}</p>
              <div className="compact-list">
                {hospitals.map((hospital) => (
                  <span key={hospital.id}>{hospital.name} - {hospital.address}</span>
                ))}
              </div>
            </article>

            <article className="dashboard-card">
              <h4>Governance Snapshot</h4>
              <p><strong>Open problems:</strong> {complaints.filter((item) => item.status !== 'resolved').length}</p>
              <p><strong>Approved meetings:</strong> {meetings.filter((item) => item.status === 'approved').length}</p>
              <p><strong>Completed meetings:</strong> {meetings.filter((item) => item.status === 'completed').length}</p>
            </article>
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
                  <button
                    className={meeting.status === 'requested' ? 'active pending' : ''}
                    onClick={() => updateMeetingStatus(meeting.id, 'requested')}
                  >
                    Requested
                  </button>
                  <button
                    className={meeting.status === 'approved' ? 'active approved' : ''}
                    onClick={() => updateMeetingStatus(meeting.id, 'approved')}
                  >
                    Approved
                  </button>
                  <button
                    className={meeting.status === 'rejected' ? 'active escalated' : ''}
                    onClick={() => updateMeetingStatus(meeting.id, 'rejected')}
                  >
                    Rejected
                  </button>
                  <button
                    className={meeting.status === 'completed' ? 'active resolved' : ''}
                    onClick={() => updateMeetingStatus(meeting.id, 'completed')}
                  >
                    Completed
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
