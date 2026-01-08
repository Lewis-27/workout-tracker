import express from "express";
import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, deleteUser } from '../controllers/userController.js'
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post('/auth', authUser)
router.post('/', registerUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile).put(updateUserProfile).delete(deleteUser)

export default router;