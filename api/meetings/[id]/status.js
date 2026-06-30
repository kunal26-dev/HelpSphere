import { updateMeetingStatus } from '../../../backend/records.js'

export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    res.setHeader('Allow', 'PATCH')
    res.status(405).json({
      message: 'Method not allowed'
    })
    return
  }

  try {
    const meeting = await updateMeetingStatus(req.query.id, req.body?.status)
    res.status(200).json(meeting)
  } catch (error) {
    res.status(400).json({
      message: 'Unable to update meeting status'
    })
  }
}
