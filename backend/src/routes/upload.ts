import { Router, Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, "../../uploads");

    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || "10485760"), // 10MB default
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    const allowedTypes = (process.env.ALLOWED_FILE_TYPES || "image/jpeg,image/png,image/gif,image/webp,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document").split(",");

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  }
});

// Upload single file
router.post("/single", upload.single("file"), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    const fileUrl = `${process.env.BASE_URL || "http://localhost:3001"}/uploads/${req.file.filename}`;

    res.json({
      success: true,
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        url: fileUrl,
        path: req.file.path
      }
    });
  } catch (error) {
    console.error("File upload error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi tải lên tệp"
    });
  }
});

// Upload multiple files
router.post("/multiple", upload.array("files", 10), async (req: Request, res: Response) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded"
      });
    }

    const files = (req.files as Express.Multer.File[]).map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      url: `${process.env.BASE_URL || "http://localhost:3001"}/uploads/${file.filename}`,
      path: file.path
    }));

    res.json({
      success: true,
      data: files
    });
  } catch (error) {
    console.error("Multiple file upload error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi tải lên các tệp"
    });
  }
});

// Upload CV (resume) with specific validation
router.post("/cv", upload.single("cv"), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No CV uploaded"
      });
    }

    // Validate CV file types
    const allowedCVTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (!allowedCVTypes.includes(req.file.mimetype)) {
      // Delete the uploaded file if it's not valid
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        message: "CV must be PDF, DOC, or DOCX format"
      });
    }

    const fileUrl = `${process.env.BASE_URL || "http://localhost:3001"}/uploads/${req.file.filename}`;

    res.json({
      success: true,
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        url: fileUrl,
        path: req.file.path
      }
    });
  } catch (error) {
    console.error("CV upload error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi tải lên CV"
    });
  }
});

// Delete file
router.delete("/:filename", async (req: Request, res: Response) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, "../../uploads", filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({
        success: true,
        message: "File deleted successfully"
      });
    } else {
      res.status(404).json({
        success: false,
        message: "File not found"
      });
    }
  } catch (error) {
    console.error("File delete error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi xóa tệp"
    });
  }
});

export default router;