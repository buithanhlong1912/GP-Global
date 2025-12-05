import { Request, Response, NextFunction } from "express";
import helmet from "helmet";

// Enhanced security headers
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      manifestSrc: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
});

// IP-based request filtering
export const ipFilter = (blockedIPs: string[] = []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const clientIP = req.ip || req.connection.remoteAddress;

    if (blockedIPs.includes(clientIP as string)) {
      return res.status(403).json({
        success: false,
        message: "Access denied"
      });
    }

    next();
  };
};

// Request size limiter for specific endpoints
export const requestSizeLimiter = (maxSize: number = 10 * 1024 * 1024) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const contentLength = req.get('content-length');

    if (contentLength && parseInt(contentLength) > maxSize) {
      return res.status(413).json({
        success: false,
        message: "Request entity too large"
      });
    }

    next();
  };
};

// XSS protection middleware
export const xssProtection = (req: Request, res: Response, next: NextFunction) => {
  // Sanitize request body for XSS attempts
  if (req.body) {
    const sanitizeString = (str: string): string => {
      return str
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '');
    };

    const sanitizeObject = (obj: any): any => {
      if (typeof obj === 'string') {
        return sanitizeString(obj);
      } else if (typeof obj === 'object' && obj !== null) {
        const sanitized: any = {};
        for (const [key, value] of Object.entries(obj)) {
          sanitized[key] = sanitizeObject(value);
        }
        return sanitized;
      }
      return obj;
    };

    req.body = sanitizeObject(req.body);
  }

  next();
};

// SQL injection prevention (basic)
export const sqlInjectionProtection = (req: Request, res: Response, next: NextFunction) => {
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/gi,
    /(--|\*\/|\/\*)/gi,
    /(\'|\'\')/gi,
    /(OR\s+1\s*=\s*1)/gi,
  ];

  const checkForSqlInjection = (str: string): boolean => {
    return sqlPatterns.some(pattern => pattern.test(str));
  };

  const checkObject = (obj: any): boolean => {
    if (typeof obj === 'string') {
      return checkForSqlInjection(obj);
    } else if (typeof obj === 'object' && obj !== null) {
      return Object.values(obj).some(value => checkObject(value));
    }
    return false;
  };

  if (checkObject(req.body) || checkObject(req.query) || checkObject(req.params)) {
    return res.status(400).json({
      success: false,
      message: "Invalid request parameters"
    });
  }

  next();
};

// CORS configuration for specific routes
export const configureCORS = (allowedOrigins: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin as string) || !origin) {
      res.setHeader('Access-Control-Allow-Origin', origin || '*');
    } else {
      res.setHeader('Access-Control-Allow-Origin', allowedOrigins[0]);
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    next();
  };
};

// Referer checking for CSRF protection
export const refererCheck = (allowedDomains: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const referer = req.headers.referer;
    const origin = req.headers.origin;

    // Skip for GET requests and API health checks
    if (req.method === 'GET' || req.path === '/health') {
      return next();
    }

    // Allow requests with no referer (direct API calls)
    if (!referer && !origin) {
      return next();
    }

    const isAllowedDomain = (url: string) => {
      return allowedDomains.some(domain => url.includes(domain));
    };

    if ((referer && !isAllowedDomain(referer)) || (origin && !isAllowedDomain(origin))) {
      return res.status(403).json({
        success: false,
        message: "Invalid request origin"
      });
    }

    next();
  };
};