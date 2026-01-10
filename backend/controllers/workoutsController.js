import asyncHandler from 'express-async-handler'
import { getUserWorkoutsDB, getWorkoutByIdDB, addNewWorkoutDB, updateWorkoutDB, deleteWorkoutDB } from '../config/workoutsDB.js'

//@desc GET /workouts
//Get all of the user's workouts
//@access private
const getUserWorkouts = asyncHandler( async(req, res) => {
  const workouts = await getUserWorkoutsDB(req.user.id)
  res.status(200).json(workouts)
})

//@desc GET /workouts/:id
//Get specific workout by ID
//@access private
const getWorkoutById = asyncHandler( async(req, res) => {
  const workout = await getWorkoutByIdDB(req.user.id, req.params.id)
  res.status(200).json(workout)
})

//@desc POST /workouts
//Add new workout
//@access private
const addWorkout = asyncHandler( async(req, res) => {
  const workout = {
    owner: req.user.id,
    workout_name: req.body.name
  }
  const newWorkout = await addNewWorkoutDB(workout)
  res.status(201).json(newWorkout)
} )

//@desc PUT /workouts/:id
//Update workout
//@access private
const updateWorkout = asyncHandler( async(req, res) => {
  const newWorkout = {
    workout_name: req.body.name
  }
  const updatedWorkout = await updateWorkoutDB(req.params.id, newWorkout)
  res.status(200).send(updatedWorkout)
} )

//@desc DELETE /workouts/:id
//Delete specific workout
//@access private
const deleteWorkout = asyncHandler( async(req, res) => {
  const deletedWorkout = await deleteWorkoutDB(req.params.id)
  res.status(200).json(deletedWorkout)
} )

export {getUserWorkouts, getWorkoutById, addWorkout, updateWorkout, deleteWorkout}