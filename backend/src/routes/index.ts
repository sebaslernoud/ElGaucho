import { Router } from 'express';
import authRoutes from './authRoutes';
import courseRoutes from './courseRoutes';
import notificationRoutes from './notificationRoutes';
import speakerRoutes from './speakerRoutes';
import talkRoutes from './talkRoutes';
import userCourseRoutes from './userCourseRoutes';
import userRoutes from './userRoutes';
// Importa tus otras rutas aquí (courseRoutes, talkRoutes, etc.)

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/courses', courseRoutes);
router.use('/notifications', notificationRoutes);
router.use('/user-courses', userCourseRoutes);
router.use('/talks', talkRoutes);
router.use('/speakers', speakerRoutes);

// router.use('/talks', talkRoutes);
export default router;