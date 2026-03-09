import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import { getUserProfileByIdDB } from '../config/usersDB.js';
import { getSecret } from '../utils/getSecret.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.DEPLOYMENT == 'docker'
        ? getSecret('jwt_secret')
        : process.env.JWT_SECRET
      )
      req.user = await getUserProfileByIdDB(decoded.userId)
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not authorised, invalid token')
    }
  } else {
    res.status(401)
    throw new Error('Not authorised, no token')
  }
})

export { protect }