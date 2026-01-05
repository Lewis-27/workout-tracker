import pg from 'pg';
import dotenv from 'dotenv'

dotenv.config()

const { Pool, Client } = pg;

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE
})

const registerUserDB = async (user) => {
  const res = await pool.query('INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *', [user.name, user.email, user.password])
  return res.rows[0]
}

const getUserByEmailDB = async (email) => {
  const res = await pool.query('SELECT * FROM users WHERE email=$1', [email])
  return res.rows[0]
}

const getUserByIdDB = async (id) => {
  const res = await pool.query('SELECT * FROM users WHERE id=$1', [id])
  return res.rows[0]
}

export { registerUserDB, getUserByEmailDB, getUserByIdDB }