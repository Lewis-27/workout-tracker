import asyncHandler from 'express-async-handler'
import { getExercisesByUserDB, getExercisesByWorkoutDB, getExerciseByIdDB, addExerciseDB, updateExerciseDB, deleteExerciseDB } from '../config/exercisesDB.js'

//@desc GET /exercises/workout/:workoutId
//Get all of the exercises in a workout
//@access private

const getUserExercises = asyncHandler( async(req, res) => {
  try {
    const exercises = await getExercisesByUserDB(req.user.id)
    if(exercises){
      res.status(200).json(exercises)
    } else {
      res.status(404)
      throw new Error('Could not find any exercises')
    }
  } catch (error) {
    if(res.statusCode === 404){
      throw error
    } else {
      throw new Error('Error fetching exercises')
    }
  }
} )

const getExercisesByWorkout = asyncHandler( async(req, res) => {
  try {
    const exercises = await getExercisesByWorkoutDB(req.user.id, req.params.workoutId)
    if(exercises){
      res.status(200).json(exercises)
    } else {
      res.status(404)
      throw new Error('Could not find any exercises')
    }
  } catch (error) {
    if(res.statusCode === 404){
      throw error
    } else {
      throw new Error('Error fetching exercises')
    }
  }
} )

const getExerciseById = asyncHandler( async(req, res) => {
  try {
    const exercise = await getExerciseByIdDB(req.user.id, req.params.id)
    if(exercise){
      res.status(200).json(exercise)
    } else {
      res.status(404)
      throw new Error('Could not find exercise')
    }
  } catch (error) {
    if(res.statusCode === 404){
      throw error
    } else {
      throw new Error('Error fetching exercise')
    }
  }
} )

const addExercise = asyncHandler( async(req, res) => {
  const exercise = {
    exerciseName: req.body.exerciseName,
    muscleGroup: req.body.muscleGroup
  }
  try {
    const newExercise = await addExerciseDB(req.params.workoutId, exercise)
    if(exercise){
      res.status(200).json(exercise)
    } else {
      throw new Error
    }
  } catch (error) {
      throw new Error('Error adding exercise')
  }
} )

const updateExercise = asyncHandler( async(req, res) => {
  const newExercise = {
    exerciseName: req.body.exerciseName,
    muscleGroup: req.body.muscleGroup    
  }
  try {
    const updatedExercise = await updateExerciseDB(req.user.id, req.params.id, newExercise)
    if(updatedExercise){
      res.status(200).json(updatedExercise)
    } else {
      throw new Error
    }
  } catch (error) {
    res.status(400)
    throw new Error('Error updating exercise')
  }
} )

const deleteExercise = asyncHandler( async(req,res) => {
  try {
    const deletedExercise = await deleteExerciseDB(req.user.id, req.params.id)
    if(deletedExercise){
      res.status(200).json(deletedExercise)
    } else {
      throw new Error
    }
  } catch (error) {
      throw new Error('Error deleting exercise')
  }
} )

export { getUserExercises, getExercisesByWorkout, getExerciseById, addExercise, updateExercise, deleteExercise }