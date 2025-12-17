import { Router } from 'express';
import { authenticateToken, authorizeRoles } from '../middlewares/authMiddleware';
import { getUserProfile, getAdminData, getUserById, getAllUsers, uploadProfilePicture } from '../controllers/userController'; // <-- Importa las funciones del controlador
import { upload } from '../config/multer';
const router = Router();

// GET /api/users/profile - Obtener el perfil del usuario autenticado
// Requiere autenticación
router.get('/profile', authenticateToken, getUserProfile);
router.get('/:id', authenticateToken, getUserById);

// GET /api/users/admin-data - Obtener datos sensibles de administrador
// Requiere autenticación y rol de 'admin'
router.get('/admin-data', authenticateToken, authorizeRoles(['admin']), getAdminData);
router.get('/', authenticateToken, authorizeRoles(['admin']), getAllUsers);
router.post(
    '/:userId/profile-picture', 
    authenticateToken, 
    authorizeRoles(['admin']), 
    upload.single('profilePicture'), 
    uploadProfilePicture
);

export default router;