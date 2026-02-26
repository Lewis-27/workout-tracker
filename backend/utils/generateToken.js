import jwt from 'jsonwebtoken';
import { getSecret } from './getSecret.js';

const generateToken = (res, userId) => {
  const secret = process.env.DEPLOYMENT == 'railway'
    ? process.env.JWT_SECRET
    : getSecret('jwt_secret')
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