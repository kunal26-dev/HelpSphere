import { useEffect, useState } from 'react'
import { apiUrl } from '../api'
import '../styles/ProblemPortal.css'

async function readJsonResponse(response) {
  const text = await response.text()
  return text ? JSON.parse(text) : {}
}

export default function ProblemPortal({ currentUser }) {
  const [complaints, setComplaints] = useState([])
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    type: '',
    location: '',
    description: '',
    photo: null
  })
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    async function loadComplaints() {
      try {
        const params = new URLSearchParams({
          role: currentUser.role,
          userId: currentUser.id
        })
        const response = await fetch(apiUrl(`/api/complaints?${params}`))
        const data = await readJsonResponse(response)

        if (!response.ok) {
          throw new Error(data.message || 'Unable to load complaints')
        }

        setComplaints(data)
      } catch (error) {
        setMessage(error.message)
      }
    }

    loadComplaints()
  }, [currentUser])

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({ ...formData, photo: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    if (!formData.type || !formData.location || !formData.description) {
      return
    }

    try {
      const response = await fetch(apiUrl('/api/complaints'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: currentUser.id,
          submitterName: currentUser.name,
          type: formData.type,
          location: formData.location,
          description: formData.description,
          photo: preview
        })
      })
      const data = await readJsonResponse(response)

      if (!response.ok) {
        throw new Error(data.message || 'Unable to submit complaint')
      }

      setComplaints([data, ...complaints])
      setFormData({ type: '', location: '', description: '', photo: null })
      setPreview(null)
      setMessage('Complaint sent to government officials.')
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <main>
      <div className="container">
        <h2 className="section-title">Problem Portal</h2>
        <p className="section-subtitle">Report civic issues and track their resolution</p>

        {message && (
          <p className="portal-message">
            {message}
          </p>
        )}

        <div className="portal-content">
          <div className="form-section">
            <h3>Report a Problem</h3>
            <form onSubmit={handleSubmit} className="complaint-form">
              <div className="form-group">
                <label>Problem Type</label>
                <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} required>
                  <option value="">Select Type</option>
                  <option value="Road Damage">Road Damage</option>
                  <option value="Broken Streetlight">Broken Streetlight</option>
                  <option value="Water Issue">Water Issue</option>
                  <option value="Waste Management">Waste Management</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Location</label>
                <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="Enter exact location" required />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Describe the problem..." required></textarea>
              </div>

              <div className="form-group">
                <label>Upload Photo</label>
                <input type="file" accept="image/*" onChange={handlePhotoChange} />
                {preview && <img src={preview} alt="Preview" className="photo-preview" />}
              </div>

              <button type="submit" className="btn btn-primary">Submit Complaint</button>
            </form>
          </div>

          <div className="complaints-section">
            <h3>{currentUser.role === 'official' ? 'All Complaints' : 'Your Complaints'}</h3>
            <div className="complaints-list">
              {complaints.map((complaint) => (
                <div key={complaint.id} className="complaint-card">
                  <div className="complaint-header">
                    <h4>{complaint.type}</h4>
                    <span className={`badge badge-${complaint.status}`}>{complaint.status}</span>
                  </div>
                  <p><strong>Submitted By:</strong> {complaint.submitterName}</p>
                  <p><strong>Location:</strong> {complaint.location}</p>
                  <p><strong>Description:</strong> {complaint.description}</p>
                  <p><strong>Reported:</strong> {complaint.date}</p>
                  {complaint.photo && (
                    <img src={complaint.photo} alt={complaint.type} className="photo-preview" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="info-box">
          <h4>Escalation Process</h4>
          <p>If your complaint is not resolved within 7 days, it can be escalated to the Block Development Officer.</p>
          <p>Photos help officials identify and resolve issues faster.</p>
          <p>Government officials can view submitted complaints from the official dashboard.</p>
        </div>
      </div>
    </main>
  )
}
