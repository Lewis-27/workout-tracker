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

const getUserByEmailDB = async (email) => {
  const res = await pool.query('SELECT * FROM users WHERE email=$1', [email])
  return res.rows[0]
}

const getUserProfileByIdDB = async (id) => {
  const res = await pool.query('SELECT id, name, email FROM users WHERE id=$1', [id])
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
      return {
        id: user.id,
        email: user.email,
        name: user.name
      }
    } else {
      return false
    }
  } catch (error) {
    throw new Error('Failed to authorise user')
  }
}

const updateUserProfileDB = async (userId, newDetails) => {
  const currentDetails = await getUserByIdDB(userId);
  const updatedDetails = {
    name: newDetails.name || currentDetails.name,
    email: newDetails.email || currentDetails.email,
    password: newDetails.password ? await(hashPassword(newDetails.password)) : currentDetails.password
  }
  try {
    await pool.query('BEGIN');
    const queryText = 'UPDATE users SET name=$2, email=$3, password=$4 WHERE id=$1 RETURNING *'
    const queryValues = [userId, updatedDetails.name, updatedDetails.email, updatedDetails.password]
    const updatedUser = await pool.query(queryText, queryValues)
    await pool.query('COMMIT')
    return updatedUser.rows[0]
  } catch (error) {
    await pool.query('ROLLBACK')
    throw new Error('Error updating profile')
  }
}

const deleteUserDB = async (userId) => {
  try {
    const deletedUser = await pool.query('DELETE FROM users WHERE id=$1 RETURNING *', [userId])
    return deletedUser.rows[0]  
  } catch (error) {
    throw new Error('Error deleting user')
  }
  
}



export { registerUserDB, authUserDB, getUserByEmailDB, getUserByIdDB, getUserProfileByIdDB, updateUserProfileDB, deleteUserDB }