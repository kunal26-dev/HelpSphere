import '../styles/NewSchemes.css'

export default function NewSchemes() {
  const schemes = [
    {
      id: 1,
      name: 'Road Maintenance & Repair Program',
      description: 'Comprehensive road repairs and resurfacing in town areas',
      budget: '₹50,00,000',
      status: 'Active',
      startDate: '2026-01-15',
      endDate: '2026-12-31',
      beneficiaries: 'All residents'
    },
    {
      id: 2,
      name: 'Clean Water Initiative',
      description: 'Installation of water purification systems and pipeline repairs',
      budget: '₹25,00,000',
      status: 'Active',
      startDate: '2026-03-01',
      endDate: '2026-10-31',
      beneficiaries: '5000+ families'
    },
    {
      id: 3,
      name: 'Healthcare Center Upgradation',
      description: 'Renovation and equipment upgrade for existing health centers',
      budget: '₹15,00,000',
      status: 'Active',
      startDate: '2026-02-01',
      endDate: '2026-08-31',
      beneficiaries: 'All residents'
    },
    {
      id: 4,
      name: 'School Infrastructure Development',
      description: 'New classroom construction and digital learning setup',
      budget: '₹30,00,000',
      status: 'Planning',
      startDate: '2026-07-01',
      endDate: '2027-06-30',
      beneficiaries: '1500+ students'
    },
    {
      id: 5,
      name: 'Solar Street Lighting Project',
      description: 'Installation of solar-powered streetlights across town',
      budget: '₹20,00,000',
      status: 'Active',
      startDate: '2026-04-15',
      endDate: '2026-11-30',
      beneficiaries: 'Main streets & lanes'
    },
    {
      id: 6,
      name: 'Agricultural Support Scheme',
      description: 'Subsidy and training for farmers on modern farming techniques',
      budget: '₹10,00,000',
      status: 'Active',
      startDate: '2026-05-01',
      endDate: '2026-12-31',
      beneficiaries: '500+ farmers'
    },
    {
      id: 7,
      name: 'Women Empowerment Program',
      description: 'Vocational training and skill development for women',
      budget: '₹8,00,000',
      status: 'Active',
      startDate: '2026-06-01',
      endDate: '2027-05-31',
      beneficiaries: '300+ women'
    },
    {
      id: 8,
      name: 'Youth Employment Scheme',
      description: 'Job placement and entrepreneurship support for youth',
      budget: '₹12,00,000',
      status: 'Planning',
      startDate: '2026-08-01',
      endDate: '2027-07-31',
      beneficiaries: '200+ youth'
    }
  ]

  const getStatusColor = (status) => {
    return status === 'Active' ? '#4a8f5e' : '#f59e0b'
  }

  return (
    <main>
      <div className="container">
        <h2 className="section-title">New Schemes & Development Projects</h2>
        <p className="section-subtitle">Stay informed about government schemes and town development initiatives</p>

        <div className="budget-summary">
          <div className="summary-card">
            <h4>Total Budget Allocated</h4>
            <p className="amount">₹1,70,00,000</p>
          </div>
          <div className="summary-card">
            <h4>Active Schemes</h4>
            <p className="amount">6</p>
          </div>
          <div className="summary-card">
            <h4>Beneficiaries</h4>
            <p className="amount">8000+</p>
          </div>
          <div className="summary-card">
            <h4>Planning Phase</h4>
            <p className="amount">2</p>
          </div>
        </div>

        <div className="schemes-grid">
          {schemes.map(scheme => (
            <div key={scheme.id} className="scheme-card">
              <div className="scheme-header">
                <h3>{scheme.name}</h3>
                <span className="status-badge" style={{ backgroundColor: getStatusColor(scheme.status) }}>
                  {scheme.status}
                </span>
              </div>

              <p className="description">{scheme.description}</p>

              <div className="scheme-details">
                <div className="detail-row">
                  <span className="label">Budget:</span>
                  <span className="value">{scheme.budget}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Duration:</span>
                  <span className="value">{scheme.startDate} to {scheme.endDate}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Beneficiaries:</span>
                  <span className="value">{scheme.beneficiaries}</span>
                </div>
              </div>

              <button className="btn btn-primary btn-small">Learn More</button>
            </div>
          ))}
        </div>

        <section className="scheme-info">
          <h3>About Our Schemes</h3>
          <div className="info-content">
            <p>
              <strong>Scheme Overview:</strong> Our town is committed to sustainable development and citizen welfare. These schemes are designed to improve infrastructure, healthcare, education, and livelihood opportunities.
            </p>
            <p>
              <strong>How to Apply:</strong> Visit the municipal office or check individual scheme pages for eligibility criteria and application procedures.
            </p>
            <p>
              <strong>Progress Tracking:</strong> Monitor scheme implementation progress on this portal. Updates are provided monthly.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
