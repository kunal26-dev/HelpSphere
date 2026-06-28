import { complaints, meetings } from './data.js'
import { getPool } from './db.js'

function normalizeComplaint(row) {
  return {
    id: row.id,
    userId: row.user_id ?? row.userId ?? null,
    submitterName: row.submitter_name ?? row.submitterName ?? 'Resident',
    type: row.type,
    location: row.location,
    description: row.description,
    status: row.status,
    date: row.created_at
      ? new Date(row.created_at).toISOString().split('T')[0]
      : row.date,
    escalated: row.status === 'escalated'
  }
}

function normalizeMeeting(row) {
  return {
    id: row.id,
    userId: row.user_id ?? row.userId ?? null,
    submitterName: row.submitter_name ?? row.submitterName ?? 'Resident',
    title: row.title,
    date: row.meeting_date ?? row.date,
    time: row.meeting_time ?? row.time,
    location: row.location,
    description: row.description,
    status: row.status
  }
}

function canSeeItem(item, role, userId) {
  return role === 'official' || String(item.userId) === String(userId)
}

export async function listComplaints({ role, userId }) {
  const pool = await getPool()

  if (pool) {
    try {
      const [rows] = role === 'official'
        ? await pool.execute(
          `SELECT complaints.*, users.name AS submitter_name
           FROM complaints
           LEFT JOIN users ON users.id = complaints.user_id
           ORDER BY complaints.created_at DESC`
        )
        : await pool.execute(
          `SELECT complaints.*, users.name AS submitter_name
           FROM complaints
           LEFT JOIN users ON users.id = complaints.user_id
           WHERE complaints.user_id = ?
           ORDER BY complaints.created_at DESC`,
          [userId]
        )

      return rows.map(normalizeComplaint)
    } catch (error) {
      return complaints.filter((item) => canSeeItem(item, role, userId))
    }
  }

  return complaints.filter((item) => canSeeItem(item, role, userId))
}

export async function createComplaint(payload) {
  const complaint = {
    id: complaints.length + 1,
    userId: payload.userId,
    submitterName: payload.submitterName || 'Resident',
    type: payload.type,
    location: payload.location,
    description: payload.description,
    status: 'pending',
    date: new Date().toISOString().split('T')[0],
    escalated: false
  }

  const pool = await getPool()

  if (pool) {
    try {
      const [result] = await pool.execute(
        `INSERT INTO complaints (user_id, type, location, description, status)
         VALUES (?, ?, ?, ?, 'pending')`,
        [payload.userId, payload.type, payload.location, payload.description]
      )

      complaint.id = result.insertId
    } catch (error) {
      complaints.unshift(complaint)
      return complaint
    }
  } else {
    complaints.unshift(complaint)
  }

  return complaint
}

export async function updateComplaintStatus(id, status) {
  const pool = await getPool()

  if (pool) {
    try {
      await pool.execute(
        'UPDATE complaints SET status = ? WHERE id = ?',
        [status, id]
      )
    } catch (error) {
      updateMemoryStatus(complaints, id, status)
    }
  } else {
    updateMemoryStatus(complaints, id, status)
  }

  return {
    id: Number(id),
    status
  }
}

export async function listMeetings({ role, userId }) {
  const pool = await getPool()

  if (pool) {
    try {
      const [rows] = role === 'official'
        ? await pool.execute(
          `SELECT meetings.*, users.name AS submitter_name
           FROM meetings
           LEFT JOIN users ON users.id = meetings.user_id
           ORDER BY meetings.created_at DESC`
        )
        : await pool.execute(
          `SELECT meetings.*, users.name AS submitter_name
           FROM meetings
           LEFT JOIN users ON users.id = meetings.user_id
           WHERE meetings.user_id = ?
           ORDER BY meetings.created_at DESC`,
          [userId]
        )

      return rows.map(normalizeMeeting)
    } catch (error) {
      return meetings.filter((item) => canSeeItem(item, role, userId))
    }
  }

  return meetings.filter((item) => canSeeItem(item, role, userId))
}

export async function createMeeting(payload) {
  const meeting = {
    id: meetings.length + 1,
    userId: payload.userId,
    submitterName: payload.submitterName || 'Resident',
    title: payload.title,
    date: payload.date,
    time: payload.time,
    location: payload.location,
    description: payload.description,
    status: 'requested'
  }

  const pool = await getPool()

  if (pool) {
    try {
      const [result] = await pool.execute(
        `INSERT INTO meetings
         (user_id, title, meeting_date, meeting_time, location, description, status)
         VALUES (?, ?, ?, ?, ?, ?, 'requested')`,
        [
          payload.userId,
          payload.title,
          payload.date,
          payload.time,
          payload.location,
          payload.description
        ]
      )

      meeting.id = result.insertId
    } catch (error) {
      meetings.unshift(meeting)
      return meeting
    }
  } else {
    meetings.unshift(meeting)
  }

  return meeting
}

export async function updateMeetingStatus(id, status) {
  const pool = await getPool()

  if (pool) {
    try {
      await pool.execute(
        'UPDATE meetings SET status = ? WHERE id = ?',
        [status, id]
      )
    } catch (error) {
      updateMemoryStatus(meetings, id, status)
    }
  } else {
    updateMemoryStatus(meetings, id, status)
  }

  return {
    id: Number(id),
    status
  }
}

function updateMemoryStatus(items, id, status) {
  const item = items.find((entry) => String(entry.id) === String(id))

  if (item) {
    item.status = status
    item.escalated = status === 'escalated'
  }
}
