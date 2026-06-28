import { schools } from '../backend/data.js'

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    res.status(405).json({
      message: 'Method not allowed'
    })
    return
  }

  res.status(200).json(schools)
}
