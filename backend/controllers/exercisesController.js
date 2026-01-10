import asyncHandler from 'express-async-handler'

//@desc GET /exercises/workout/:workoutId
//Get all of the exercises in a workout
//@access private

const getUserExercises = asyncHandler( async(req, res) => {
  res.status(200).send(`All exercises belonging to user: ${req.user.id}`)
} )

const getExercisesByWorkout = asyncHandler( async(req, res) => {
  res.status(200).send(`Exercises in workout ${req.params.workoutId}`)
} )

const getExerciseById = asyncHandler( async(req, res) => {
  res.status(200).send(`Exercise ${req.params.id}`)
} )

const addExercise = asyncHandler( async(req, res) => {
  const exercise = {
    exerciseName: req.body.exerciseName,
    muscleGroup: req.body.muscleGroup
  }
  res.status(200).json({
    message: `Adding exercise to workout ${req.params.workoutId}`,
    exercise
  })
} )

const updateExercise = asyncHandler( async(req, res) => {
  const newExercise = {
    exerciseName: req.body.exerciseName,
    muscleGroup: req.body.muscleGroup    
  }
  res.status(200).json({
    message: `Updating exercise ${req.params.id} to`,
    newExercise
  })
} )

const deleteExercise = asyncHandler( async(req,res) => {
  res.status(200).send(`Deleting exercise ${req.params.id}`)
} )

export { getUserExercises, getExercisesByWorkout, getExerciseById, addExercise, updateExercise, deleteExercise }