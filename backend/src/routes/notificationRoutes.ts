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

/**
* @swagger
* tags:
*   name: Notifications
*   description: API para la gestión de notificaciones de usuario
*/

/**
* @swagger
* /api/notifications:
*   get:
*     summary: Obtiene todas las notificaciones para el usuario autenticado.
*     tags: [Notifications]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: Lista de notificaciones del usuario.
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Notification'
*       401:
*         description: No autorizado, token JWT no proporcionado o inválido.
*       500:
*         description: Error interno del servidor.
*/
router.get('/', authenticateToken, getUserNotifications);

/**
* @swagger
* /api/notifications:
*   post:
*     summary: Crea una nueva notificación.
*     tags: [Notifications]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - userId
*               - type
*               - title
*               - message
*             properties:
*               userId:
*                 type: string
*                 format: uuid
*                 description: ID del usuario al que se le enviará la notificación.
*               type:
*                 type: string
*                 description: Tipo de notificación (ej. 'NEW_COURSE', 'REMINDER', 'MESSAGE').
*               title:
*                 type: string
*                 description: Título de la notificación.
*               message:
*                 type: string
*                 description: Contenido del mensaje de la notificación.
*               relatedCourseId:
*                 type: string
*                 format: uuid
*                 nullable: true
*                 description: ID del curso relacionado, si aplica.
*     responses:
*       201:
*         description: Notificación creada exitosamente.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Notification'
*       400:
*         description: Campos requeridos faltantes o inválidos.
*       401:
*         description: No autorizado, token JWT no proporcionado o inválido.
*       403:
*         description: Prohibido, no tienes permisos para crear esta notificación.
*       404:
*         description: Usuario, curso o charla relacionado no encontrado.
*       500:
*         description: Error interno del servidor.
*/
router.post('/', authenticateToken, createNotification);

/**
* @swagger
* /api/notifications/{id}/read:
*   patch:
*     summary: Marca una notificación específica como leída.
*     tags: [Notifications]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*           format: uuid
*         required: true
*         description: ID de la notificación a marcar como leída.
*     responses:
*       200:
*         description: Notificación marcada como leída exitosamente.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Notification'
*       401:
*         description: No autorizado.
*       403:
*         description: Prohibido, la notificación no pertenece al usuario.
*       404:
*         description: Notificación no encontrada.
*       500:
*         description: Error interno del servidor.
*/
router.patch('/:id/read', authenticateToken, markNotificationAsRead);

/**
* @swagger
* /api/notifications/{id}:
*   delete:
*     summary: Elimina una notificación específica.
*     tags: [Notifications]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*           format: uuid
*         required: true
*         description: ID de la notificación a eliminar.
*     responses:
*       204:
*         description: Notificación eliminada exitosamente.
*       401:
*         description: No autorizado.
*       403:
*         description: Prohibido, la notificación no pertenece al usuario o no tiene permisos de administrador.
*       404:
*         description: Notificación no encontrada.
*       500:
*         description: Error interno del servidor.
*/
router.delete('/:id', authenticateToken, deleteNotification);

export default router;