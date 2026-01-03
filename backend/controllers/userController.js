//@desc Authorise user and create login token
//route POST /api/users/auth
//@access public
const authUser = (req, res) => {
  res.status(200).send('User authorised')
}

//@desc Register user
//route POST /api/users
//@access public
const registerUser = (req, res) => {
  res.status(200).send('User registered')
}

//@desc Logout user
//route POST /api/users/logout
//@access public
const logoutUser = (req, res) => {
  res.status(200).send('User logged out')
}

//@desc Get user profile
//route GET /api/users/profile
//@access private
const getUserProfile = (req, res) => {
  res.status(200).send('User profile')
}

//@desc Update user profile
//route PUT /api/users/profile
//@access private
const updateUserProfile = (req, res) => {
  res.status(200).send('User profile updated')
}

//@desc Delete user 
//route DELETE /api/users/profile
//@access private
const deleteUser = (req, res) => {
  res.status(200).send('User deleted')
}

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUser
}