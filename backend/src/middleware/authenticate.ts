import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthError } from '../utils/errors';

interface JwtPayload {
  id: number;
  email: string;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthError('Authentication required', 401);
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'fallback-secret'
      ) as JwtPayload;

      // Attach user to request object
      (req as any).user = decoded;
      next();
    } catch (error) {
      throw new AuthError('Invalid or expired token', 401);
    }
  } catch (error) {
    next(error);
  }
};
