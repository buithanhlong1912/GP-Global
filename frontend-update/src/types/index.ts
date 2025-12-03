// Base types
export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt?: string;
  _updatedAt?: string;
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  caption?: string;
}

export interface SanitySlug {
  _type: "slug";
  current: string;
}

export interface SanityFile {
  _type: "file";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

// Interior Division Types
export interface Project extends SanityDocument {
  title: string;
  slug: SanitySlug;
  description: string;
  content?: unknown[]; // Portable Text
  category: ProjectCategory;
  images: SanityImage[];
  completedDate: string;
  client: string;
  location: string;
  area?: string;
  duration?: string;
  testimonial?: Testimonial;
}

export type ProjectCategory =
  | "showroom"
  | "restaurant"
  | "cafe"
  | "office"
  | "retail"
  | "residential"
  | "signage"
  | "other";

export interface Service extends SanityDocument {
  title: string;
  slug: SanitySlug;
  shortDescription: string;
  description?: unknown[]; // Portable Text
  features?: string[];
  icon: string;
  image: SanityImage;
  gallery?: SanityImage[];
  division: "interior" | "staffing";
  pricing?: PricingTier[];
  order: number;
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

// Staffing Division Types
export interface Job extends SanityDocument {
  title: string;
  slug: SanitySlug;
  company: string;
  location: string;
  salary: SalaryRange;
  employmentType: EmploymentType;
  category: JobCategory;
  description: string;
  requirements: string[];
  benefits?: string[];
  publishedAt: string;
  deadline?: string;
  status: "active" | "closed" | "draft";
  isHot?: boolean;
  isUrgent?: boolean;
  contactInfo?: ContactInfo;
}

export interface SalaryRange {
  min?: number;
  max?: number;
  currency: string;
  period: "hour" | "day" | "month" | "year";
  negotiable?: boolean;
}

export type EmploymentType =
  | "full-time"
  | "part-time"
  | "contract"
  | "temporary"
  | "intern";

export type JobCategory =
  | "logistics"
  | "production"
  | "general-labor"
  | "sales"
  | "office"
  | "technical"
  | "other";

export interface Candidate extends SanityDocument {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other";
  address?: string;
  avatar?: SanityImage;
  resume?: SanityFile;
  experience: string;
  education?: string;
  skills: string[];
  desiredPosition: string;
  desiredSalary?: number;
  desiredLocation?: string;
  availability: "immediate" | "2weeks" | "1month" | "negotiable";
  status: "active" | "placed" | "inactive";
  notes?: string;
}

export interface JobApplication extends SanityDocument {
  job: {
    _ref: string;
    _type: "reference";
  };
  candidate?: {
    _ref: string;
    _type: "reference";
  };
  fullName: string;
  email: string;
  phone: string;
  coverLetter?: string;
  resume?: SanityFile;
  status: "new" | "reviewing" | "interviewed" | "accepted" | "rejected";
  appliedAt: string;
  notes?: string;
}

// Team & Staff Types
export interface TeamMember extends SanityDocument {
  name: string;
  position: string;
  image?: SanityImage;
  bio?: string;
  skills?: string[];
  experience?: string;
  division?: "interior" | "staffing" | "both";
  order: number;
}

// Blog Types
export interface Post extends SanityDocument {
  title: string;
  slug: SanitySlug;
  excerpt: string;
  content: unknown[]; // Portable Text
  mainImage: SanityImage;
  category: PostCategory;
  author: Author;
  publishedAt: string;
  tags?: string[];
  relatedPosts?: Post[];
}

export type PostCategory =
  | "interior-tips"
  | "career-advice"
  | "company-news"
  | "industry-insights";

export interface Author extends SanityDocument {
  name: string;
  image?: SanityImage;
  bio?: string;
}

// Testimonials & Reviews
export interface Testimonial extends SanityDocument {
  name: string;
  position?: string;
  company?: string;
  content: string;
  image?: SanityImage;
  rating: 1 | 2 | 3 | 4 | 5;
  division?: "interior" | "staffing";
}

// Partners
export interface Partner extends SanityDocument {
  name: string;
  logo: SanityImage;
  website?: string;
  order: number;
}

// Contact & Forms
export interface ContactInfo {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface ContactSubmission extends SanityDocument {
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject: string;
  message: string;
  source: "contact-form" | "quote-request" | "job-inquiry" | "business-inquiry";
  status: "new" | "in-progress" | "completed";
  submittedAt: string;
}

export interface QuoteRequest extends SanityDocument {
  name: string;
  email: string;
  phone: string;
  company?: string;
  projectType: string;
  budget?: string;
  area?: string;
  location: string;
  timeline?: string;
  description: string;
  attachments?: SanityFile[];
  status: "new" | "quoted" | "negotiating" | "confirmed" | "cancelled";
  submittedAt: string;
}

// Company Documents
export interface CompanyDocument extends SanityDocument {
  title: string;
  description?: string;
  file: SanityFile;
  category: "profile" | "license" | "certificate" | "brochure" | "other";
  order: number;
}

// Site Settings
export interface SiteSettings extends SanityDocument {
  title: string;
  description: string;
  logo: SanityImage;
  contactInfo: ContactInfo;
  socialLinks: {
    facebook?: string;
    zalo?: string;
    linkedin?: string;
    youtube?: string;
    tiktok?: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    defaultKeywords: string[];
    ogImage: SanityImage;
  };
}

// Frontend Component Props
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface HeroSlide {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  cta: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
}

export interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
  href: string;
}

export interface JobCard {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  employmentType: string;
  category: string;
  isHot?: boolean;
  isUrgent?: boolean;
  publishedAt: string;
  href: string;
}

export interface ProjectCard {
  id: string;
  title: string;
  category: string;
  image: string;
  location: string;
  href: string;
}

// Form Data Types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject: string;
  message: string;
}

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  projectType: string;
  budget?: string;
  area?: string;
  location: string;
  timeline?: string;
  description: string;
}

export interface JobApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  coverLetter?: string;
  resume?: File;
}

export interface CandidateRegistrationFormData {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  experience: string;
  education?: string;
  skills: string[];
  desiredPosition: string;
  desiredSalary?: string;
  desiredLocation?: string;
  availability: string;
  resume?: File;
}

