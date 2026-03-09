import jwt from 'jsonwebtoken';
import { getSecret } from './getSecret.js';
import dotenv from 'dotenv'

dotenv.config()

const generateToken = (res, userId) => {
  const secret = process.env.DEPLOYMENT == 'docker'
    ? getSecret('jwt_secret')
    : process.env.JWT_SECRET
  const token = jwt.sign({ userId }, secret, {
    expiresIn: '30d'
  })

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000
  })
}

export default generateToken;