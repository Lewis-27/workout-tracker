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

// export const dbTest = async () => {
//   console.log(process.env)
//   const res = await pool.query('SELECT * FROM users')
//   return res
// }