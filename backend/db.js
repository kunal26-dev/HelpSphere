let pool
let mysqlLoadError

export async function getPool() {
  if (pool) {
    return pool
  }

  try {
    const mysql = await import('mysql2/promise')

    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'helpsphere',
      waitForConnections: true,
      connectionLimit: 10
    })

    return pool
  } catch (error) {
    mysqlLoadError = error
    return null
  }
}

export function getDatabaseStatus() {
  if (pool) {
    return 'connected'
  }

  if (mysqlLoadError) {
    return 'mysql2_not_available'
  }

  return 'not_initialized'
}
