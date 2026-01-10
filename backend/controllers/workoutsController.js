import asyncHandler from 'express-async-handler'
import { getUserWorkoutsDB, getWorkoutByIdDB, addNewWorkoutDB, updateWorkoutDB, deleteWorkoutDB } from '../config/workoutsDB.js'

//@desc GET /workouts
//Get all of the user's workouts
//@access private
const getUserWorkouts = asyncHandler( async(req, res) => {
  try {
    const workouts = await getUserWorkoutsDB(req.user.id)
    res.status(200).json(workouts)
  } catch (error) {
    res.status(400)
    throw new Error('Error fetching workouts')
  }
  
})

//@desc GET /workouts/:id
//Get specific workout by ID
//@access private
const getWorkoutById = asyncHandler( async(req, res) => {
  try {
    const workout = await getWorkoutByIdDB(req.user.id, req.params.id)
    if(workout) {
      res.status(200).json(workout)
    } else {
      res.status(404)
      throw new Error('Could not find workout')
    }
  } catch (error) {
    if(res.statusCode === 404){
      console.log('err')
      throw error
    } else {
      res.status(400)
      throw new Error('Error fetching workout')
    }
  }
})

//@desc POST /workouts
//Add new workout
//@access private
const addWorkout = asyncHandler( async(req, res) => {
  const workout = {
    owner: req.user.id,
    workout_name: req.body.name
  }
  try {
    const newWorkout = await addNewWorkoutDB(workout)
    res.status(201).json(newWorkout)
  } catch (error) {
    throw new Error('Error adding workout')
  }
} )

//@desc PUT /workouts/:id
//Update workout
//@access private
const updateWorkout = asyncHandler( async(req, res) => {
  const newWorkout = {
    workout_name: req.body.name
  }
  try {
    const updatedWorkout = await updateWorkoutDB(req.params.id, newWorkout)
    if(updatedWorkout){
      res.status(200).send(updatedWorkout)    
    } else {
      res.status(404)
      throw new Error('Could not find workout to update')
    }
  } catch (error) {
      if(res.statusCode === 404){
        throw error
      } else {
        res.status(400)
        throw new Error('Error updating workout')
      }
  }

} )

//@desc DELETE /workouts/:id
//Delete specific workout
//@access private
const deleteWorkout = asyncHandler( async(req, res) => {
  try {
    const deletedWorkout = await deleteWorkoutDB(req.params.id)
    if(deletedWorkout){
      res.status(200).json(deletedWorkout)    
    } else {
      res.status(404)
      throw new Error('Could not find workout to delete')
    }
  } catch (error) {
    if(res.statusCode === 404) {
      throw error
    } else {
      res.status(400)
      throw new Error('Error deleting workout')
    }
  }

} )

export {getUserWorkouts, getWorkoutById, addWorkout, updateWorkout, deleteWorkout}