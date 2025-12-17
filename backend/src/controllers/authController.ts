import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { hashPassword, comparePassword } from '../utils/passwordUtils';
import jwt from 'jsonwebtoken';

// Asegúrate de que JWT_SECRET esté definido en tus variables de entorno
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_fallback_key';

export const register = async (req: Request, res: Response) => {
  const { email, password, name, lastName, role, countryOfBirth,cityOfResidence, career,university,dateOfBirth } = req.body;
  
  try {
    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        lastName,
        countryOfBirth,
        cityOfResidence,
        career,
        university,
        role: role || 'user', // Permite definir el rol si se envía, por defecto 'user'
        dateOfBirth,
      },
    });
    const { passwordHash: _, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
  } catch (error: any) {
    if (error.code === 'P2002') { // Prisma error code for unique constraint violation
      return res.status(400).json({ message: 'Email already registered' });
    }
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await comparePassword(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expira en 1 hora
    );

    res.status(200).json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role,lastName: user.lastName,countryOfBirth: user.countryOfBirth,cityOfResidence:user.cityOfResidence,career: user.career,university: user.university,dateOfBirth: user.dateOfBirth,profilePictureUrl: user.profilePictureUrl } });
  } catch (error: any) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};