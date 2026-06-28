import { getDatabaseStatus } from '../backend/db.js'

export default function handler(req, res) {
  res.status(200).json({
    status: 'ok',
    service: 'HelpSphere API',
    database: getDatabaseStatus()
  })
}
