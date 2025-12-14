import { Router } from 'express';
import {
getAllCourses,
getCourseById,
createCourse,
updateCourse,
deleteCourse,
} from '../controllers/courseController';
import { authenticateToken, authorizeRoles } from '../middlewares/authMiddleware';

const router = Router();

// Rutas para Cursos
// GET /api/courses - Obtener todos los cursos
// Puede ser público o requerir autenticación, dependiendo de tu lógica de negocio
router.get('/', authenticateToken, authorizeRoles(['admin']), getAllCourses);  

// GET /api/courses/:id - Obtener un curso por ID
// Puede ser público o requerir autenticación
router.get('/:id', getCourseById);

// POST /api/courses - Crear un nuevo curso
// Requiere autenticación y rol de 'admin' (o 'organizer' si lo defines)
router.post('/', authenticateToken, authorizeRoles(['admin']), createCourse);

// PUT /api/courses/:id - Actualizar un curso por ID
// Requiere autenticación y rol de 'admin'
router.put('/:id', authenticateToken, authorizeRoles(['admin']), updateCourse);

// DELETE /api/courses/:id - Eliminar un curso por ID
// Requiere autenticación y rol de 'admin'
router.delete('/:id', authenticateToken, authorizeRoles(['admin']), deleteCourse);

export default router;