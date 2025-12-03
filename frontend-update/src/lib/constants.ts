// Company Information
export const COMPANY_INFO = {
  name: "VIETBUILD GROUP",
  shortName: "VBG",
  slogan: "Xây Dựng Không Gian - Kết Nối Nhân Tài",
  description:
    "Công ty hàng đầu Việt Nam trong lĩnh vực thiết kế thi công nội thất và cung ứng nhân sự chất lượng cao.",
  founded: 2015,
  employees: "500+",
  projects: "1000+",
  partners: "200+",
  address: "Tầng 15, Tòa nhà Landmark 81, Vinhomes Central Park, Bình Thạnh, TP.HCM",
  phone: "0901 234 567",
  hotline: "1900 1234",
  email: "info@vietbuildgroup.vn",
  website: "https://vietbuildgroup.vn",
  taxId: "0123456789",
  businessLicense: "GP-01234/TCT-ĐKKD",
};

// Social Links
export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/vietbuildgroup",
  zalo: "https://zalo.me/vietbuildgroup",
  linkedin: "https://linkedin.com/company/vietbuildgroup",
  youtube: "https://youtube.com/@vietbuildgroup",
  tiktok: "https://tiktok.com/@vietbuildgroup",
};

// Contact Info
export const CONTACT_INFO = {
  zaloOA: "https://zalo.me/0901234567",
  messenger: "https://m.me/vietbuildgroup",
  whatsapp: "https://wa.me/84901234567",
};

// Navigation - Interior Division
export const INTERIOR_NAV = [
  {
    label: "Giới thiệu",
    href: "/noi-that/gioi-thieu",
  },
  {
    label: "Dịch vụ",
    href: "/noi-that/dich-vu",
    children: [
      { label: "Thiết kế nội thất trọn gói", href: "/noi-that/dich-vu/thiet-ke-tron-goi" },
      { label: "Thi công ALU", href: "/noi-that/dich-vu/thi-cong-alu" },
      { label: "Gia công CNC", href: "/noi-that/dich-vu/gia-cong-cnc" },
      { label: "Bảng hiệu & Signage", href: "/noi-that/dich-vu/bang-hieu-signage" },
      { label: "Quầy bar & Cafe", href: "/noi-that/dich-vu/quay-bar-cafe" },
      { label: "Showroom & Cửa hàng", href: "/noi-that/dich-vu/showroom-cua-hang" },
      { label: "Nhà hàng & F&B", href: "/noi-that/dich-vu/nha-hang-fb" },
    ],
  },
  {
    label: "Dự án",
    href: "/noi-that/du-an",
  },
  {
    label: "Báo giá",
    href: "/noi-that/bao-gia",
  },
];

// Navigation - Staffing Division
export const STAFFING_NAV = [
  {
    label: "Việc làm",
    href: "/nhan-su/viec-lam",
    children: [
      { label: "Tất cả việc làm", href: "/nhan-su/viec-lam" },
      { label: "Kho vận & Logistics", href: "/nhan-su/viec-lam?category=logistics" },
      { label: "Sản xuất", href: "/nhan-su/viec-lam?category=san-xuat" },
      { label: "Lao động phổ thông", href: "/nhan-su/viec-lam?category=lao-dong-pho-thong" },
      { label: "Bán hàng & Marketing", href: "/nhan-su/viec-lam?category=ban-hang" },
    ],
  },
  {
    label: "Doanh nghiệp",
    href: "/nhan-su/doanh-nghiep",
  },
  {
    label: "Ứng viên",
    href: "/nhan-su/ung-vien",
    children: [
      { label: "Đăng ký ứng viên", href: "/nhan-su/dang-ky" },
      { label: "Quy trình tuyển dụng", href: "/nhan-su/quy-trinh" },
      { label: "Đội ngũ nhân viên", href: "/nhan-su/doi-ngu" },
    ],
  },
];

// Main Navigation
export const MAIN_NAV = [
  { label: "Trang chủ", href: "/" },
  {
    label: "Nội thất",
    href: "/noi-that",
    children: INTERIOR_NAV,
  },
  {
    label: "Nhân sự",
    href: "/nhan-su",
    children: STAFFING_NAV,
  },
  { label: "Tin tức", href: "/tin-tuc" },
  { label: "Liên hệ", href: "/lien-he" },
];

// Interior Service Categories
export const INTERIOR_SERVICES = [
  {
    id: "thiet-ke-tron-goi",
    title: "Thiết kế & Thi công trọn gói",
    description: "Dịch vụ thiết kế và thi công nội thất hoàn chỉnh từ A-Z",
    icon: "Palette",
    image: "/images/services/interior-design.jpg",
  },
  {
    id: "thi-cong-alu",
    title: "Thi công ALU",
    description: "Sản xuất và lắp đặt các sản phẩm từ nhôm Aluminum cao cấp",
    icon: "Layers",
    image: "/images/services/alu.jpg",
  },
  {
    id: "gia-cong-cnc",
    title: "Gia công CNC",
    description: "Gia công cắt laser, CNC chính xác cao theo yêu cầu",
    icon: "Settings",
    image: "/images/services/cnc.jpg",
  },
  {
    id: "bang-hieu-signage",
    title: "Bảng hiệu & Signage",
    description: "Thiết kế và thi công bảng hiệu quảng cáo chuyên nghiệp",
    icon: "Signpost",
    image: "/images/services/signage.jpg",
  },
  {
    id: "quay-bar-cafe",
    title: "Quầy Bar & Cafe",
    description: "Thiết kế thi công quầy bar, quầy cafe độc đáo",
    icon: "Coffee",
    image: "/images/services/bar.jpg",
  },
  {
    id: "showroom-cua-hang",
    title: "Showroom & Cửa hàng",
    description: "Thi công showroom, cửa hàng bán lẻ hiện đại",
    icon: "Store",
    image: "/images/services/showroom.jpg",
  },
];

// Job Categories
export const JOB_CATEGORIES = [
  {
    id: "logistics",
    title: "Kho vận & Logistics",
    icon: "Package",
    count: 45,
  },
  {
    id: "san-xuat",
    title: "Sản xuất",
    icon: "Factory",
    count: 32,
  },
  {
    id: "lao-dong-pho-thong",
    title: "Lao động phổ thông",
    icon: "Users",
    count: 78,
  },
  {
    id: "ban-hang",
    title: "Bán hàng & Marketing",
    icon: "ShoppingBag",
    count: 23,
  },
  {
    id: "van-phong",
    title: "Văn phòng",
    icon: "Building",
    count: 15,
  },
  {
    id: "ky-thuat",
    title: "Kỹ thuật",
    icon: "Wrench",
    count: 28,
  },
];

// Employment Types
export const EMPLOYMENT_TYPES = [
  { id: "full-time", label: "Toàn thời gian" },
  { id: "part-time", label: "Bán thời gian" },
  { id: "contract", label: "Hợp đồng" },
  { id: "temporary", label: "Thời vụ" },
  { id: "intern", label: "Thực tập" },
];

// Locations
export const LOCATIONS = [
  { id: "hcm", label: "TP. Hồ Chí Minh" },
  { id: "hn", label: "Hà Nội" },
  { id: "dn", label: "Đà Nẵng" },
  { id: "bd", label: "Bình Dương" },
  { id: "dn-province", label: "Đồng Nai" },
  { id: "other", label: "Khác" },
];

// Why Choose Us - 6 Reasons
export const WHY_CHOOSE_US = [
  {
    id: 1,
    title: "Kinh nghiệm 10+ năm",
    description: "Đội ngũ chuyên gia với hơn 10 năm kinh nghiệm trong ngành",
    icon: "Award",
  },
  {
    id: 2,
    title: "1000+ Dự án hoàn thành",
    description: "Đã triển khai thành công hơn 1000 dự án lớn nhỏ trên toàn quốc",
    icon: "CheckCircle",
  },
  {
    id: 3,
    title: "Giá cả cạnh tranh",
    description: "Cam kết mức giá tốt nhất với chất lượng vượt trội",
    icon: "PiggyBank",
  },
  {
    id: 4,
    title: "Bảo hành dài hạn",
    description: "Chế độ bảo hành lên đến 5 năm cho mọi công trình",
    icon: "Shield",
  },
  {
    id: 5,
    title: "Đội ngũ chuyên nghiệp",
    description: "500+ nhân viên được đào tạo bài bản, nhiệt huyết",
    icon: "Users",
  },
  {
    id: 6,
    title: "Hỗ trợ 24/7",
    description: "Đường dây nóng hỗ trợ khách hàng 24/7 mọi lúc mọi nơi",
    icon: "Headphones",
  },
];

// Partners (Dummy)
export const PARTNERS = [
  { id: 1, name: "Vingroup", logo: "/images/partners/vingroup.png" },
  { id: 2, name: "FPT", logo: "/images/partners/fpt.png" },
  { id: 3, name: "Samsung", logo: "/images/partners/samsung.png" },
  { id: 4, name: "LG", logo: "/images/partners/lg.png" },
  { id: 5, name: "Panasonic", logo: "/images/partners/panasonic.png" },
  { id: 6, name: "Honda", logo: "/images/partners/honda.png" },
  { id: 7, name: "Toyota", logo: "/images/partners/toyota.png" },
  { id: 8, name: "Coca Cola", logo: "/images/partners/cocacola.png" },
];

// SEO Defaults
export const SEO_DEFAULTS = {
  siteName: "VIETBUILD GROUP",
  defaultTitle: "VIETBUILD GROUP - Thiết kế Nội thất & Cung ứng Nhân sự",
  defaultDescription:
    "Công ty hàng đầu Việt Nam chuyên thiết kế thi công nội thất (ALU, CNC, bảng hiệu, showroom) và cung ứng nhân sự chất lượng cao (kho vận, logistics, lao động).",
  defaultKeywords:
    "thiết kế nội thất, thi công nội thất, ALU, CNC, bảng hiệu, cung ứng nhân sự, tuyển dụng, việc làm, kho vận, logistics",
  siteUrl: "https://vietbuildgroup.vn",
  ogImage: "/images/og-image.jpg",
  twitterHandle: "@vietbuildgroup",
  locale: "vi_VN",
};

