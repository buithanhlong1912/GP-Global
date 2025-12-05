# 🏗️ VIETBUILD GROUP - Complete Business Platform

> **Thiết kế Nội thất & Cung ứng Nhân sự Chuyên nghiệp**

A comprehensive business platform built for VIETBUILD GROUP, specializing in interior design/construction and workforce supply/services. This is a production-ready, scalable system built with modern web technologies.

## ✨ Key Features

### 🎨 **Interior Design Division**
- **Showroom Design & Construction**
- **Restaurant & Cafe Interior**
- **Office & Retail Spaces**
- **ALU & Aluminum Solutions**
- **CNC Manufacturing**
- **Signage & Branding**
- **Bar Counters & Custom Furniture**
- **Project Portfolio Gallery**

### 👥 **Workforce Supply Division**
- **Temporary Staffing Solutions**
- **Warehouse & Logistics Personnel**
- **Manufacturing Workers**
- **General Labor Services**
- **Job Search & Application System**
- **Candidate Management**
- **Staff Training & Placement**

### 🛠️ **Technical Features**
- **Dual-Business Support** - Handle both interior and staffing operations
- **Content Management** - Full Sanity CMS integration
- **Real-time Updates** - Live content synchronization
- **Mobile Responsive** - Works perfectly on all devices
- **SEO Optimized** - Built for search engine visibility
- **High Performance** - Fast loading with global CDN
- **Secure & Reliable** - Enterprise-grade security
- **Email Notifications** - Automated communication system
- **File Management** - Secure document uploads
- **Admin Dashboard** - Complete management interface

## 🏛️ System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│   Frontend      │◄──►│   Sanity CMS    │◄──►│   Backend API   │
│   (Next.js)     │    │   (Content)     │    │   (Node.js)     │
│                 │    │                 │    │                 │
│ • Modern UI/UX  │    │ • Headless CMS  │    │ • REST API      │
│ • SEO Optimized │    │ • Real-time     │    │ • File Upload   │
│ • Mobile First  │    │ • Image CDN     │    │ • Email Service │
│ • Performance   │    │ • Collaboration│    │ • Validation    │
│ • Components    │    │ • Version Ctrl  │    │ • Security      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+
- Git
- Modern code editor (VS Code recommended)

### **🎯 5-Minute Setup**

```bash
# 1. Clone repository
git clone <your-repo-url>
cd demo-personal-prj

# 2. Install all dependencies
npm run setup:all

# 3. Configure environment (interactive)
npm run setup:env

# 4. Start all services
npm run dev:all

# 5. Open in browser
# Frontend: http://localhost:3000
# Backend API: http://localhost:3001/health
# Sanity Studio: http://localhost:3333
```

### **📋 What You'll Need**

#### **Required Services**
1. **Sanity.io** - Headless CMS ($99-399/month)
2. **Cloudflare** - Hosting & CDN ($20-200/month)
3. **Email Service** - SendGrid or Gmail ($15-50/month)
4. **Domain** - Custom domain name ($12-25/year)

#### **Setup Time**
- **Development**: 15-30 minutes
- **Production**: 2-4 hours

## 🛠️ Technology Stack

### **Frontend Technologies**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **React Hook Form** - Form handling with validation
- **React Query** - Data fetching and caching
- **Zustand** - Lightweight state management

### **Backend Technologies**
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe server-side code
- **Sanity Client** - Headless CMS integration
- **Nodemailer** - Email sending service
- **Multer** - File upload handling
- **JWT** - Authentication tokens
- **Zod** - Runtime type validation

### **Infrastructure & Services**
- **Sanity.io** - Headless CMS and content platform
- **Cloudflare** - Global CDN, hosting, and security
- **SendGrid** - Email delivery service
- **Google Workspace** - Business email and collaboration

## 📁 Cấu trúc dự án

```
demo-personal-prj/
├── frontend/                   # Next.js Frontend
│   ├── src/
│   │   ├── app/               # App Router pages
│   │   │   ├── page.tsx       # Home page
│   │   │   ├── noi-that/      # Interior division pages
│   │   │   ├── nhan-su/       # Staffing division pages
│   │   │   ├── tin-tuc/       # News/Blog pages
│   │   │   └── lien-he/       # Contact page
│   │   ├── components/
│   │   │   ├── ui/            # Reusable UI components
│   │   │   ├── layout/        # Header, Footer, etc.
│   │   │   └── sections/      # Page sections
│   │   ├── lib/               # Utilities & configs
│   │   └── types/             # TypeScript types
│   └── package.json
│
├── sanity-studio/             # Sanity CMS
│   ├── schemas/               # Content schemas
│   │   ├── project.ts         # Interior projects
│   │   ├── job.ts             # Job listings
│   │   ├── candidate.ts       # Job candidates
│   │   ├── post.ts            # Blog posts
│   │   ├── service.ts         # Services
│   │   └── ...
│   └── sanity.config.ts
│
├── backend/                   # Express API
│   ├── src/
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic
│   │   └── index.ts           # Server entry
│   └── package.json
│
└── README.md
```

## 🏃‍♂️ Quick Start

### 1. Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Mở http://localhost:3000

### 2. Sanity Studio

```bash
cd sanity-studio
npm install
npm run dev
```

Mở http://localhost:3333

### 3. Backend API

```bash
cd backend
npm install
npm run dev
```

API chạy tại http://localhost:3001

## 📄 Cấu trúc Pages

### Home (/)
- Dual-segment Hero Banner (Nội thất + Nhân sự)
- Giới thiệu công ty
- 6 Lý do chọn chúng tôi
- Dịch vụ tổng quan
- Dự án + Việc làm nổi bật
- Đối tác
- Form liên hệ

### Nội thất (/noi-that)
- `/noi-that` - Trang giới thiệu
- `/noi-that/du-an` - Gallery dự án
- `/noi-that/dich-vu/[slug]` - Chi tiết dịch vụ
- `/noi-that/bao-gia` - Form yêu cầu báo giá

### Nhân sự (/nhan-su)
- `/nhan-su` - Trang giới thiệu
- `/nhan-su/viec-lam` - Danh sách việc làm (search, filters)
- `/nhan-su/viec-lam/[slug]` - Chi tiết việc làm
- `/nhan-su/dang-ky` - Đăng ký ứng viên
- `/nhan-su/doanh-nghiep` - Dành cho doanh nghiệp

### Khác
- `/tin-tuc` - Blog/Tin tức
- `/lien-he` - Liên hệ

## 🎨 Design System

### Colors
```css
/* Interior Division */
--interior-primary: #1a365d;   /* Navy Blue */
--interior-accent: #c9a962;    /* Gold */

/* Staffing Division */
--staffing-primary: #065f46;   /* Green */
--staffing-accent: #34d399;    /* Light Green */
```

### Components
- `Button` - Multiple variants (primary, interior, staffing, outline, ghost)
- `Card` - Elevated, interactive, outlined styles
- `Badge` - Status badges với màu theo division
- `Input` - Form inputs với validation
- `Section` - Layout sections với container
- `Container` - Responsive max-width container

## 📊 Sanity CMS Schemas

| Schema | Mô tả |
|--------|-------|
| `project` | Dự án nội thất |
| `job` | Việc làm |
| `candidate` | Ứng viên |
| `post` | Bài viết |
| `service` | Dịch vụ |
| `contactSubmission` | Form liên hệ |
| `quoteRequest` | Yêu cầu báo giá |
| `partner` | Đối tác |
| `teamMember` | Đội ngũ |
| `companyDocument` | Tài liệu công ty |
| `siteSettings` | Cài đặt website |

## 🔌 API Endpoints

### Contact
- `POST /api/contact` - Submit contact form
- `POST /api/contact/quote` - Submit quote request

### Jobs
- `GET /api/jobs` - List jobs (filters, search, pagination)
- `GET /api/jobs/:slug` - Job detail
- `GET /api/jobs/meta/categories` - Job categories with count
- `GET /api/jobs/featured/list` - Hot & Urgent jobs

### Projects
- `GET /api/projects` - List projects
- `GET /api/projects/:slug` - Project detail
- `GET /api/projects/featured/list` - Featured projects

### Candidates
- `POST /api/candidates/register` - Register candidate
- `POST /api/candidates/apply` - Apply for job

## 🔒 SEO Features

- Meta tags (title, description, keywords)
- Open Graph tags
- Twitter Cards
- JSON-LD Structured Data (Organization)
- Sitemap ready
- Semantic HTML
- Mobile-first responsive design

## 📱 Mobile Features

- Click-to-call button
- Floating chat buttons (Zalo, Messenger)
- Mobile bottom navigation bar
- Responsive navigation menu
- Touch-friendly UI

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel deploy
```

### Sanity Studio
```bash
cd sanity-studio
sanity deploy
```

### Backend (Cloudflare Workers / Railway)
```bash
cd backend
npm run build
# Deploy to your preferred platform
```

## 📝 Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Backend (.env)
```
PORT=3001
NODE_ENV=development
SANITY_PROJECT_ID=your-project-id
SANITY_DATASET=production
SANITY_API_TOKEN=your-token
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email
SMTP_PASS=your-password
ADMIN_EMAIL=admin@company.vn
FRONTEND_URL=http://localhost:3000
```

## 📄 License

MIT License - Feel free to use for your projects.

---

**VIETBUILD GROUP** - Thiết kế Nội thất & Cung ứng Nhân sự

