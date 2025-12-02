import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { createDocument } from "../services/sanity";
import { sendEmail, emailTemplates } from "../services/email";

const router = Router();

// Validation middleware
const contactValidation = [
  body("name").trim().notEmpty().withMessage("Họ tên là bắt buộc"),
  body("email").isEmail().withMessage("Email không hợp lệ"),
  body("phone")
    .matches(/^(0|\+84)(3|5|7|8|9)[0-9]{8}$/)
    .withMessage("Số điện thoại không hợp lệ"),
  body("subject").trim().notEmpty().withMessage("Chủ đề là bắt buộc"),
  body("message").trim().notEmpty().withMessage("Nội dung là bắt buộc"),
];

// Submit contact form
router.post("/", contactValidation, async (req: Request, res: Response) => {
  try {
    // Check validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Dữ liệu không hợp lệ",
        errors: errors.array(),
      });
    }

    const { name, email, phone, company, subject, message } = req.body;

    // Save to Sanity
    const doc = await createDocument("contactSubmission", {
      name,
      email,
      phone,
      company: company || null,
      subject,
      message,
      source: "contact-form",
      status: "new",
      submittedAt: new Date().toISOString(),
    });

    // Send notification email to admin
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      const template = emailTemplates.contactNotification({
        name,
        email,
        phone,
        subject,
        message,
      });
      await sendEmail({
        to: adminEmail,
        ...template,
      });
    }

    // Send auto-reply to customer
    const autoReply = emailTemplates.contactAutoReply({ name });
    await sendEmail({
      to: email,
      ...autoReply,
    });

    res.status(201).json({
      success: true,
      message: "Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ lại sớm.",
      data: { id: doc._id },
    });
  } catch (error) {
    console.error("Contact submission error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi, vui lòng thử lại sau",
    });
  }
});

// Submit quote request
const quoteValidation = [
  body("name").trim().notEmpty().withMessage("Họ tên là bắt buộc"),
  body("email").isEmail().withMessage("Email không hợp lệ"),
  body("phone")
    .matches(/^(0|\+84)(3|5|7|8|9)[0-9]{8}$/)
    .withMessage("Số điện thoại không hợp lệ"),
  body("projectType").trim().notEmpty().withMessage("Loại dự án là bắt buộc"),
  body("location").trim().notEmpty().withMessage("Địa điểm là bắt buộc"),
];

router.post("/quote", quoteValidation, async (req: Request, res: Response) => {
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
      name,
      email,
      phone,
      company,
      projectType,
      budget,
      area,
      location,
      timeline,
      description,
    } = req.body;

    // Save to Sanity
    const doc = await createDocument("quoteRequest", {
      name,
      email,
      phone,
      company: company || null,
      projectType,
      budget: budget || null,
      area: area || null,
      location,
      timeline: timeline || null,
      description: description || null,
      status: "new",
      submittedAt: new Date().toISOString(),
    });

    // Send notification email
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      const template = emailTemplates.quoteRequestNotification({
        name,
        email,
        phone,
        projectType,
        budget,
        area,
        location,
        description,
      });
      await sendEmail({
        to: adminEmail,
        ...template,
      });
    }

    // Auto-reply
    await sendEmail({
      to: email,
      ...emailTemplates.contactAutoReply({ name }),
    });

    res.status(201).json({
      success: true,
      message: "Gửi yêu cầu báo giá thành công! Chúng tôi sẽ phản hồi trong 24 giờ.",
      data: { id: doc._id },
    });
  } catch (error) {
    console.error("Quote request error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi, vui lòng thử lại sau",
    });
  }
});

export default router;

