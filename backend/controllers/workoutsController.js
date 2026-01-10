import asyncHandler from 'express-async-handler'

//@desc GET /workouts
//Get all of the user's workouts
//@access private
const getUserWorkouts = asyncHandler( async(req, res) => {
  res.status(200).send("users's workouts")
})

//@desc GET /workouts/:id
//Get specific workout by ID
//@access private
const getWorkoutById = asyncHandler( async(req, res) => {
  console.log(req.params.id)
  res.status(200).send(`Getting workout ${req.params.id}`)
})

//@desc POST /workouts
//Add new workout
//@access private
const addWorkout = asyncHandler( async(req, res) => {
  res.status(200).send('Workout added')
} )

//@desc PUT /workouts/:id
//Update workout
//@access private
const updateWorkout = asyncHandler( async(req, res) => {
  res.status(200).send('Workout updated')
} )

//@desc DELETE /workouts/:id
//Delete specific workout
//@access private
const deleteWorkout = asyncHandler( async(req, res) => {
  res.status(200).send('Workout deleted')
} )

export {getUserWorkouts, getWorkoutById, addWorkout, updateWorkout, deleteWorkout}