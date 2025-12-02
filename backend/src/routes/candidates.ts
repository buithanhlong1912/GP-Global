import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { createDocument } from "../services/sanity";
import { sendEmail, emailTemplates } from "../services/email";

const router = Router();

// Validation
const candidateValidation = [
  body("fullName").trim().notEmpty().withMessage("Họ tên là bắt buộc"),
  body("email").isEmail().withMessage("Email không hợp lệ"),
  body("phone")
    .matches(/^(0|\+84)(3|5|7|8|9)[0-9]{8}$/)
    .withMessage("Số điện thoại không hợp lệ"),
  body("experience").trim().notEmpty().withMessage("Kinh nghiệm là bắt buộc"),
  body("desiredPosition").trim().notEmpty().withMessage("Vị trí mong muốn là bắt buộc"),
  body("availability").trim().notEmpty().withMessage("Khả năng đi làm là bắt buộc"),
];

// Register candidate
router.post("/register", candidateValidation, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Dữ liệu không hợp lệ",
        errors: errors.array(),
      });
    }

    const {
      fullName,
      email,
      phone,
      dateOfBirth,
      gender,
      address,
      experience,
      education,
      skills,
      desiredPosition,
      desiredSalary,
      desiredLocation,
      availability,
    } = req.body;

    // Check if email already exists
    // Note: In production, you might want to add this check

    // Save to Sanity
    const doc = await createDocument("candidate", {
      fullName,
      email,
      phone,
      dateOfBirth: dateOfBirth || null,
      gender: gender || null,
      address: address || null,
      experience,
      education: education || null,
      skills: skills || [],
      desiredPosition,
      desiredSalary: desiredSalary ? Number(desiredSalary) : null,
      desiredLocation: desiredLocation || null,
      availability,
      status: "active",
      registeredAt: new Date().toISOString(),
    });

    // Send notification email
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      const template = emailTemplates.candidateNotification({
        fullName,
        email,
        phone,
        desiredPosition,
        experience,
      });
      await sendEmail({
        to: adminEmail,
        ...template,
      });
    }

    // Auto-reply to candidate
    await sendEmail({
      to: email,
      subject: "[VIETBUILD GROUP] Đăng ký ứng viên thành công",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #065f46;">Xin chào ${fullName}!</h2>
          <p>Cảm ơn bạn đã đăng ký trở thành ứng viên của VIETBUILD GROUP.</p>
          <p>Thông tin của bạn đã được ghi nhận. Đội ngũ tư vấn của chúng tôi sẽ liên hệ trong vòng 24 giờ để hướng dẫn các bước tiếp theo.</p>
          <div style="margin: 20px 0; padding: 15px; background: #ecfdf5; border-radius: 5px;">
            <strong>Thông tin đã đăng ký:</strong>
            <ul>
              <li>Vị trí mong muốn: ${desiredPosition}</li>
              <li>Kinh nghiệm: ${experience}</li>
            </ul>
          </div>
          <p>Nếu có câu hỏi, vui lòng gọi: <strong>1900 1234</strong></p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            VIETBUILD GROUP - Cung ứng Nhân sự Chuyên nghiệp
          </p>
        </div>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Đăng ký thành công! Chúng tôi sẽ liên hệ trong 24 giờ.",
      data: { id: doc._id },
    });
  } catch (error) {
    console.error("Candidate registration error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi, vui lòng thử lại sau",
    });
  }
});

// Apply for a job
const applyValidation = [
  body("fullName").trim().notEmpty().withMessage("Họ tên là bắt buộc"),
  body("email").isEmail().withMessage("Email không hợp lệ"),
  body("phone")
    .matches(/^(0|\+84)(3|5|7|8|9)[0-9]{8}$/)
    .withMessage("Số điện thoại không hợp lệ"),
  body("jobId").trim().notEmpty().withMessage("Job ID là bắt buộc"),
];

router.post("/apply", applyValidation, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Dữ liệu không hợp lệ",
        errors: errors.array(),
      });
    }

    const { fullName, email, phone, jobId, coverLetter } = req.body;

    // Create job application
    const doc = await createDocument("jobApplication", {
      job: {
        _type: "reference",
        _ref: jobId,
      },
      fullName,
      email,
      phone,
      coverLetter: coverLetter || null,
      status: "new",
      appliedAt: new Date().toISOString(),
    });

    res.status(201).json({
      success: true,
      message: "Ứng tuyển thành công! Chúng tôi sẽ xem xét và liên hệ lại.",
      data: { id: doc._id },
    });
  } catch (error) {
    console.error("Job application error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi, vui lòng thử lại sau",
    });
  }
});

export default router;

