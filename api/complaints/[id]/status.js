import { updateComplaintStatus } from '../../../backend/records.js'

export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    res.setHeader('Allow', 'PATCH')
    res.status(405).json({
      message: 'Method not allowed'
    })
    return
  }

  const complaint = await updateComplaintStatus(req.query.id, req.body?.status)
  res.status(200).json(complaint)
}
