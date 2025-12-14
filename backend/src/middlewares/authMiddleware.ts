import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extender la interfaz Request para añadir el usuario decodificado
declare global {
  namespace Express {
    interface Request {
      user?: { userId: string; email: string; role: string };
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_fallback_key';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) return res.sendStatus(401); // No token

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403); // Token inválido o expirado
    req.user = user; // Adjuntar el usuario decodificado a la solicitud
    next();
  });
};

export const authorizeRoles = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
    next();
  };
};