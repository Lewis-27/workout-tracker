import asyncHandler from "express-async-handler"

//@desc Authorise user and create login token
//route POST /api/users/auth
//@access public
const authUser = asyncHandler(async (req, res) => {
  res.status(200).send('User authorised')
})

//@desc Register user
//route POST /api/users
//@access public
const registerUser = asyncHandler(async (req, res) => {
  res.status(200).send('User registered')
})

//@desc Logout user
//route POST /api/users/logout
//@access public
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).send('User logged out')
})

//@desc Get user profile
//route GET /api/users/profile
//@access private
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).send('User profile')
})

//@desc Update user profile
//route PUT /api/users/profile
//@access private
const updateUserProfile = asyncHandler(async (req, res) => {
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