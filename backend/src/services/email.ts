import nodemailer from "nodemailer";

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  attachments?: Array<{
    filename: string;
    path?: string;
    content?: Buffer;
  }>;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || "noreply@vietbuildgroup.vn",
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      attachments: options.attachments,
    });
    return true;
  } catch (error) {
    console.error("Email send error:", error);
    return false;
  }
}

// Email templates
export const emailTemplates = {
  // Contact form submission notification to admin
  contactNotification: (data: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }) => ({
    subject: `[VIETBUILD] Yêu cầu liên hệ mới: ${data.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a365d;">Yêu cầu liên hệ mới</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Họ tên:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Điện thoại:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Chủ đề:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.subject}</td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 5px;">
          <strong>Nội dung:</strong>
          <p>${data.message}</p>
        </div>
        <p style="margin-top: 20px; color: #666; font-size: 12px;">
          Email này được gửi tự động từ website VIETBUILD GROUP
        </p>
      </div>
    `,
  }),

  // Auto-reply to customer
  contactAutoReply: (data: { name: string }) => ({
    subject: "[VIETBUILD GROUP] Cảm ơn bạn đã liên hệ",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a365d;">Cảm ơn ${data.name}!</h2>
        <p>Chúng tôi đã nhận được yêu cầu của bạn và sẽ phản hồi trong thời gian sớm nhất.</p>
        <p>Nếu có bất kỳ câu hỏi gấp, vui lòng gọi hotline: <strong>1900 1234</strong></p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          VIETBUILD GROUP<br>
          Thiết kế Nội thất & Cung ứng Nhân sự<br>
          Website: vietbuildgroup.vn
        </p>
      </div>
    `,
  }),

  // Quote request notification
  quoteRequestNotification: (data: {
    name: string;
    email: string;
    phone: string;
    projectType: string;
    budget?: string;
    area?: string;
    location: string;
    description?: string;
  }) => ({
    subject: `[VIETBUILD] Yêu cầu báo giá mới: ${data.projectType}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a365d;">Yêu cầu báo giá mới</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Khách hàng:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Điện thoại:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Loại dự án:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.projectType}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Ngân sách:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.budget || "Chưa xác định"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Diện tích:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.area || "Chưa xác định"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Địa điểm:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.location}</td>
          </tr>
        </table>
        ${data.description ? `
          <div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 5px;">
            <strong>Mô tả:</strong>
            <p>${data.description}</p>
          </div>
        ` : ""}
        <p style="margin-top: 20px; color: #c9a962; font-weight: bold;">
          ⚡ Cần phản hồi trong 24 giờ!
        </p>
      </div>
    `,
  }),

  // Candidate registration notification
  candidateNotification: (data: {
    fullName: string;
    email: string;
    phone: string;
    desiredPosition: string;
    experience: string;
  }) => ({
    subject: `[VIETBUILD] Ứng viên mới: ${data.desiredPosition}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #065f46;">Ứng viên mới đăng ký</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Họ tên:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.fullName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Điện thoại:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Vị trí mong muốn:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.desiredPosition}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Kinh nghiệm:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.experience}</td>
          </tr>
        </table>
      </div>
    `,
  }),
};

