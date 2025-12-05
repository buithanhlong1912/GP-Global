import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

// JWT token verification middleware
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access token required"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role || 'user'
    };
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};

// Role-based access control
export const requireRole = (roles: string | string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required"
      });
    }

    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Insufficient permissions"
      });
    }

    next();
  };
};

// Admin only middleware
export const requireAdmin = requireRole(['admin', 'super_admin']);

// Optional authentication (doesn't fail if no token)
export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
      req.user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role || 'user'
      };
    } catch (error) {
      // Token is invalid but we don't fail the request
    }
  }

  next();
};