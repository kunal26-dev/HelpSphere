import { useEffect, useState } from 'react'
import '../styles/TownEducation.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

const fallbackSchools = [
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
    name: 'Academy',
    principal: 'Priya Arora',
    address: 'Sector 8',
    contact: '9876543217',
    seats: 70
  },
  {
    id: 9,
    name: 'Sunrise Public School',
    principal: 'Hrishikesh Sharma',
    address: 'Ring Road',
    contact: '9876543218',
    seats: 95
  },
  {
    id: 10,
    name: 'Delhi Public School',
    principal: 'Kavita Sharma',
    address: 'Subhash Nagar',
    contact: '9876543219',
    seats: 30
  }
]

export default function TownEducation() {
  const [schools, setSchools] = useState(fallbackSchools)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadSchools() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/schools`)

        if (!response.ok) {
          throw new Error('Unable to load schools')
        }

        const data = await response.json()

        if (isMounted) {
          setSchools(data)
          setLoadError('')
        }
      } catch (error) {
        if (isMounted) {
          setSchools(fallbackSchools)
          setLoadError('Showing saved school data because the API is not reachable.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadSchools()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <main>
      <div className="education-container">
        <h2 align="center" className="section-title">
          Town Education Services
        </h2>

        <p className="section-subtitle" align="center">
          Schools and educational facilities in the town
        </p>

        <section className="education-section">
          <h3>Schools ({schools.length})</h3>

          {isLoading && (
            <p className="education-status">
              Loading schools...
            </p>
          )}

          {!isLoading && loadError && (
            <p className="education-status">
              {loadError}
            </p>
          )}

          <div className="schools-grid">
            {schools.map((school) => (
              <div key={school.id} className="school-card">
                <h4>{school.name}</h4>

                <p>
                  <strong>Principal:</strong>{' '}
                  {school.principal}
                </p>

                <p>
                  <strong>Address:</strong>{' '}
                  {school.address}
                </p>

                <p>
                  <strong>Contact:</strong>{' '}
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
