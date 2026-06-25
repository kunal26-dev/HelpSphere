import { useState } from 'react'
import '../styles/ProblemPortal.css'

export default function ProblemPortal() {
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      type: 'Road Damage',
      location: 'Main Street',
      description: 'Large pothole causing traffic issues',
      status: 'resolved',
      date: '2026-06-20',
      escalated: false
    },
    {
      id: 2,
      type: 'Broken Streetlight',
      location: 'Park Road',
      description: 'Streetlight not working for 2 weeks',
      status: 'pending',
      date: '2026-06-18',
      escalated: false
    }
  ])

  const [formData, setFormData] = useState({
    type: '',
    location: '',
    description: '',
    photo: null
  })

  const [preview, setPreview] = useState(null)

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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.type && formData.location && formData.description) {
      const newComplaint = {
        id: complaints.length + 1,
        type: formData.type,
        location: formData.location,
        description: formData.description,
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
        escalated: false
      }
      setComplaints([newComplaint, ...complaints])
      setFormData({ type: '', location: '', description: '', photo: null })
      setPreview(null)
      alert('Complaint submitted successfully!')
    }
  }

  const checkEscalation = (index) => {
    const updated = [...complaints]
    if (updated[index].status === 'pending') {
      const daysPassed = Math.floor((new Date() - new Date(updated[index].date)) / (1000 * 60 * 60 * 24))
      if (daysPassed > 7) {
        updated[index].escalated = true
        updated[index].status = 'escalated'
        setComplaints(updated)
        alert('Complaint escalated to Block Development Officer!')
      }
    }
  }

  return (
    <main>
      <div className="container">
        <h2 className="section-title">Problem Portal</h2>
        <p className="section-subtitle">Report civic issues and track their resolution</p>

        <div className="portal-content">
          <div className="form-section">
            <h3>Report a Problem</h3>
            <form onSubmit={handleSubmit} className="complaint-form">
              <div className="form-group">
                <label>Problem Type</label>
                <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} required>
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
                <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} placeholder="Enter exact location" required />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Describe the problem..." required></textarea>
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
            <h3>Tracked Complaints</h3>
            <div className="complaints-list">
              {complaints.map((complaint, index) => (
                <div key={complaint.id} className="complaint-card">
                  <div className="complaint-header">
                    <h4>{complaint.type}</h4>
                    <span className={`badge badge-${complaint.status}`}>{complaint.status}</span>
                  </div>
                  <p><strong>Location:</strong> {complaint.location}</p>
                  <p><strong>Description:</strong> {complaint.description}</p>
                  <p><strong>Reported:</strong> {complaint.date}</p>
                  {complaint.status === 'pending' && (
                    <button onClick={() => checkEscalation(index)} className="btn btn-secondary btn-small">
                      Check Escalation
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="info-box">
          <h4>Escalation Process</h4>
          <p>• If your complaint is not resolved within 7 days, it will automatically be escalated to the Block Development Officer</p>
          <p>• Photos help us identify and resolve issues faster</p>
          <p>• You can track your complaint status anytime on this portal</p>
        </div>
      </div>
    </main>
  )
}
