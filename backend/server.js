import http from 'node:http'
import { loginUser, signupUser } from './auth.js'
import { hospitals, schools } from './data.js'
import { getDatabaseStatus } from './db.js'
import {
  createComplaint,
  createMeeting,
  listComplaints,
  listMeetings,
  updateComplaintStatus,
  updateMeetingStatus
} from './records.js'

const PORT = process.env.PORT || 5050

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  })
  res.end(JSON.stringify(payload))
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = ''

    req.on('data', (chunk) => {
      body += chunk
    })

    req.on('end', () => {
      if (!body) {
        resolve({})
        return
      }

      try {
        resolve(JSON.parse(body))
      } catch (error) {
        reject(error)
      }
    })
  })
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`)

  if (req.method === 'OPTIONS') {
    sendJson(res, 204, {})
    return
  }

  if (req.method === 'GET' && url.pathname === '/api/health') {
    sendJson(res, 200, {
      status: 'ok',
      service: 'HelpSphere API',
      database: getDatabaseStatus()
    })
    return
  }

  if (req.method === 'POST' && url.pathname === '/api/login') {
    try {
      const payload = await readJson(req)
      const result = await loginUser(payload)

      if (!result.ok) {
        sendJson(res, result.status, {
          message: result.message
        })
        return
      }

      sendJson(res, 200, {
        user: result.user,
        source: result.source
      })
    } catch (error) {
      sendJson(res, 500, {
        message: 'Unable to process login.'
      })
    }
    return
  }

  if (req.method === 'POST' && url.pathname === '/api/signup') {
    try {
      const payload = await readJson(req)
      const result = await signupUser(payload)

      if (!result.ok) {
        sendJson(res, result.status, {
          message: result.message
        })
        return
      }

      sendJson(res, 201, {
        user: result.user,
        source: result.source
      })
    } catch (error) {
      sendJson(res, 500, {
        message: 'Unable to create account.'
      })
    }
    return
  }

  if (req.method === 'GET' && url.pathname === '/api/schools') {
    sendJson(res, 200, schools)
    return
  }

  if (req.method === 'GET' && url.pathname === '/api/hospitals') {
    sendJson(res, 200, hospitals)
    return
  }

  if (req.method === 'GET' && url.pathname === '/api/complaints') {
    const records = await listComplaints({
      role: url.searchParams.get('role'),
      userId: url.searchParams.get('userId')
    })

    sendJson(res, 200, records)
    return
  }

  if (req.method === 'POST' && url.pathname === '/api/complaints') {
    try {
      const payload = await readJson(req)
      const complaint = await createComplaint(payload)
      sendJson(res, 201, complaint)
    } catch (error) {
      sendJson(res, 400, {
        message: 'Unable to save complaint'
      })
    }
    return
  }

  const complaintStatusMatch = url.pathname.match(/^\/api\/complaints\/(\d+)\/status$/)

  if (req.method === 'PATCH' && complaintStatusMatch) {
    const payload = await readJson(req)
    const complaint = await updateComplaintStatus(complaintStatusMatch[1], payload.status)
    sendJson(res, 200, complaint)
    return
  }

  if (req.method === 'GET' && url.pathname === '/api/meetings') {
    const records = await listMeetings({
      role: url.searchParams.get('role'),
      userId: url.searchParams.get('userId')
    })

    sendJson(res, 200, records)
    return
  }

  if (req.method === 'POST' && url.pathname === '/api/meetings') {
    try {
      const payload = await readJson(req)
      const meeting = await createMeeting(payload)
      sendJson(res, 201, meeting)
    } catch (error) {
      sendJson(res, 400, {
        message: 'Unable to save meeting request'
      })
    }
    return
  }

  const meetingStatusMatch = url.pathname.match(/^\/api\/meetings\/(\d+)\/status$/)

  if (req.method === 'PATCH' && meetingStatusMatch) {
    const payload = await readJson(req)
    const meeting = await updateMeetingStatus(meetingStatusMatch[1], payload.status)
    sendJson(res, 200, meeting)
    return
  }

  sendJson(res, 404, {
    message: 'Route not found'
  })
})

server.listen(PORT, () => {
  console.log(`HelpSphere API running on http://localhost:${PORT}`)
})
