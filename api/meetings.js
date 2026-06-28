import {
  createMeeting,
  listMeetings
} from '../backend/records.js'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const meetings = await listMeetings({
      role: req.query?.role,
      userId: req.query?.userId
    })

    res.status(200).json(meetings)
    return
  }

  if (req.method === 'POST') {
    const meeting = await createMeeting(req.body || {})
    res.status(201).json(meeting)
    return
  }

  res.setHeader('Allow', 'GET, POST')
  res.status(405).json({
    message: 'Method not allowed'
  })
}
