import pg from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config()

const { Pool, Client } = pg;

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE
})

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

const comparePasswords = async (passwordDB, passwordEntered) => {
  return await bcrypt.compare(passwordDB, passwordEntered)
}

const getUserByEmailDB = async (email) => {
  const res = await pool.query('SELECT * FROM users WHERE email=$1', [email])
  return res.rows[0]
}

const getUserByIdDB = async (id) => {
  const res = await pool.query('SELECT * FROM users WHERE id=$1', [id])
  return res.rows[0]
}

const registerUserDB = async (user) => {
  const hashedUser = {
    ...user,
    password : await hashPassword(user.password)
  }
  const res = await pool.query('INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *', [user.name, user.email, hashedUser.password])
  return res.rows[0]
}

const authUserDB = async (email, password) => {
  try {
    const user = await getUserByEmailDB(email)
    console.log({user})
    const passwordDB = user.password
    if(await bcrypt.compare(password, passwordDB)){
      return true
    } else {
      return false
    }
    
  } catch (error) {
    
  }
  
}



export { registerUserDB, authUserDB, getUserByEmailDB, getUserByIdDB }