import { useState } from 'react'
import { Link } from 'react-router-dom'
import { apiUrl } from '../api'
import '../styles/Login.css'

const initialFormData = {
  role: 'member',
  name: '',
  email: '',
  password: '',
  phone: '',
  address: '',
  department: '',
  designation: ''
}

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

export default function Signup({ onSignup }) {
  const [formData, setFormData] = useState(initialFormData)
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const response = await fetch(apiUrl('/api/signup'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await readJsonResponse(response)

      if (!response.ok) {
        throw new Error(data.message || 'Signup API is not reachable. Check that the backend server is running.')
      }

      if (!data.user) {
        throw new Error('Signup API returned an empty response.')
      }

      onSignup(data.user)
    } catch (error) {
      setMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="login-page">
      <section className="login-panel">
        <div className="login-intro">
          <p className="login-kicker">HelpSphere Signup</p>
          <h1>Create your HelpSphere account</h1>
          <p>
            Register as a resident or government official, then return with
            your email and password whenever you need the portal.
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="role-toggle" aria-label="Select signup role">
            <button
              type="button"
              className={formData.role === 'member' ? 'active' : ''}
              onClick={() => updateField('role', 'member')}
            >
              Town Member
            </button>
            <button
              type="button"
              className={formData.role === 'official' ? 'active' : ''}
              onClick={() => updateField('role', 'official')}
            >
              Govt Official
            </button>
          </div>

          <label htmlFor="name">Full name</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(event) => updateField('name', event.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(event) => updateField('email', event.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            minLength="6"
            value={formData.password}
            onChange={(event) => updateField('password', event.target.value)}
            required
          />

          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            required
          />

          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            rows="3"
            value={formData.address}
            onChange={(event) => updateField('address', event.target.value)}
            required
          />

          {formData.role === 'official' && (
            <>
              <label htmlFor="department">Department</label>
              <input
                id="department"
                type="text"
                value={formData.department}
                onChange={(event) => updateField('department', event.target.value)}
                placeholder="Gram Panchayat"
              />

              <label htmlFor="designation">Designation</label>
              <input
                id="designation"
                type="text"
                value={formData.designation}
                onChange={(event) => updateField('designation', event.target.value)}
                placeholder="Government Official"
              />
            </>
          )}

          {message && (
            <p className="login-error">
              {message}
            </p>
          )}

          <button className="btn btn-primary login-submit" type="submit">
            {isSubmitting ? 'Creating account...' : 'Sign up'}
          </button>

          <p className="auth-switch">
            Already registered? <Link to="/login">Login</Link>
          </p>
        </form>
      </section>
    </main>
  )
}
