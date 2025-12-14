import { Request, Response } from 'express';
import prisma from '../config/prisma'; // Importa la instancia de PrismaClient

/**
* Obtiene todas las notificaciones para el usuario autenticado.
* Requiere un token JWT válido.
*/
export const getUserNotifications = async (req: Request, res: Response): Promise<Response> => {
 // El userId se espera que sea inyectado en el objeto req por el middleware de autenticación JWT.
 const userId = (req as any).user?.userId; // Asume que tu middleware JWT adjunta el usuario decodificado a req.user.id

 if (!userId) {
   return res.status(401).json({ message: 'Unauthorized: User ID not found in token.' });
 }

 try {
   const notifications = await prisma.notification.findMany({
     where: { userId: userId },
     orderBy: { sentAt: 'desc' }, // Ordenar por las más recientes primero
     include: { // Opcional: Incluir relaciones si necesitas mostrar datos de curso/charla
       relatedCourse: {
         select: { id: true, title: true } // Selecciona solo los campos que necesitas
       }
     }
   });

   return res.status(200).json(notifications);
 } catch (error) {
   console.error('Error fetching user notifications:', error);
   return res.status(500).json({ message: 'Internal server error while fetching notifications.' });
 }
};

/**
* Crea una nueva notificación.
* Requiere un token JWT válido para asociar la notificación a un usuario.
* Nota: En muchos casos, las notificaciones se crean por eventos del sistema,
* no directamente por el usuario. Esta ruta es para crear una notificación
* para un usuario específico.
*/
export const createNotification = async (req: Request, res: Response): Promise<Response> => {
 const { userId, type, title, message, relatedCourseId } = req.body;

 // Validación básica de entrada
 if (!userId || !type || !title || !message) {
   return res.status(400).json({ message: 'Missing required fields: userId, type, title, and message are required.' });
 }

 // Opcional: Validar que el userId de la notificación a crear
 // coincida con el userId del token si solo un usuario puede crear
 // notificaciones para sí mismo. Si es un admin, esto no sería necesario.
 // const authenticatedUserId = (req as any).user?.id;
 // if (userId !== authenticatedUserId && !(req as any).user?.isAdmin) { // Asume que tienes un rol 'isAdmin'
 //   return res.status(403).json({ message: 'Forbidden: You can only create notifications for yourself or if you are an admin.' });
 // }

 try {
   // Verificar si el userId existe en la tabla User
   const userExists = await prisma.user.findUnique({ where: { id: userId } });
   if (!userExists) {
     return res.status(404).json({ message: `User with ID ${userId} not found.` });
   }

   // Verificar si relatedCourseId existe si se proporciona
   if (relatedCourseId) {
     const courseExists = await prisma.course.findUnique({ where: { id: relatedCourseId } });
     if (!courseExists) {
       return res.status(404).json({ message: `Course with ID ${relatedCourseId} not found.` });
     }
   }


   const newNotification = await prisma.notification.create({
     data: {
       userId,
       type,
       title,
       message,
       relatedCourseId: relatedCourseId || null // Asegura que sea null si no se proporciona
     },
   });

   return res.status(201).json(newNotification);
 } catch (error) {
   console.error('Error creating notification:', error);
   return res.status(500).json({ message: 'Internal server error while creating notification.' });
 }
};

/**
* Marca una notificación como leída.
* Requiere un token JWT válido y que la notificación pertenezca al usuario.
*/
export const markNotificationAsRead = async (req: Request, res: Response): Promise<Response> => {
 const { id } = req.params; // ID de la notificación a marcar como leída
 const userId = (req as any).user?.id;

 if (!userId) {
   return res.status(401).json({ message: 'Unauthorized: User ID not found in token.' });
 }

 try {
   const notification = await prisma.notification.findUnique({
     where: { id: id },
   });

   if (!notification) {
     return res.status(404).json({ message: 'Notification not found.' });
   }

   // Asegurarse de que el usuario solo pueda marcar sus propias notificaciones como leídas
   if (notification.userId !== userId) {
     return res.status(403).json({ message: 'Forbidden: You can only mark your own notifications as read.' });
   }

   const updatedNotification = await prisma.notification.update({
     where: { id: id },
     data: { isRead: true },
   });

   return res.status(200).json(updatedNotification);
 } catch (error) {
   console.error('Error marking notification as read:', error);
   return res.status(500).json({ message: 'Internal server error while marking notification as read.' });
 }
};

/**
* Elimina una notificación.
* Requiere un token JWT válido y que la notificación pertenezca al usuario (o sea admin).
*/
export const deleteNotification = async (req: Request, res: Response): Promise<Response> => {
 const { id } = req.params;
 const userId = (req as any).user?.id;
 // const isAdmin = (req as any).user?.isAdmin; // Si tienes roles de administrador

 if (!userId) {
   return res.status(401).json({ message: 'Unauthorized: User ID not found in token.' });
 }

 try {
   const notification = await prisma.notification.findUnique({
     where: { id: id },
   });

   if (!notification) {
     return res.status(404).json({ message: 'Notification not found.' });
   }

   // Permitir eliminar solo si es el propietario de la notificación o un administrador
   if (notification.userId !== userId /* && !isAdmin */) {
     return res.status(403).json({ message: 'Forbidden: You can only delete your own notifications.' });
   }

   await prisma.notification.delete({
     where: { id: id },
   });

   return res.status(204).send(); // 204 No Content para eliminación exitosa
 } catch (error) {
   console.error('Error deleting notification:', error);
   return res.status(500).json({ message: 'Internal server error while deleting notification.' });
 }
};