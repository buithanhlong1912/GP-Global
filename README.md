# VIETBUILD GROUP - Website Demo

Website demo hoàn chỉnh cho công ty hoạt động trong 2 lĩnh vực:
- **Thiết kế & Thi công Nội thất** (showroom, nhà hàng, ALU, CNC, bảng hiệu...)
- **Cung ứng Nhân sự & Giới thiệu việc làm** (kho vận, logistics, lao động...)

## 🚀 Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **Framer Motion** (animations)
- **Lucide React** (icons)
- **Sanity Client** (CMS integration)

### CMS
- **Sanity Studio** (headless CMS)
- Custom schemas cho: Dự án, Việc làm, Ứng viên, Bài viết, Dịch vụ, v.v.

### Backend API
- **Node.js / Express**
- **TypeScript**
- **Sanity Client** (data mutations)
- **Nodemailer** (email notifications)
- **Express Validator** (validation)
- **Rate Limiting & Security**

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

