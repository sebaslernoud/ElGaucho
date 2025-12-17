import { Router } from 'express';
// Importa las funciones directamente
import {
 getUserNotifications,
 createNotification,
 markNotificationAsRead,
 deleteNotification
} from '../controllers/notificationController';
// Importa tu middleware de autenticación JWT
import { authenticateToken } from '../middlewares/authMiddleware'; // <-- ¡IMPORTANTE! Reemplaza con tu middleware real

const router = Router();

router.get('/', authenticateToken, getUserNotifications);

router.post('/', authenticateToken, createNotification);


router.patch('/:id/read', authenticateToken, markNotificationAsRead);


router.delete('/:id', authenticateToken, deleteNotification);

export default router;