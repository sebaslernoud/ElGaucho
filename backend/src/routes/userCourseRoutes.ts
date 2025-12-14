import { Router } from 'express';
import { authenticateToken, authorizeRoles } from '../middlewares/authMiddleware';
import {
 createUserCourse,
 getUserCoursesByUserId,
 getUserCoursesByStatus,
} from '../controllers/userCourseController'; // Import the new controller functions

const router = Router();

// POST /api/user-courses - Create a new UserCourse entry (e.g., user registers for a course)
// Requires authentication. You might want to add role authorization here too,
// depending on who is allowed to create these entries (e.g., only the user themselves, or an admin).
router.post('/', authenticateToken, createUserCourse);

// GET /api/user-courses/user/:userId - Get all courses for a specific user
// Requires authentication. Consider if only the user themselves or an admin can access this.
// For simplicity, I'll assume the authenticated user can only fetch their own courses if userId matches req.user.userId,
// or an admin can fetch any user's courses.
router.get('/user/:userId', authenticateToken, getUserCoursesByUserId);

// GET /api/user-courses/status/:status - Get user courses filtered by status (e.g., 'active', 'completed')
// This endpoint is a bit ambiguous if it's for *all* users or a *specific* user.
// I'll implement it to get courses for the *authenticated* user filtered by status.
// If you need it for all users (admin view), you'd adjust the logic.
router.get('/status/:status', authenticateToken, getUserCoursesByStatus);

export default router;