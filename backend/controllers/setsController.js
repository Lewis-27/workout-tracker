import asyncHandler from 'express-async-handler'
import { getSetsByWorkoutDB, getSetsByExerciseDB, getSetByIdDB, addSetDB, updateSetDB, deleteSetDB } from '../config/setsDB.js'

const getSetsByWorkout = asyncHandler( async (req, res) => {
  try {
    const sets = await getSetsByWorkoutDB(req.params.workoutId)
    if(sets){
      res.status(200).json(sets)
    } else {
      res.status(404)
      throw new Error('Could not find any sets')
    }
  } catch (error) {
    if(res.statusCode === 404){
      throw error
    } else {
      throw new Error('Error fetching sets')
    }
  }
} )

const getSetsByExercise = asyncHandler( async(req, res) => {
  try {
    const sets = await getSetsByExerciseDB(req.params.exerciseId)
    if(sets){
      res.status(200).json(sets)
    } else {
      res.status(404)
      throw new Error('Could not find any sets')
    }
  } catch (error) {
    if(res.statusCode === 404){
      throw error
    } else {
      throw new Error('Error fetching sets')
    }
  }
} )

const getSetById = asyncHandler( async(req, res) => {
  console.log(res)
  try {
    const set = await getSetByIdDB(req.params.id)
    if(set){
      res.status(200).json(set)
    } else {
      res.status(404)
      throw new Error('Could not find set')
    }
  } catch (error) {
    if(res.statusCode === 404){
      throw error
    } else {
      throw new Error('Error fetching set')
    }
  }
} )

const addSet = asyncHandler( async(req, res) => {
  const set = {
    exerciseId: req.body.exerciseId,
    weight: req.body.weight,
    reps: req.body.reps
  }
  try {
    const newSet = await addSetDB(set)
    if(newSet){
      res.status(200).json(newSet)
    } else {
      throw new Error
    }
  } catch (error) {
      throw new Error('Error adding set')
  }
} )

const updateSet = asyncHandler( async(req, res) => {
  const currentSet = await getSetByIdDB(req.params.id)
  console.log({currentSet})
    const newSet = {
    weight: req.body.weight || currentSet.weight,
    reps: req.body.reps || currentSet.reps
  }
  try {
    const updatedSet = await updateSetDB(req.params.id, newSet)
    if(updatedSet){
      res.status(200).json(updatedSet)
    } else {
      throw new Error
    }
  } catch (error) {
      throw new Error('Error adding set')
  }
} )

const deleteSet = asyncHandler( async(req, res) => {
  try {
    const deletedSet = await deleteSetDB(req.params.id)
    if(deleteSetDB){
      res.status(200).json(deletedSet)
    } else {
      res.status(404)
      throw new Error('Could not find set')
    }
  } catch (error) {
    if(res.statusCode === 404){
      throw error
    } else {
      throw error
      throw new Error('Error deleting set')
    }
  }
} )

export { getSetsByWorkout, getSetsByExercise, getSetById, addSet, updateSet, deleteSet }