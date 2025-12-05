import { Router, Request, Response } from "express";
import { fetchDocuments, fetchDocument, createDocument, updateDocument, deleteDocument } from "../services/sanity";
import { sendEmail } from "../services/email";
import { body, validationResult } from "express-validator";

const router = Router();

// Middleware to check if user is authenticated (simplified for demo)
const requireAuth = (req: Request, res: Response, next: any) => {
  // In production, implement proper JWT/session validation
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: "Authentication required"
    });
  }
  next();
};

// Get admin dashboard stats
router.get("/dashboard/stats", requireAuth, async (req: Request, res: Response) => {
  try {
    const statsQuery = `{
      "totalJobs": count(*[_type == "job"]),
      "activeJobs": count(*[_type == "job" && status == "active"]),
      "totalProjects": count(*[_type == "project"]),
      "totalCandidates": count(*[_type == "candidate"]),
      "totalContacts": count(*[_type == "contactSubmission"]),
      "totalQuoteRequests": count(*[_type == "quoteRequest"]),
      "totalPosts": count(*[_type == "post"]),
      "publishedPosts": count(*[_type == "post" && status == "published"]),
      "recentJobs": *[_type == "job"] | order(publishedAt desc) [0...5] {
        _id,
        title,
        status,
        publishedAt
      },
      "recentContacts": *[_type == "contactSubmission"] | order(createdAt desc) [0...5] {
        _id,
        name,
        email,
        subject,
        createdAt
      },
      "recentCandidates": *[_type == "candidate"] | order(createdAt desc) [0...5] {
        _id,
        fullName,
        email,
        desiredPosition,
        createdAt
      }
    }`;

    const stats = await fetchDocument(statsQuery);

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Get dashboard stats error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi tải thống kê",
    });
  }
});

// Get all submissions (contacts, candidates, quote requests)
router.get("/submissions", requireAuth, async (req: Request, res: Response) => {
  try {
    const { type, page = 1, limit = 20 } = req.query;

    let filter = '';
    if (type && type !== 'all') {
      filter = `_type == "${type}"`;
    } else {
      filter = '_type in ["contactSubmission", "candidate", "quoteRequest"]';
    }

    const offset = (Number(page) - 1) * Number(limit);

    const query = `*[${filter}] | order(createdAt desc) [${offset}...${offset + Number(limit)}] {
      _id,
      _type,
      "name": coalesce(name, fullName),
      email,
      phone,
      subject,
      message,
      desiredPosition,
      projectType,
      createdAt,
      status
    }`;

    const submissions = await fetchDocuments(query);

    res.json({
      success: true,
      data: submissions,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        offset,
      },
    });
  } catch (error) {
    console.error("Get submissions error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi tải danh sách liên hệ",
    });
  }
});

// Update job status
router.patch("/jobs/:id/status", requireAuth, [
  body("status").isIn(["active", "inactive", "closed"]).withMessage("Invalid status")
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const { status } = req.body;

    await updateDocument(id, { status });

    res.json({
      success: true,
      message: "Cập nhật trạng thái thành công",
    });
  } catch (error) {
    console.error("Update job status error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi cập nhật trạng thái",
    });
  }
});

// Create new job
router.post("/jobs", requireAuth, [
  body("title").notEmpty().withMessage("Title is required"),
  body("company").notEmpty().withMessage("Company is required"),
  body("location").notEmpty().withMessage("Location is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("employmentType").isIn(["full-time", "part-time", "contract", "temporary"]).withMessage("Invalid employment type"),
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const jobData = {
      ...req.body,
      status: "active",
      publishedAt: new Date().toISOString(),
      slug: {
        current: req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        _type: "slug"
      }
    };

    const job = await createDocument("job", jobData);

    res.json({
      success: true,
      message: "Tạo việc làm mới thành công",
      data: job,
    });
  } catch (error) {
    console.error("Create job error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi tạo việc làm mới",
    });
  }
});

// Send email to candidates
router.post("/email/candidates", requireAuth, [
  body("subject").notEmpty().withMessage("Subject is required"),
  body("message").notEmpty().withMessage("Message is required"),
  body("candidates").isArray().withMessage("Candidates must be an array")
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { subject, message, candidates } = req.body;

    const candidatesQuery = `*[${candidates.map((id: string) => `_id == "${id}"`).join(' || ')}] {
      email,
      fullName
    }`;

    const candidateData = await fetchDocuments(candidatesQuery);

    const emailPromises = candidateData.map((candidate: any) =>
      sendEmail({
        to: candidate.email,
        subject: `[VIETBUILD] ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1a365d;">Chào ${candidate.fullName},</h2>
            <div>${message}</div>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="color: #666; font-size: 12px;">
              VIETBUILD GROUP<br>
              Website: vietbuildgroup.vn
            </p>
          </div>
        `
      })
    );

    await Promise.all(emailPromises);

    res.json({
      success: true,
      message: `Email đã được gửi đến ${candidateData.length} ứng viên`,
    });
  } catch (error) {
    console.error("Send email to candidates error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi gửi email",
    });
  }
});

export default router;