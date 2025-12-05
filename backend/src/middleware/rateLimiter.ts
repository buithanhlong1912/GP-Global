import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

// General rate limiter
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: "Too many requests, please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict rate limiter for sensitive endpoints
export const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: "Too many attempts, please try again later."
  },
  skipSuccessfulRequests: false,
  skipFailedRequests: false,
});

// Contact form rate limiter
export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit each IP to 3 contact forms per hour
  message: {
    success: false,
    message: "Too many contact form submissions, please try again later."
  },
  keyGenerator: (req: Request) => {
    // Use IP address as key
    return req.ip || req.connection.remoteAddress || 'unknown';
  },
});

// Job application rate limiter
export const applicationLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 10, // Limit each IP to 10 applications per day
  message: {
    success: false,
    message: "Too many job applications, please try again later."
  },
  keyGenerator: (req: Request) => {
    // Use email + IP as key to prevent multiple applications with different emails
    const email = req.body.email || '';
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    return `${ip}-${email}`;
  },
});

// File upload rate limiter
export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // Limit each IP to 20 file uploads per hour
  message: {
    success: false,
    message: "Too many file uploads, please try again later."
  },
});

// Quote request rate limiter
export const quoteRequestLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 5, // Limit each IP to 5 quote requests per day
  message: {
    success: false,
    message: "Too many quote requests, please try again later."
  },
  keyGenerator: (req: Request) => {
    const email = req.body.email || '';
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    return `${ip}-${email}`;
  },
});

// Search rate limiter (to prevent abuse of search functionality)
export const searchLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // Limit each IP to 30 searches per minute
  message: {
    success: false,
    message: "Too many search requests, please slow down."
  },
});