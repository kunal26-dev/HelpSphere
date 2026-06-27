import { Link } from 'react-router-dom'
import '../styles/Home.css'

export default function Home() {
  return (
    <main>
      <div className="container">
        <div className="hero-section">
          <h1>Welcome to HelpSphere</h1>

          <p>
            Your Town Management Portal for Better Governance &
            Community Service
          </p>

          <p className="subtitle">
            Connect with local administration, report issues,
            access services, and participate in town development.
          </p>
        </div>

        <div className="features-grid">
          <Link to="/problems" className="feature-card">
            <div className="feature-icon">🔧</div>
            <h3>Problem Portal</h3>
            <p>
              Report road damage, broken streetlights, and
              other civic issues.
            </p>
          </Link>

          <Link to="/schemes" className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>New Schemes</h3>
            <p>
              Stay updated with government schemes and town
              development projects.
            </p>
          </Link>

          <Link to="/meeting" className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Town Meeting</h3>
            <p>
              Connect with gram pradhan and village leaders.
            </p>
          </Link>

          <Link to="/healthcare" className="feature-card">
            <div className="feature-icon">🏥</div>
            <h3>Healthcare</h3>
            <p>
              Find hospitals, clinics, ambulance services,
              and medical facilities.
            </p>
          </Link>

          <Link to="/education" className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Education</h3>
            <p>
              Browse schools, teacher vacancies, and
              available seats.
            </p>
          </Link>

          <Link to="/schemes" className="feature-card">
            <div className="feature-icon">💼</div>
            <h3>Town Services</h3>
            <p>
              Access municipal services and administrative
              information.
            </p>
          </Link>
        </div>

        <section className="stats-section">
          <div className="stat-card">
            <h3>50+</h3>
            <p>Complaints Resolved</p>
          </div>

          <div className="stat-card">
            <h3>25</h3>
            <p>Healthcare Centers</p>
          </div>

          <div className="stat-card">
            <h3>40</h3>
            <p>Schools</p>
          </div>

          <div className="stat-card">
            <h3>15</h3>
            <p>Active Schemes</p>
          </div>
        </section>
      </div>
    </main>
  )
}