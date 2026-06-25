import '../styles/TownHealthcare.css'

export default function TownHealthcare() {
  const hospitals = [
    {
      id: 1,
      name: 'Government Medical Center',
      type: 'Government Hospital',
      rating: 4.5,
      services: ['Emergency', 'ICU', 'General Ward', 'OPD'],
      beds: 150,
      ambulances: 5,
      contact: '0571-2345678',
      address: 'Medical Road, Town Center'
    },
    {
      id: 2,
      name: 'Shiv Prasad Hospital',
      type: 'Private Hospital',
      rating: 4.2,
      services: ['Emergency', 'Surgery', 'Cardiology', 'Orthopedics'],
      beds: 100,
      ambulances: 4,
      contact: '0571-9876543',
      address: 'Market Square'
    },
    {
      id: 3,
      name: 'Apollo Health Clinic',
      type: 'Multi-specialty',
      rating: 4.7,
      services: ['General Check-up', 'Diagnostics', 'Vaccination'],
      beds: 50,
      ambulances: 2,
      contact: '0571-5555555',
      address: 'Near Railway Station'
    }
  ]

  const clinics = [
    { id: 1, name: 'Primary Health Center - Zone A', area: 'Market Area', distance: '100m', services: ['Basic Healthcare', 'Vaccination', 'First Aid'] },
    { id: 2, name: 'Community Clinic - Zone B', area: 'Residential Area', distance: '100m', services: ['OPD', 'Blood Tests', 'Health Check-up'] },
    { id: 3, name: 'Health Kiosk - Zone C', area: 'Educational Area', distance: '100m', services: ['First Aid', 'Counseling'] },
    { id: 4, name: 'Primary Health Center - Zone D', area: 'Industrial Area', distance: '100m', services: ['Basic Healthcare', 'Emergency Care'] },
    { id: 5, name: 'Community Health Center - Zone E', area: 'Agricultural Area', distance: '100m', services: ['Health Check-up', 'Vaccination'] },
    { id: 6, name: 'Health Clinic - Zone F', area: 'Market Area', distance: '100m', services: ['OPD', 'Consultation'] }
  ]

  const ambulanceServices = [
    { id: 1, service: '108 Emergency Ambulance', number: '108', type: 'Government', vehicles: 8, status: '24/7' },
    { id: 2, service: 'Quick Ambulance Services', number: '0571-2468135', type: 'Private', vehicles: 5, status: '24/7' },
    { id: 3, service: 'Red Cross Ambulance', number: '0571-1357924', type: 'NGO', vehicles: 3, status: '24/7' }
  ]

  return (
    <main>
      <div className="container">
        <h2 className="section-title">Town Healthcare Services</h2>
        <p className="section-subtitle">Find hospitals, clinics, and ambulance services in your town</p>

        <section className="healthcare-section">
          <h3>🏥 Hospitals & Medical Centers</h3>
          <div className="hospitals-grid">
            {hospitals.map(hospital => (
              <div key={hospital.id} className="hospital-card">
                <div className="hospital-header">
                  <h4>{hospital.name}</h4>
                  <div className="rating">
                    <span className="stars">★</span> {hospital.rating}
                  </div>
                </div>

                <p className="hospital-type">{hospital.type}</p>

                <div className="hospital-details">
                  <p><strong>📍 Address:</strong> {hospital.address}</p>
                  <p><strong>📞 Contact:</strong> {hospital.contact}</p>
                  <p><strong>🛏️ Total Beds:</strong> {hospital.beds}</p>
                  <p><strong>🚑 Ambulances:</strong> {hospital.ambulances}</p>
                </div>

                <div className="services-list">
                  <strong>Services:</strong>
                  <ul>
                    {hospital.services.map((service, idx) => (
                      <li key={idx}>✓ {service}</li>
                    ))}
                  </ul>
                </div>

                <button className="btn btn-primary btn-small">Contact Hospital</button>
              </div>
            ))}
          </div>
        </section>

        <section className="healthcare-section">
          <h3>⚕️ Community Clinics (Every 100 Meters)</h3>
          <p className="section-subtitle">Primary healthcare centers for basic medical services</p>
          <div className="clinics-grid">
            {clinics.map(clinic => (
              <div key={clinic.id} className="clinic-card">
                <h4>{clinic.name}</h4>
                <p><strong>Area:</strong> {clinic.area}</p>
                <p><strong>Distance:</strong> {clinic.distance}</p>
                <div className="services">
                  <strong>Services:</strong>
                  <ul>
                    {clinic.services.map((service, idx) => (
                      <li key={idx}>• {service}</li>
                    ))}
                  </ul>
                </div>
                <button className="btn btn-secondary btn-small">Get Directions</button>
              </div>
            ))}
          </div>
        </section>

        <section className="healthcare-section">
          <h3>🚑 Ambulance Services</h3>
          <div className="ambulance-table">
            <table>
              <thead>
                <tr>
                  <th>Service Name</th>
                  <th>Contact Number</th>
                  <th>Type</th>
                  <th>Vehicles Available</th>
                  <th>Availability</th>
                </tr>
              </thead>
              <tbody>
                {ambulanceServices.map(service => (
                  <tr key={service.id}>
                    <td><strong>{service.service}</strong></td>
                    <td className="phone">{service.number}</td>
                    <td>{service.type}</td>
                    <td>{service.vehicles}</td>
                    <td><span className="status-active">{service.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="healthcare-section">
          <h3>Government Healthcare Benefits</h3>
          <div className="benefits-grid">
            <div className="benefit-card">
              <h4>Free Basic Checkups</h4>
              <p>Regular health check-ups available at government health centers for all residents</p>
            </div>
            <div className="benefit-card">
              <h4>Vaccination Programs</h4>
              <p>Free vaccination drives conducted regularly for children and adults</p>
            </div>
            <div className="benefit-card">
              <h4>Emergency Care</h4>
              <p>24/7 emergency medical services with government ambulance support</p>
            </div>
            <div className="benefit-card">
              <h4>Mother & Child Health</h4>
              <p>Specialized care programs for pregnant women and newborns</p>
            </div>
          </div>
        </section>

        <section className="health-tips">
          <h3>Health Tips</h3>
          <ul>
            <li>Register with your nearest government clinic for better health management</li>
            <li>Call 108 for any emergency medical situation</li>
            <li>Avail of free vaccination camps in your area</li>
            <li>Maintain regular health check-ups for early disease detection</li>
          </ul>
        </section>
      </div>
    </main>
  )
}
