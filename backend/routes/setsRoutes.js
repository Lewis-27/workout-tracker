import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { getSetsByWorkout, getSetsByExercise, getSetById, addSet, updateSet, deleteSet } from '../controllers/setsController.js'

const router = express.Router()

router.get('/workout/:workoutId', protect, getSetsByWorkout)
router.get('/exercise/:exerciseId', protect, getSetsByExercise)
router.get('/:id', protect, getSetById)
router.post('/', protect, addSet)
router.put('/:id', protect, updateSet)
router.delete('/:id', protect, deleteSet)

export default router