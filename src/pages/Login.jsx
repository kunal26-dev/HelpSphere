import { useState } from 'react'
import { Link } from 'react-router-dom'
import { apiUrl } from '../api'
import '../styles/Login.css'

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
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const response = await fetch(apiUrl('/api/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
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
            Sign in with the email and password used during signup.
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
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

          <p className="auth-switch">
            New here? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </section>
    </main>
  )
}
