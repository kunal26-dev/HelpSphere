import { loginUser } from '../backend/auth.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).json({
      message: 'Method not allowed'
    })
    return
  }

  try {
    const result = await loginUser(req.body || {})

    if (!result.ok) {
      res.status(result.status).json({
        message: result.message
      })
      return
    }

    res.status(200).json({
      user: result.user,
      source: result.source
    })
  } catch (error) {
    res.status(500).json({
      message: 'Unable to process login.'
    })
  }
}
