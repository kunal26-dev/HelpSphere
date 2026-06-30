export const schools = [
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

export const hospitals = [
  {
    id: 1,
    name: 'City Hospital',
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
    address: 'Laksar Road',
    contact: '9876543212',
    services: ['General Medicine', 'OPD']
  }
]

export const complaints = [
  {
    id: 1,
    userId: 2,
    submitterName: 'Asha Devi',
    type: 'Road Damage',
    location: 'Main Street',
    description: 'Large pothole causing traffic issues',
    status: 'resolved',
    date: '2026-06-20',
    escalated: false
  },
  {
    id: 2,
    userId: 2,
    submitterName: 'Asha Devi',
    type: 'Broken Streetlight',
    location: 'Park Road',
    description: 'Streetlight not working for 2 weeks',
    status: 'pending',
    date: '2026-06-18',
    escalated: false
  }
]

export const meetings = [
  {
    id: 1,
    userId: 2,
    submitterName: 'Asha Devi',
    title: 'Road Development Discussion',
    date: '2026-06-25',
    time: '10:00',
    location: 'Community Hall',
    description: 'Discussion on upcoming road construction and maintenance',
    status: 'requested'
  },
  {
    id: 2,
    userId: 2,
    submitterName: 'Asha Devi',
    title: 'Healthcare Services Review',
    date: '2026-06-20',
    time: '14:00',
    location: 'Municipal Office',
    description: 'Review of healthcare facilities and new clinic setup',
    status: 'approved'
  }
]
