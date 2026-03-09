import pg from 'pg'
import { getSecret } from '../utils/getSecret.js';
import dotenv from 'dotenv'

dotenv.config()

const {Pool, Client} = pg
console.log('pool test')

const connectionString = process.env.DEPLOYMENT === 'docker'
  ? getSecret('db_secret')
  : process.env.DB_CONNECTION_URI

console.log(connectionString)

const pool = new Pool({
  connectionString
})

export {pool}