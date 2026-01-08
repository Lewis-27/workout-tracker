import asyncHandler from "express-async-handler"

import { registerUserDB, authUserDB, getUserByEmailDB, getUserByIdDB, updateUserProfileDB } from "../config/db.js"

import generateToken from "../utils/generateToken.js";

//@desc Authorise user and create login token
//route POST /api/users/auth
//@access public
const authUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const response = await authUserDB(email, password)

  if(response){
    generateToken(res, response.id)
    res.status(200).send(response);
  } else {
    res.status(400).send('Not authorised')
  }

  res.status(200).send(response)
  // const user = await getUserByEmailDB(email);
  // console.log(user)
  // if(user && (user.password === password)) {
  //   res.status(200).send('User authorised')
  // } else {
  //   res.status(400).send('Invalid details')
  // }
})

//@desc Register user
//route POST /api/users
//@access public
const registerUser = asyncHandler(async (req, res) => {
  try {
    const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
    };
    const newUser = await registerUserDB(user);
    res.status(201).send(newUser);
  } catch (error) {
    throw error
  }
  
})

//@desc Logout user
//route POST /api/users/logout
//@access public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: 'true',
    expires: new Date(0)
  })
  res.status(200).send('User logged out')
})

//@desc Get user profile
//route GET /api/users/profile
//@access private
const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = req.user
    if(user){
      res.status(200).json(user)
    } else {
      throw new Error('Not authorised')
    }
  } catch (error) {
    res.status(400)
    throw new Error('Error fetching user data')
  }
  res.status(200).send('User profile')
})

//@desc Update user profile
//route PUT /api/users/profile
//@access private
const updateUserProfile = asyncHandler(async (req, res) => {
  const updatedDetails = req.body
  console.log({userId: req.user.id})
  const response = await updateUserProfileDB(req.user.id, updatedDetails)
  res.status(200).send('User profile updated')
})

//@desc Delete user 
//route DELETE /api/users/profile
//@access private
const deleteUser = asyncHandler(async (req, res) => {
  res.status(200).send('User deleted')
})

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUser
}