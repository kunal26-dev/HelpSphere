import {
  createComplaint,
  listComplaints
} from '../backend/records.js'

export default function handler(req, res) {
  if (req.method === 'GET') {
    const complaints = await listComplaints({
      role: req.query?.role,
      userId: req.query?.userId
    })

    res.status(200).json(complaints)
    return
  }

  if (req.method === 'POST') {
    const complaint = await createComplaint(req.body || {})
    res.status(201).json(complaint)
    return
  }

  res.setHeader('Allow', 'GET, POST')
  res.status(405).json({
    message: 'Method not allowed'
  })
}
