# VIETBUILD GROUP - Backend API

Backend API cho website VIETBUILD GROUP chuyên về thiết kế nội thất và cung ứng nhân sự.

## 🚀 Tính năng

- **API quản lý nội dung** với Sanity CMS
- **Hệ thống việc làm** với tìm kiếm và lọc nâng cao
- **Quản lý dự án** nội thất
- **Hệ thống ứng tuyển** và quản lý ứng viên
- **Form liên hệ** và yêu cầu báo giá
- **Upload file** với bảo mật
- **Admin dashboard** cho quản lý nội dung
- **Email notifications** tự động
- **Security middleware** và rate limiting
- **Logging system** chi tiết

## 🛠️ Công nghệ

- **Node.js** với TypeScript
- **Express.js** framework
- **Sanity CMS** cho quản lý nội dung
- **Nodemailer** cho gửi email
- **Multer** cho upload file
- **JWT** cho authentication
- **Zod** cho validation
- **Winston** cho logging

## 📋 Yêu cầu

- Node.js >= 18.0.0
- npm hoặc yarn
- Sanity project đã được thiết lập

## 🚀 Cài đặt

1. **Clone repository**
   ```bash
   cd backend
   ```

2. **Cài đặt dependencies**
   ```bash
   npm install
   ```

3. **Cấu hình biến môi trường**
   ```bash
   cp .env.example .env
   ```

   Chỉnh sửa file `.env` với thông tin cấu hình:
   ```env
   # Server Configuration
   PORT=3001
   NODE_ENV=development

   # Sanity CMS Configuration
   SANITY_PROJECT_ID=your-project-id
   SANITY_DATASET=production
   SANITY_API_TOKEN=your-sanity-api-token

   # Email Configuration
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key
   ```

4. **Tạo thư mục uploads**
   ```bash
   mkdir -p uploads
   mkdir -p logs
   ```

5. **Khởi động server**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm run build
   npm start
   ```

## 📁 Cấu trúc thư mục

```
backend/
├── src/
│   ├── middleware/          # Middleware functions
│   │   ├── auth.ts         # Authentication middleware
│   │   ├── validation.ts   # Input validation
│   │   ├── security.ts     # Security headers & protection
│   │   └── rateLimiter.ts  # Rate limiting
│   ├── routes/             # API routes
│   │   ├── admin.ts        # Admin endpoints
│   │   ├── blog.ts         # Blog posts
│   │   ├── candidates.ts   # Job applications
│   │   ├── contact.ts      # Contact form
│   │   ├── jobs.ts         # Job listings
│   │   ├── projects.ts     # Interior projects
│   │   ├── services.ts     # Company services
│   │   ├── team.ts         # Team members
│   │   └── upload.ts       # File uploads
│   ├── services/           # Business logic services
│   │   ├── email.ts        # Email service
│   │   ├── sanity.ts       # Sanity CMS client
│   │   └── pdfGenerator.ts # PDF generation
│   ├── utils/              # Utility functions
│   │   ├── helpers.ts      # Helper functions
│   │   └── logger.ts       # Logging system
│   └── index.ts            # Main server file
├── uploads/                # Uploaded files directory
├── logs/                   # Log files directory
├── package.json
├── tsconfig.json
└── README.md
```

## 🔗 API Endpoints

### Health Check
- `GET /health` - Check server status

### Contact & Forms
- `POST /api/contact` - Submit contact form
- `POST /api/quotes` - Request quote

### Jobs & Recruitment
- `GET /api/jobs` - Get job listings with filters
- `GET /api/jobs/:slug` - Get job details
- `GET /api/jobs/featured/list` - Get featured jobs
- `POST /api/candidates` - Submit job application
- `POST /api/applications/quick` - Quick job application

### Projects & Portfolio
- `GET /api/projects` - Get interior projects
- `GET /api/projects/:slug` - Get project details
- `GET /api/projects/featured` - Get featured projects

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:slug` - Get service details
- `GET /api/services/division/:division` - Get services by division

### Blog & Content
- `GET /api/blog` - Get blog posts
- `GET /api/blog/:slug` - Get post details
- `GET /api/blog/featured/list` - Get featured posts

### Team
- `GET /api/team` - Get team members
- `GET /api/team/:slug` - Get team member details
- `GET /api/team/featured/list` - Get featured team members

### File Upload
- `POST /api/upload/single` - Upload single file
- `POST /api/upload/multiple` - Upload multiple files
- `POST /api/upload/cv` - Upload CV file
- `DELETE /api/upload/:filename` - Delete uploaded file

### Admin (Authentication required)
- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET /api/admin/submissions` - Get form submissions
- `PATCH /api/admin/jobs/:id/status` - Update job status
- `POST /api/admin/jobs` - Create new job
- `POST /api/admin/email/candidates` - Email candidates

## 🔐 Authentication

API endpoints admin require JWT authentication. Include token in header:
```
Authorization: Bearer <your-jwt-token>
```

## 📝 Validation

Tất cả API endpoints đều được validate với Zod schemas. Ví dụ:

```typescript
// Contact form validation
const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  subject: z.string().min(5),
  message: z.string().min(10),
});
```

## 🔒 Security Features

- **Rate Limiting**: Giới hạn requests theo từng endpoint
- **CORS Protection**: Chỉ cho phép origins được chỉ định
- **Security Headers**: Helmet.js cho bảo mật
- **Input Validation**: Zod schemas cho tất cả inputs
- **XSS Protection**: Sanitize inputs
- **SQL Injection Prevention**: Basic protection
- **File Upload Security**: Validate file types và sizes

## 📧 Email Templates

System hỗ trợ các email templates sau:

- **Contact Form Notification**: Thông báo cho admin khi có liên hệ mới
- **Auto-reply**: Tự động回复 cho khách hàng
- **Quote Request Notification**: Thông báo yêu cầu báo giá
- **Candidate Notification**: Thông báo ứng viên mới

## 📊 Logging

System sử dụng structured logging với các levels:
- `ERROR` - Errors và exceptions
- `WARN` - Security events và warnings
- `INFO` - General information và business events
- `DEBUG` - Detailed debugging information

Logs được lưu trong file và console.

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run with coverage
npm run test:coverage
```

## 📦 Deployment

### Environment Variables cho Production:
```env
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://yourdomain.com

# Sanity CMS
SANITY_PROJECT_ID=your-production-project-id
SANITY_DATASET=production
SANITY_API_TOKEN=your-production-api-token

# Email
SMTP_HOST=your-smtp-server
SMTP_PORT=587
SMTP_USER=your-production-email
SMTP_PASS=your-production-password

# Security
JWT_SECRET=your-super-secure-jwt-secret-for-production
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=WARN
LOG_FILE=/var/log/vietbuild/app.log
```

### Docker Deployment:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/ ./dist/
EXPOSE 3001
CMD ["node", "dist/index.js"]
```

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push branch: `git push origin feature/new-feature`
5. Submit pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

- **Email**: support@vietbuildgroup.vn
- **Hotline**: 1900 1234
- **Website**: https://vietbuildgroup.vn