import { Request, Response } from 'express';
import prisma from '../config/prisma'; // Importa la instancia de PrismaClient

// Extender la interfaz Request para que TypeScript reconozca req.user
// Esto es necesario porque el middleware de autenticación añade 'user' a la Request
declare global {
  namespace Express {
    interface Request {
      user?: { userId: string; email: string; role: string };
    }
  }
}

// 1. Obtener el perfil del usuario autenticado (GET /api/users/profile)
export const getUserProfile = async (req: Request, res: Response) => {
  // req.user es añadido por el middleware authenticateToken
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: User ID not found in token.' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      // Selecciona solo los campos que quieres exponer públicamente
      select: {
        id: true,
        email: true,
        name: true,
        lastName: true,
        countryOfBirth: true,
        cityOfResidence: true,
        career: true,
        university: true,
        dateOfBirth: true,
        role: true,
        profilePictureUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching user profile', error: error.message });
  }
  };

// 2. Obtener datos sensibles de administrador (GET /api/users/admin-data)
export const getAdminData = (req: Request, res: Response) => {
  // Este controlador solo se alcanzará si el usuario está autenticado y tiene rol 'admin'
  // gracias al middleware authorizeRoles(['admin'])
  res.status(200).json({ message: 'This is sensitive admin data!', user: req.user });
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      // Solo seleccionamos datos seguros/públicos
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        role: true,
        profilePictureUrl: true,
        countryOfBirth: true,
        cityOfResidence: true,
        university: true,
        career: true, // Agregamos la carrera que pediste antes
        dateOfBirth: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};


export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      // Seleccionamos solo lo necesario para el selector/lista
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
      },
      orderBy: {
        name: 'asc', // Opcional: ordenarlos alfabéticamente
      },
    });
    res.status(200).json(users);
  } catch (error: any) {
    console.error('Error fetching all users:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};