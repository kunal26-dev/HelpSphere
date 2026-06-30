import { getPool } from './db.js'

const registeredUsers = []

function toSafeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    department: user.department || null,
    designation: user.designation || null,
    phone: user.phone || null
  }
}

export async function loginUser({ email, password }) {
  if (!email || !password) {
    return {
      ok: false,
      status: 400,
      message: 'Email and password are required.'
    }
  }

  const pool = await getPool()

  if (pool) {
    try {
      const [rows] = await pool.execute(
        `SELECT id, name, email, role, department, designation, phone
         FROM users
         WHERE email = ? AND password = ? AND is_active = 1
         LIMIT 1`,
        [email, password]
      )

      if (rows.length > 0) {
        return {
          ok: true,
          status: 200,
          user: toSafeUser(rows[0]),
          source: 'mysql'
        }
      }
    } catch (error) {
      return loginRegisteredUser(email, password)
    }
  } else {
    return loginRegisteredUser(email, password)
  }

  return {
    ok: false,
    status: 401,
    message: 'Invalid email or password.'
  }
}

export async function signupUser(payload) {
  const name = payload.name?.trim()
  const email = payload.email?.trim().toLowerCase()
  const password = payload.password
  const phone = payload.phone?.trim() || null
  const address = payload.address?.trim() || null
  const role = payload.role === 'official' ? 'official' : 'member'
  const department = role === 'official'
    ? payload.department?.trim() || 'Gram Panchayat'
    : null
  const designation = role === 'official'
    ? payload.designation?.trim() || 'Government Official'
    : 'Town Member'

  if (!name || !email || !password || !phone || !address) {
    return {
      ok: false,
      status: 400,
      message: 'Name, email, password, phone, and address are required.'
    }
  }

  const user = {
    id: registeredUsers.length + 1,
    name,
    email,
    password,
    role,
    department,
    designation,
    phone,
    address,
    isActive: true
  }

  const pool = await getPool()

  if (pool) {
    try {
      const [existingRows] = await pool.execute(
        'SELECT id FROM users WHERE email = ? LIMIT 1',
        [email]
      )

      if (existingRows.length > 0) {
        return {
          ok: false,
          status: 409,
          message: 'An account with this email already exists.'
        }
      }

      const [result] = await pool.execute(
        `INSERT INTO users
         (name, email, password, role, department, designation, phone, address)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, email, password, role, department, designation, phone, address]
      )

      user.id = result.insertId
      return {
        ok: true,
        status: 201,
        user: toSafeUser(user),
        source: 'mysql'
      }
    } catch (error) {
      return signupRegisteredUser(user)
    }
  }

  return signupRegisteredUser(user)
}

function loginRegisteredUser(email, password) {
  const user = registeredUsers.find((item) => (
    item.email === email &&
    item.password === password &&
    item.isActive
  ))

  if (user) {
    return {
      ok: true,
      status: 200,
      user: toSafeUser(user),
      source: 'memory'
    }
  }

  return {
    ok: false,
    status: 401,
    message: 'Invalid email or password.'
  }
}

function signupRegisteredUser(user) {
  const existingUser = registeredUsers.find((item) => item.email === user.email)

  if (existingUser) {
    return {
      ok: false,
      status: 409,
      message: 'An account with this email already exists.'
    }
  }

  registeredUsers.push(user)

  return {
    ok: true,
    status: 201,
    user: toSafeUser(user),
    source: 'memory'
  }
}
