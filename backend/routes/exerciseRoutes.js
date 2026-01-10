import express from 'express'
import { getUserExercises,getExercisesByWorkout, getExerciseById, addExercise, updateExercise, deleteExercise } from '../controllers/exercisesController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', protect, getUserExercises)
router.get('/workout/:workoutId', protect, getExercisesByWorkout)
router.get('/:id', protect, getExerciseById)
router.post('/workout/:workoutId', protect, addExercise)
router.put('/:id', protect, updateExercise)
router.delete('/:id', protect, deleteExercise)

export default router