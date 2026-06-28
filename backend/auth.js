import { seedUsers } from './data.js'
import { getPool } from './db.js'

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

export async function loginUser({ email, password, role }) {
  if (!email || !password || !role) {
    return {
      ok: false,
      status: 400,
      message: 'Email, password, and role are required.'
    }
  }

  const pool = await getPool()

  if (pool) {
    try {
      const [rows] = await pool.execute(
        `SELECT id, name, email, role, department, designation, phone
         FROM users
         WHERE email = ? AND password = ? AND role = ? AND is_active = 1
         LIMIT 1`,
        [email, password, role]
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
      return loginSeedUser(email, password, role)
    }
  } else {
    return loginSeedUser(email, password, role)
  }

  return {
    ok: false,
    status: 401,
    message: 'Invalid credentials for the selected role.'
  }
}

function loginSeedUser(email, password, role) {
  const user = seedUsers.find((item) => (
    item.email === email &&
    item.password === password &&
    item.role === role &&
    item.isActive
  ))

  if (user) {
    return {
      ok: true,
      status: 200,
      user: toSafeUser(user),
      source: 'seed'
    }
  }

  return {
    ok: false,
    status: 401,
    message: 'Invalid credentials for the selected role.'
  }
}
