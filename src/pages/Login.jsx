import { useState } from 'react'
import '../styles/Login.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

const credentials = {
  official: {
    email: 'official@helpsphere.local',
    password: 'official123'
  },
  member: {
    email: 'member@helpsphere.local',
    password: 'member123'
  }
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

export default function Login({ onLogin }) {
  const [role, setRole] = useState('official')
  const [formData, setFormData] = useState(credentials.official)
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRoleChange = (nextRole) => {
    setRole(nextRole)
    setFormData(credentials[nextRole])
    setMessage('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role
        })
      })

      const data = await readJsonResponse(response)

      if (!response.ok) {
        throw new Error(data.message || 'Login API is not reachable. Check that the backend server is running.')
      }

      if (!data.user) {
        throw new Error('Login API returned an empty response.')
      }

      onLogin(data.user)
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
          <p className="login-kicker">HelpSphere Access</p>
          <h1>Login to Town Management Portal</h1>
          <p>
            Choose your access type to continue as a government official
            or registered town member.
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="role-toggle" aria-label="Select login role">
            <button
              type="button"
              className={role === 'official' ? 'active' : ''}
              onClick={() => handleRoleChange('official')}
            >
              Govt Official
            </button>
            <button
              type="button"
              className={role === 'member' ? 'active' : ''}
              onClick={() => handleRoleChange('member')}
            >
              Member
            </button>
          </div>

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(event) => setFormData({
              ...formData,
              email: event.target.value
            })}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={(event) => setFormData({
              ...formData,
              password: event.target.value
            })}
            required
          />

          {message && (
            <p className="login-error">
              {message}
            </p>
          )}

          <button className="btn btn-primary login-submit" type="submit">
            {isSubmitting ? 'Signing in...' : 'Login'}
          </button>

          <div className="demo-credentials">
            <strong>Initial credentials</strong>
            <p>Official: official@helpsphere.local / official123</p>
            <p>Member: member@helpsphere.local / member123</p>
          </div>
        </form>
      </section>
    </main>
  )
}
