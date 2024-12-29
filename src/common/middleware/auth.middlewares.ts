import type { Request, Response, NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';

// Extend the Request interface to include a user property
declare module 'express-serve-static-core' {
  interface Request {
    user?: string | JwtPayload;
  }
}

/**
 * Middleware to protect routes requiring authentication
 * @param jwtSecret - Secret key used for JWT verification
 */
export const authenticateMiddleware = (jwtSecret: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Check for Authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({
          message: 'Access token is required.',
        });
        return;
      }
      // Extract the token
      const token = authHeader.split(' ')[1];

      jwt.decode(token);

      const decoded = jwt.verify(token, jwtSecret);
      req.user = decoded;

      // Proceed to the next middleware or controller
      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({
          message: 'Invalid access token.',
          error: error.message
        });
        return;
      }

      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json({
          message: 'Access token has expired. Please log in again.',
        });
        return;
      }

      // Catch-all for unexpected errors
      res.status(500).json({
        message: 'An unexpected error occurred while validating the token.',
      });
    }
  };
};
