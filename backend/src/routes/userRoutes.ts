import { Router } from 'express';
import { authenticateToken, authorizeRoles } from '../middlewares/authMiddleware';
import { getUserProfile, getAdminData } from '../controllers/userController'; // <-- Importa las funciones del controlador

const router = Router();

// GET /api/users/profile - Obtener el perfil del usuario autenticado
// Requiere autenticación
router.get('/profile', authenticateToken, getUserProfile);

// GET /api/users/admin-data - Obtener datos sensibles de administrador
// Requiere autenticación y rol de 'admin'
router.get('/admin-data', authenticateToken, authorizeRoles(['admin']), getAdminData);

export default router;