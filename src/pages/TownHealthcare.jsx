import '../styles/TownHealthcare.css'

export default function TownHealthcare() {
  const hospitals = [
    {
      id: 1,
      name: 'City  Hospital',
      address: 'Ranipur More Road',
      contact: '9876543210',
      services: ['Emergency', 'OPD', 'Surgery']
    },
    {
      id: 2,
      name: 'Aryavrat Multispeciality Hospital',
      address: 'Laksar',
      contact: '9876543211',
      services: ['Emergency', 'ICU', 'Orthopedic']
    },
    {
      id: 3,
      name: 'Sanjeevani Hospital',
      address: 'laksar road',
      contact: '9876543212',
      services: ['General Medicine', 'OPD']
    },
    {
      id: 4,
      name: 'Goverment Mela Hospital',
      address: 'Bilkeshwar road',
      contact: '9876543213',
      services: ['Emergency', 'Pediatrics','OPD']
    },
    {
      id: 5,
      name: 'Prem Hospital Super Speciality',
      address: 'Haridwar',
      contact: '9876543214',
      services: ['ICU', 'Surgery']
    },
    {
      id: 6,
      name: 'MedStar Hospital',
      address: 'Sector 10',
      contact: '9876543215',
      services: ['Cardiology', 'Emergency']
    },
    {
      id: 7,
      name: 'Shri Swami Bhumanand Hospital',
      address: 'Jwalapur',
      contact: '9876543216',
      services: ['Neurology', 'Orthopedic']
    },
    {
      id: 8,
      name: 'Metro Hospital Haridwar',
      address: 'Plot F-1 Sidcul',
      contact: '9876543217',
      services: ['Emergency', 'General Medicine']
    },
    {
      id: 9,
      name: 'MatraChaya Hospital',
      address: 'Sector 8',
      contact: '9876543218',
      services: ['Surgery', 'ICU']
    },
    {
      id: 10,
      name: 'Maa Kali Ganga Hospital',
      address: 'Kangdi',
      contact: '9876543219',
      services: ['Emergency', 'Blood Bank']
    }
  ]

  const clinics = [
    {
      id: 1,
      name: 'Primary Health Clinic',
      area: 'Market Area',
      services: ['First Aid', 'Vaccination']
    },
    {
      id: 2,
      name: 'Community Clinic',
      area: 'Sector 2',
      services: ['OPD', 'Health Checkup']
    },
    {
      id: 3,
      name: 'Health Kiosk',
      area: 'School Area',
      services: ['Counselling', 'First Aid']
    },
    {
      id: 4,
      name: 'Family Care Clinic',
      area: 'Sector 7',
      services: ['General Medicine']
    },
    {
      id: 5,
      name: 'Wellness Clinic',
      area: 'Bus Stand Area',
      services: ['Consultation', 'Vaccination']
    }
  ]

  return (
    <main>
      <div className="container">
        <h2 className="section-title">
          🏥 Town Healthcare Services
        </h2>

        <p className="section-subtitle">
          Hospitals and Clinics available in your town
        </p>

        {/* Hospitals */}
        <section className="healthcare-section">
          <h3>🏥 Hospitals ({hospitals.length})</h3>

          <div className="hospitals-grid">
            {hospitals.map(hospital => (
              <div
                key={hospital.id}
                className="hospital-card"
              >
                <h4>{hospital.name}</h4>

                <p>
                  <strong>📍 Address:</strong>{' '}
                  {hospital.address}
                </p>

                <p>
                  <strong>📞 Contact:</strong>{' '}
                  {hospital.contact}
                </p>

                <div className="services-list">
                  <strong>Services:</strong>

                  <ul>
                    {hospital.services.map((service, index) => (
                      <li key={index}>✓ {service}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Clinics */}
        <section className="healthcare-section">
          <h3>⚕️ Clinics ({clinics.length})</h3>

          <div className="clinics-grid">
            {clinics.map(clinic => (
              <div
                key={clinic.id}
                className="clinic-card"
              >
                <h4>{clinic.name}</h4>

                <p>
                  <strong>Area:</strong> {clinic.area}
                </p>

                <div className="services">
                  <strong>Services:</strong>

                  <ul>
                    {clinic.services.map((service, index) => (
                      <li key={index}>• {service}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}