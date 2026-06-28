import { updateMeetingStatus } from '../../../backend/records.js'

export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    res.setHeader('Allow', 'PATCH')
    res.status(405).json({
      message: 'Method not allowed'
    })
    return
  }

  const meeting = await updateMeetingStatus(req.query.id, req.body?.status)
  res.status(200).json(meeting)
}
