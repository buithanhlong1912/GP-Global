import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

// Generic validation middleware using Zod schemas
export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }));

        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errorMessages
        });
      }

      res.status(500).json({
        success: false,
        message: "Internal server error during validation"
      });
    }
  };
};

// Common validation schemas
export const schemas = {
  // Contact form validation
  contactForm: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
    subject: z.string().min(5, "Subject must be at least 5 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
    company: z.string().optional(),
  }),

  // Quote request validation
  quoteRequest: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
    projectType: z.string().min(2, "Project type is required"),
    location: z.string().min(2, "Location is required"),
    budget: z.string().optional(),
    area: z.string().optional(),
    timeline: z.string().optional(),
    description: z.string().optional(),
  }),

  // Candidate application validation
  candidateApplication: z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
    desiredPosition: z.string().min(2, "Desired position is required"),
    experience: z.string().min(2, "Experience is required"),
    education: z.string().optional(),
    skills: z.string().optional(),
    availability: z.string().optional(),
    salary: z.string().optional(),
    cvUrl: z.string().optional(),
    coverLetter: z.string().optional(),
  }),

  // Quick job application validation
  quickJobApplication: z.object({
    jobId: z.string().min(1, "Job ID is required"),
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
    experience: z.string().optional(),
    cvUrl: z.string().optional(),
  }),

  // Job creation validation (admin)
  jobCreation: z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    company: z.string().min(2, "Company name is required"),
    location: z.string().min(2, "Location is required"),
    description: z.string().min(20, "Description must be at least 20 characters"),
    requirements: z.string().optional(),
    benefits: z.string().optional(),
    employmentType: z.enum(["full-time", "part-time", "contract", "temporary"]),
    category: z.enum(["logistics", "san-xuat", "lao-dong-pho-thong", "ban-hang", "van-phong", "ky-thuat"]),
    salary: z.string().optional(),
    contactInfo: z.object({
      email: z.string().email().optional(),
      phone: z.string().optional(),
      address: z.string().optional()
    }).optional(),
    vacancies: z.number().min(1).optional(),
    deadline: z.string().optional(),
    isHot: z.boolean().optional(),
    isUrgent: z.boolean().optional(),
  }),

  // Project creation validation (admin)
  projectCreation: z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    category: z.enum(["showroom", "restaurant", "cafe", "office", "retail", "residential", "signage", "other"]),
    location: z.string().min(2, "Location is required"),
    client: z.string().optional(),
    area: z.string().optional(),
    duration: z.string().optional(),
    completedDate: z.string().optional(),
  }),

  // Blog post creation validation (admin)
  postCreation: z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    content: z.string().min(50, "Content must be at least 50 characters"),
    category: z.string().min(2, "Category is required"),
    author: z.string().min(1, "Author is required"),
    readingTime: z.number().min(1).optional(),
    tags: z.array(z.string()).optional(),
    isFeatured: z.boolean().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
  }),

  // Service creation validation (admin)
  serviceCreation: z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    category: z.string().min(2, "Category is required"),
    division: z.enum(["interior", "staffing"]),
    icon: z.string().optional(),
    features: z.array(z.string()).optional(),
    process: z.array(z.string()).optional(),
    pricing: z.string().optional(),
    isFeatured: z.boolean().optional(),
    order: z.number().optional(),
    ctaText: z.string().optional(),
    ctaLink: z.string().optional(),
  }),
};

// Error handling middleware
export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", error);

  if (error instanceof ZodError) {
    const errorMessages = error.errors.map(err => ({
      field: err.path.join('.'),
      message: err.message
    }));

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errorMessages
    });
  }

  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === "production" ? "Internal server error" : error.message
  });
};