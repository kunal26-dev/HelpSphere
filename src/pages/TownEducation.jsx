import '../styles/TownEducation.css'

export default function TownEducation() {
  const schools = [
    {
      id: 1,
      name: 'Government Senior Secondary School',
      principal: 'Rajesh Kumar',
      address: 'Shyampur',
      contact: '9876543210',
      seats: 80
    },
    {
      id: 2,
      name: 'DAV Public School',
      principal: 'Sunita Sharma',
      address: 'JagjeetPur Road',
      contact: '9876543211',
      seats: 55
    },
    {
      id: 3,
      name: 'Holy Angel School',
      principal: 'Amit Verma',
      address: 'Mithiberi Road',
      contact: '9876543212',
      seats: 40
    },
    {
      id: 4,
      name: 'Saraswati Vidya Mandir',
      principal: 'Neha Gupta',
      address: 'Haridwar',
      contact: '9876543213',
      seats: 100
    },
    {
      id: 5,
      name: 'Shri Ram Vidya Mandir',
      principal: 'Babita Srinivas',
      address: 'Shyampur',
      contact: '9876543214',
      seats: 70
    },
    {
      id: 6,
      name: 'Himalayan Modern School',
      principal: 'Sobha Negi',
      address: 'Gajiwali Road',
      contact: '9876543215',
      seats: 90
    },
    {
      id: 7,
      name: 'Kindergarten School',
      principal: 'Supriya Sharma',
      address: 'B.H.E.L',
      contact: '9876543216',
      seats: 110
    },
    {
      id: 8,
      name: '  Academy',
      principal: 'Priya Arora',
      address: 'Sector 8',
      contact: '9876543217',
      seats: 70
    },
    {
      id: 9,
      name: 'Sunrise Public School',
      principal: 'Deepak Yadav',
      address: 'Ring Road',
      contact: '9876543218',
      seats: 95
    },
    {
      id: 10,
      name: 'National Model School',
      principal: 'Kavita Sharma',
      address: 'Town Center',
      contact: '9876543219',
      seats: 130
    }
  ]

  return (
    <main>
      <div className="container">
        <h2 className="section-title">
          🎓 Town Education Services
        </h2>

        <p className="section-subtitle">
          Schools and educational facilities in the town
        </p>

        <section className="education-section">
          <h3>🏫 Schools ({schools.length})</h3>

          <div className="schools-grid">
            {schools.map((school) => (
              <div key={school.id} className="school-card">
                <h4>{school.name}</h4>

                <p>
                  <strong>Principal:</strong>{' '}
                  {school.principal}
                </p>

                <p>
                  <strong>📍 Address:</strong>{' '}
                  {school.address}
                </p>

                <p>
                  <strong>📞 Contact:</strong>{' '}
                  {school.contact}
                </p>

                <p>
                  <strong>Available Seats:</strong>{' '}
                  {school.seats}
                </p>

                <button className="btn btn-primary">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}