import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

// Import middleware
import { securityHeaders, refererCheck } from "./middleware/security";
import { requestLogger, errorLogger } from "./utils/logger";
import { errorHandler, validate } from "./middleware/validation";
import {
  generalLimiter,
  contactLimiter,
  applicationLimiter,
  uploadLimiter,
  quoteRequestLimiter,
} from "./middleware/rateLimiter";

// Import routes
import contactRoutes from "./routes/contact";
import jobRoutes from "./routes/jobs";
import projectRoutes from "./routes/projects";
import candidateRoutes from "./routes/candidates";
import servicesRoutes from "./routes/services";
import blogRoutes from "./routes/blog";
import adminRoutes from "./routes/admin";
import uploadRoutes from "./routes/upload";
import teamRoutes from "./routes/team";

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;

// Enhanced security middleware
app.use(securityHeaders);

// CORS configuration
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:3000").split(",");
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Request-ID"],
  })
);

// General rate limiting
app.use(generalLimiter);

// Request logging
app.use(requestLogger);

// Referer checking for CSRF protection
app.use(refererCheck(allowedOrigins));

// Compression
app.use(compression());

// Logging
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// API Routes with specific rate limiters
app.use("/api/contact", contactLimiter, contactRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/candidates", applicationLimiter, candidateRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadLimiter, uploadRoutes);

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Endpoint không tồn tại",
  });
});

// Error handlers (must be last)
app.use(errorLogger);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});

export default app;

