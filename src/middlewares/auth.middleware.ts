import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: 'admin' | 'verifier';
  };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      role: 'admin' | 'verifier';
    };
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export const authorizeAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin')
    return res.status(403).json({ message: 'Access denied: Admins only' });

  next();
};

export const authorizeVerifierOrAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  const { role } = req.user || {};
  if (role !== 'admin' && role !== 'verifier')
    return res.status(403).json({ message: 'Access denied: Verifier or Admin only' });

  next();
};
