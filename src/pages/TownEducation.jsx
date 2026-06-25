import { useState } from 'react'
import '../styles/TownEducation.css'

export default function TownEducation() {
  const [applications, setApplications] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [teacherForm, setTeacherForm] = useState({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    subject: '',
    schoolId: ''
  })

  const schools = [
    {
      id: 1,
      name: 'Government Senior Secondary School',
      type: 'Government',
      rating: 4.3,
      classes: '9-12',
      totalSeats: 400,
      vacantSeats: 45,
      contact: '0571-1234567',
      principal: 'Dr. Rajesh Kumar',
      address: 'Main Road',
      teacherVacancies: [
        { subject: 'Mathematics', positions: 2 },
        { subject: 'Science', positions: 1 }
      ]
    },
    {
      id: 2,
      name: 'Delhi Public School',
      type: 'Private',
      rating: 4.8,
      classes: 'Nursery-12',
      totalSeats: 600,
      vacantSeats: 30,
      contact: '0571-2345678',
      principal: 'Ms. Priya Singh',
      address: 'Sector 5',
      teacherVacancies: [
        { subject: 'English', positions: 1 },
        { subject: 'Computer Science', positions: 2 }
      ]
    },
    {
      id: 3,
      name: 'Saraswati Vidya Mandir',
      type: 'Government',
      rating: 4.1,
      classes: '1-8',
      totalSeats: 350,
      vacantSeats: 60,
      contact: '0571-3456789',
      principal: 'Shri Anand Kumar',
      address: 'Market Area',
      teacherVacancies: [
        { subject: 'Hindi', positions: 1 },
        { subject: 'Social Studies', positions: 1 }
      ]
    },
    {
      id: 4,
      name: 'St. Mary Convent School',
      type: 'Private',
      rating: 4.6,
      classes: 'Nursery-10',
      totalSeats: 500,
      vacantSeats: 25,
      contact: '0571-4567890',
      principal: 'Sr. Joseph',
      address: 'Church Road',
      teacherVacancies: [
        { subject: 'Physical Education', positions: 1 }
      ]
    },
    {
      id: 5,
      name: 'Municipal High School',
      type: 'Government',
      rating: 3.9,
      classes: '6-10',
      totalSeats: 450,
      vacantSeats: 70,
      contact: '0571-5678901',
      principal: 'Shri Vikram Singh',
      address: 'Near Bus Stand',
      teacherVacancies: [
        { subject: 'Mathematics', positions: 2 },
        { subject: 'Science', positions: 1 },
        { subject: 'English', positions: 1 }
      ]
    }
  ]

  const handleTeacherApplication = (e) => {
    e.preventDefault()
    if (teacherForm.name && teacherForm.email && teacherForm.phone && teacherForm.qualification && teacherForm.subject) {
      const newApp = {
        id: applications.length + 1,
        ...teacherForm,
        date: new Date().toISOString().split('T')[0],
        status: 'Submitted'
      }
      setApplications([newApp, ...applications])
      setTeacherForm({ name: '', email: '', phone: '', qualification: '', subject: '', schoolId: '' })
      setShowForm(false)
      alert('Application submitted successfully! We will contact you soon.')
    }
  }

  return (
    <main>
      <div className="container">
        <h2 className="section-title">Town Education Services</h2>
        <p className="section-subtitle">Explore schools and teaching opportunities in our town</p>

        <section className="education-section">
          <h3>🎓 Schools in Town</h3>
          <div className="schools-grid">
            {schools.map(school => (
              <div key={school.id} className="school-card">
                <div className="school-header">
                  <h4>{school.name}</h4>
                  <div className="rating-badge">
                    <span className="stars">★</span> {school.rating}
                  </div>
                </div>

                <p className="school-type">{school.type}</p>

                <div className="school-info">
                  <p><strong>Classes:</strong> {school.classes}</p>
                  <p><strong>Principal:</strong> {school.principal}</p>
                  <p><strong>📍 Address:</strong> {school.address}</p>
                  <p><strong>📞 Contact:</strong> {school.contact}</p>
                </div>

                <div className="seats-info">
                  <div className="seats-bar">
                    <div className="seats-label">
                      <span>Available Seats</span>
                      <span className="seats-count">{school.vacantSeats}/{school.totalSeats}</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: `${(school.vacantSeats / school.totalSeats) * 100}%`}}></div>
                    </div>
                  </div>
                </div>

                <div className="vacancies">
                  <strong>🏫 Teacher Vacancies:</strong>
                  <ul>
                    {school.teacherVacancies.map((vacancy, idx) => (
                      <li key={idx}>{vacancy.subject}: {vacancy.positions} position(s)</li>
                    ))}
                  </ul>
                </div>

                <div className="school-actions">
                  <button className="btn btn-secondary btn-small">School Info</button>
                  <button className="btn btn-primary btn-small">Admission</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="education-section">
          <h3>👨‍🏫 Teacher Recruitment</h3>
          <div className="teacher-section">
            <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
              {showForm ? 'Cancel Application' : 'Apply for Teacher Position'}
            </button>

            {showForm && (
              <form onSubmit={handleTeacherApplication} className="teacher-form">
                <h4>Teacher Application Form</h4>

                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={teacherForm.name}
                      onChange={(e) => setTeacherForm({...teacherForm, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={teacherForm.email}
                      onChange={(e) => setTeacherForm({...teacherForm, email: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={teacherForm.phone}
                      onChange={(e) => setTeacherForm({...teacherForm, phone: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Qualification</label>
                    <select
                      value={teacherForm.qualification}
                      onChange={(e) => setTeacherForm({...teacherForm, qualification: e.target.value})}
                      required
                    >
                      <option value="">Select Qualification</option>
                      <option value="B.A. B.Ed">B.A. B.Ed</option>
                      <option value="B.Sc. B.Ed">B.Sc. B.Ed</option>
                      <option value="M.A. B.Ed">M.A. B.Ed</option>
                      <option value="B.Tech">B.Tech</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Subject to Teach</label>
                    <select
                      value={teacherForm.subject}
                      onChange={(e) => setTeacherForm({...teacherForm, subject: e.target.value})}
                      required
                    >
                      <option value="">Select Subject</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Science">Science</option>
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Social Studies">Social Studies</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Physical Education">Physical Education</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Preferred School</label>
                    <select
                      value={teacherForm.schoolId}
                      onChange={(e) => setTeacherForm({...teacherForm, schoolId: e.target.value})}
                    >
                      <option value="">Any School</option>
                      {schools.map(school => (
                        <option key={school.id} value={school.id}>{school.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn btn-success">Submit Application</button>
              </form>
            )}

            {applications.length > 0 && (
              <div className="applications-list">
                <h4>Your Applications</h4>
                {applications.map(app => (
                  <div key={app.id} className="application-card">
                    <p><strong>Position:</strong> {app.subject} Teacher</p>
                    <p><strong>Applied on:</strong> {app.date}</p>
                    <p><strong>Status:</strong> <span className="status-badge">{app.status}</span></p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="education-section">
          <h3>📚 Educational Programs & Schemes</h3>
          <div className="programs-grid">
            <div className="program-card">
              <h4>Scholarship Program</h4>
              <p>Merit-based scholarships for deserving students from low-income families</p>
              <p><strong>Contact:</strong> Municipal Education Office</p>
            </div>
            <div className="program-card">
              <h4>Digital Learning Initiative</h4>
              <p>Free computer labs and internet access in all government schools</p>
              <p><strong>Target:</strong> 500+ students annually</p>
            </div>
            <div className="program-card">
              <h4>Adult Literacy Program</h4>
              <p>Evening classes for adult literacy and skill development</p>
              <p><strong>Schedule:</strong> Mon-Fri 6-8 PM</p>
            </div>
            <div className="program-card">
              <h4>Sports & Extracurricular</h4>
              <p>Free coaching in sports, music, and arts for all students</p>
              <p><strong>Location:</strong> Sports Complex</p>
            </div>
          </div>
        </section>

        <section className="admission-info">
          <h3>Admission Information</h3>
          <ul>
            <li>Online admission portal is available on school websites</li>
            <li>Admission process typically starts in March every year</li>
            <li>Government schools follow merit-based or proximity-based admissions</li>
            <li>Fee waivers available for below-poverty-line students</li>
            <li>Contact individual schools for specific requirements</li>
          </ul>
        </section>
      </div>
    </main>
  )
}
