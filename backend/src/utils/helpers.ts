// String utilities
export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

// Generate random string
export const generateRandomString = (length: number = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Generate unique ID
export const generateUniqueId = (prefix: string = ''): string => {
  const timestamp = Date.now().toString(36);
  const randomStr = generateRandomString(6);
  return prefix ? `${prefix}_${timestamp}_${randomStr}` : `${timestamp}_${randomStr}`;
};

// Format currency
export const formatCurrency = (amount: number | string, currency: string = 'VND'): string => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(numAmount)) return '0';

  if (currency === 'VND') {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(numAmount);
  } else {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(numAmount);
  }
};

// Format date
export const formatDate = (date: string | Date, format: string = 'DD/MM/YYYY'): string => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();

  switch (format) {
    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`;
    case 'MM/DD/YYYY':
      return `${month}/${day}/${year}`;
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    case 'DD-MM-YYYY':
      return `${day}-${month}-${year}`;
    default:
      return d.toLocaleDateString('vi-VN');
  }
};

// Format relative time
export const formatRelativeTime = (date: string | Date): string => {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSeconds < 60) return 'vừa xong';
  if (diffMinutes < 60) return `${diffMinutes} phút trước`;
  if (diffHours < 24) return `${diffHours} giờ trước`;
  if (diffDays < 7) return `${diffDays} ngày trước`;
  if (diffWeeks < 4) return `${diffWeeks} tuần trước`;
  if (diffMonths < 12) return `${diffMonths} tháng trước`;
  return `${diffYears} năm trước`;
};

// Sanitize phone number
export const sanitizePhoneNumber = (phone: string): string => {
  return phone.replace(/[^0-9+]/g, '').replace(/^84/, '0');
};

// Validate Vietnamese phone number
export const isValidVietnamesePhone = (phone: string): boolean => {
  const sanitized = sanitizePhoneNumber(phone);
  const phoneRegex = /^(0[3-9][0-9]{8})$/;
  return phoneRegex.test(sanitized);
};

// Extract file extension
export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

// Check if file is image
export const isImageFile = (filename: string): boolean => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
  return imageExtensions.includes(getFileExtension(filename));
};

// Check if file is document
export const isDocumentFile = (filename: string): boolean => {
  const docExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];
  return docExtensions.includes(getFileExtension(filename));
};

// Paginate array
export const paginate = <T>(array: T[], page: number, limit: number): {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
} => {
  const total = array.length;
  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;
  const data = array.slice(offset, offset + limit);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    }
  };
};

// Generate excerpt
export const generateExcerpt = (text: string, maxLength: number = 150): string => {
  if (text.length <= maxLength) return text;
  const excerpt = text.substring(0, maxLength);
  const lastSpace = excerpt.lastIndexOf(' ');
  return lastSpace > 0 ? excerpt.substring(0, lastSpace) + '...' : excerpt + '...';
};

// Clean HTML tags
export const stripHtmlTags = (html: string): string => {
  return html.replace(/<[^>]*>/g, '');
};

// Truncate text
export const truncateText = (text: string, maxLength: number, suffix: string = '...'): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length) + suffix;
};

// Deep clone object
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

// Remove null and undefined values from object
export const removeEmptyValues = <T extends Record<string, any>>(obj: T): Partial<T> => {
  const result: Partial<T> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== null && value !== undefined && value !== '') {
      result[key as keyof T] = value;
    }
  }
  return result;
};

// Capitalize first letter
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Convert to title case
export const toTitleCase = (str: string): string => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

// Generate SEO-friendly URL
export const generateSeoUrl = (title: string, id?: string): string => {
  const slug = slugify(title);
  return id ? `${slug}-${id}` : slug;
};

// Generate meta description
export const generateMetaDescription = (content: string, maxLength: number = 160): string => {
  const cleanContent = stripHtmlTags(content);
  return generateExcerpt(cleanContent, maxLength);
};

// Calculate reading time
export const calculateReadingTime = (content: string, wordsPerMinute: number = 200): number => {
  const cleanContent = stripHtmlTags(content);
  const wordCount = cleanContent.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// URL validation
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Check if string contains Vietnamese characters
export const containsVietnamese = (text: string): boolean => {
  const vietnameseRegex = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
  return vietnameseRegex.test(text);
};

// Normalize Vietnamese string for search
export const normalizeVietnamese = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
    .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
    .replace(/[ìíịỉĩ]/g, 'i')
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
    .replace(/[ùúụủũưừứựửữ]/g, 'u')
    .replace(/[ỳýỵỷỹ]/g, 'y')
    .replace(/đ/g, 'd');
};