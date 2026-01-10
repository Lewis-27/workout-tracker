import express from 'express'
import { getUserWorkouts, getWorkoutById, addWorkout, updateWorkout, deleteWorkout } from '../controllers/workoutsController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', protect, getUserWorkouts)
router.get('/:id', protect, getWorkoutById)
router.post('/', protect, addWorkout)
router.put('/:id', protect, updateWorkout)
router.delete('/:id', protect, deleteWorkout)

export default router;