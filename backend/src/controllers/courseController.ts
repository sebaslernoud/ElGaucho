import { Request, Response } from 'express';
import prisma from '../config/prisma'; // Importa la instancia de PrismaClient

// 1. Obtener todos los cursos (GET /api/courses)
export const getAllCourses = async (req: Request, res: Response) => {
try {
  const courses = await prisma.course.findMany({}); // findMany sin argumentos para obtener todos
  res.status(200).json(courses);
} catch (error: any) {
  res.status(500).json({ message: 'Error fetching courses', error: error.message });
}
};

// 2. Obtener un curso por ID (GET /api/courses/:id)
export const getCourseById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        talks: {
            include: { speaker: true } // Incluimos info del speaker en la charla
        },
        userCourses: {
          include: {
            user: true, // Incluimos info del usuario participante
          },
        },
      },
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching course', error: error.message });
  }
};

// 3. Crear un nuevo curso (POST /api/courses)
export const createCourse = async (req: Request, res: Response) => {
// Desestructura los datos del cuerpo de la solicitud
const { title, description, startDate, endDate, location, maxParticipants } = req.body;
const organizerId = req.user?.userId;

if (!organizerId) {
    return res.status(401).json({ message: 'Unauthorized: User not identified' });
  }
// Validación básica (puedes añadir más validaciones con librerías como Zod o Joi)
if (!title || !description || !startDate || !endDate || !location || !organizerId) {
  return res.status(400).json({ message: 'Missing required fields' });
}

try {
  const newCourse = await prisma.course.create({
    data: {
      title,
      description,
      startDate: new Date(startDate), // Asegúrate de que las fechas sean objetos Date
      endDate: new Date(endDate),     // Asegúrate de que las fechas sean objetos Date
      location,
      organizerId,
      maxParticipants: maxParticipants ? parseInt(maxParticipants) : undefined, // Convertir a Int si existe
    },
  });
  res.status(201).json(newCourse);
} catch (error: any) {
  res.status(500).json({ message: 'Error creating course', error: error.message });
}
};

// 4. Actualizar un curso por ID (PUT /api/courses/:id)
export const updateCourse = async (req: Request, res: Response) => {
const { id } = req.params;
const { title, description, startDate, endDate, location, organizerId, status, maxParticipants, qrCodeUrl } = req.body;

try {
  const updatedCourse = await prisma.course.update({
    where: { id },
    data: {
      title,
      description,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      location,
      organizerId,
      status,
      maxParticipants: maxParticipants ? parseInt(maxParticipants) : undefined,
      qrCodeUrl,
    },
  });
  res.status(200).json(updatedCourse);
} catch (error: any) {
  if (error.code === 'P2025') { // Prisma error code for record not found
    return res.status(404).json({ message: 'Course not found' });
  }
  res.status(500).json({ message: 'Error updating course', error: error.message });
}
};

// 5. Eliminar un curso por ID (DELETE /api/courses/:id)
export const deleteCourse = async (req: Request, res: Response) => {
const { id } = req.params;
try {
  await prisma.course.delete({
    where: { id },
  });
  res.status(204).send(); // 204 No Content para eliminación exitosa
} catch (error: any) {
  if (error.code === 'P2025') { // Prisma error code for record not found
    return res.status(404).json({ message: 'Course not found' });
  }
  res.status(500).json({ message: 'Error deleting course', error: error.message });
}
};