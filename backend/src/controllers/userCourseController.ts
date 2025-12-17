import { Request, Response } from 'express';
import prisma from '../config/prisma';

// Extend the Request interface for req.user, as it's used by authMiddleware
declare global {
 namespace Express {
   interface Request {
     user?: { userId: string; email: string; role: string };
   }
 }
}


export const getPendingRequests = async (req: Request, res: Response) => {
  try {
    const pendingRequests = await prisma.userCourse.findMany({
      where: { status: 'pending' },
      include: {
        user: { select: { id: true, name: true, lastName: true, email: true } },
        course: { select: { id: true, title: true } },
      },
    });
    res.status(200).json(pendingRequests);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching pending requests', error: error.message });
  }
};

// Actualizar estado (Aceptar/Rechazar)
export const updateRequestStatus = async (req: Request, res: Response) => {
  const { courseId, userId } = req.params;
  const { status } = req.body; // Esperamos 'accepted' o 'rejected'

  if (!['accepted', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const updatedUserCourse = await prisma.userCourse.update({
      where: {
        userId_courseId: { userId, courseId }, // Clave compuesta definida en Prisma
      },
      data: { status },
    });
    res.status(200).json(updatedUserCourse);
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating request status', error: error.message });
  }
};


/**
* Creates a new UserCourse entry (e.g., a user registers for a course).
* POST /api/user-courses
* Body: { userId: string, courseId: string, roleInCourse?: string, status?: string }
* Requires authentication.
*/
export const createUserCourse = async (req: Request, res: Response) => {
 const { userId, courseId, roleInCourse, status } = req.body;
 const authenticatedUserId = req.user?.userId; // Get ID from authenticated token

 // Basic validation
 if (!userId || !courseId) {
   return res.status(400).json({ message: 'Missing required fields: userId and courseId.' });
 }

 // Security check: A user can only register themselves for a course, unless they are an admin.
 // This assumes 'admin' role is available in req.user.role.
 if (userId !== authenticatedUserId && req.user?.role !== 'user') {
   return res.status(403).json({ message: 'Forbidden: You can only register yourself for a course unless you are an admin.' });
 }

 try {
   // Check if user and course exist
   const userExists = await prisma.user.findUnique({ where: { id: userId } });
   if (!userExists) {
     return res.status(404).json({ message: `User with ID ${userId} not found.` });
   }

   const courseExists = await prisma.course.findUnique({ where: { id: courseId } });
   if (!courseExists) {
     return res.status(404).json({ message: `Course with ID ${courseId} not found.` });
   }

   // Check if the user is already registered for this course
   const existingUserCourse = await prisma.userCourse.findUnique({
     where: {
       userId_courseId: {
         userId,
         courseId,
       },
     },
   });

   if (existingUserCourse) {
     return res.status(409).json({ message: 'User is already registered for this course.' });
   }

   const newUserCourse = await prisma.userCourse.create({
     data: {
       userId,
       courseId,
       roleInCourse: roleInCourse || 'participant', // Default to 'participant'
       status: status || 'pending', // Default to 'pending'
     },
   });
   res.status(201).json(newUserCourse);
 } catch (error: any) {
   console.error('Error creating user course:', error);
   res.status(500).json({ message: 'Error creating user course', error: error.message });
 }
};

/**
* Gets all courses for a specific user ID.
* GET /api/user-courses/user/:userId
* Requires authentication.
*/
export const getUserCoursesByUserId = async (req: Request, res: Response) => {
 const { userId } = req.params;

 try {
   const userCourses = await prisma.userCourse.findMany({
     where: { userId: userId },
     include: {
       course: { // Include course details
         select: {
           id: true,
           title: true,
         },
       },
     },
   });

   if (userCourses.length === 0) {
     return res.status(404).json({ message: 'No courses found for this user.' });
   }

   res.status(200).json(userCourses);
 } catch (error: any) {
   console.error('Error fetching user courses by user ID:', error);
   res.status(500).json({ message: 'Error fetching user courses', error: error.message });
 }
};

/**
* Gets courses for the authenticated user filtered by status (e.g., 'active', 'completed').
* GET /api/user-courses/status/:status
* Requires authentication.
*/
export const getUserCoursesByStatus = async (req: Request, res: Response) => {
 const { status } = req.params; // 'active', 'completed', 'pending', 'attended', 'rejected'
 const authenticatedUserId = req.user?.userId;

 if (!authenticatedUserId) {
   return res.status(401).json({ message: 'Unauthorized: User ID not found in token.' });
 }

 // Optional: Validate the status parameter against allowed values
 const allowedStatuses = ['pending', 'accepted', 'rejected', 'attended']; // Based on your schema
 if (!allowedStatuses.includes(status)) {
   return res.status(400).json({ message: `Invalid status provided. Allowed statuses are: ${allowedStatuses.join(', ')}.` });
 }

 try {
   const userCourses = await prisma.userCourse.findMany({
     where: {
       userId: authenticatedUserId,
       status: status,
     },
     include: {
       course: { // Include course details
         select: {
           id: true,
           title: true,
           description: true,
           startDate: true,
           endDate: true,
           location: true,
           status: true, // This is the course's status, not the user's enrollment status
           maxParticipants: true,
         },
       },
     },
   });

   if (userCourses.length === 0) {
     return res.status(404).json({ message: `No courses found with status '${status}' for the authenticated user.` });
   }

   res.status(200).json(userCourses);
 } catch (error: any) {
   console.error('Error fetching user courses by status:', error);
   res.status(500).json({ message: 'Error fetching user courses by status', error: error.message });
 }
};