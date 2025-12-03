import { Metadata } from "next";
import Link from "next/link";
import { Section, Container, SectionHeader, Badge, Card, Button } from "@/components/ui";
import { Calendar, User, ArrowRight, Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "Tin tức",
  description: "Tin tức, bài viết mới nhất về thiết kế nội thất, tư vấn nghề nghiệp và các hoạt động của VIETBUILD GROUP.",
};

// Dummy blog posts
const posts = [
  {
    id: "1",
    title: "Xu hướng thiết kế nội thất showroom 2024",
    excerpt:
      "Khám phá những xu hướng thiết kế showroom mới nhất giúp tăng trải nghiệm khách hàng và doanh số.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=500&fit=crop",
    category: "interior-tips",
    author: "Nguyễn Văn A",
    publishedAt: "2024-03-15",
    readTime: "5 phút",
  },
  {
    id: "2",
    title: "5 kỹ năng cần thiết cho nhân viên kho vận",
    excerpt:
      "Những kỹ năng quan trọng giúp bạn phát triển sự nghiệp trong ngành logistics và kho vận.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=500&fit=crop",
    category: "career-advice",
    author: "Trần Thị B",
    publishedAt: "2024-03-12",
    readTime: "4 phút",
  },
  {
    id: "3",
    title: "VIETBUILD GROUP mở rộng thị trường miền Bắc",
    excerpt:
      "Công ty chính thức khai trương chi nhánh Hà Nội, mở rộng phạm vi hoạt động ra toàn quốc.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop",
    category: "company-news",
    author: "Ban Truyền thông",
    publishedAt: "2024-03-10",
    readTime: "3 phút",
  },
  {
    id: "4",
    title: "Tối ưu không gian café với thiết kế tối giản",
    excerpt:
      "Hướng dẫn thiết kế quán café theo phong cách minimalism vừa đẹp vừa tiết kiệm chi phí.",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=500&fit=crop",
    category: "interior-tips",
    author: "Lê Văn C",
    publishedAt: "2024-03-08",
    readTime: "6 phút",
  },
  {
    id: "5",
    title: "Thị trường lao động 2024: Cơ hội và thách thức",
    excerpt:
      "Phân tích xu hướng tuyển dụng và những ngành nghề có nhu cầu cao trong năm 2024.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=500&fit=crop",
    category: "industry-insights",
    author: "Phạm Thị D",
    publishedAt: "2024-03-05",
    readTime: "7 phút",
  },
  {
    id: "6",
    title: "Bảng hiệu LED: Lựa chọn và bảo trì đúng cách",
    excerpt:
      "Hướng dẫn chọn loại bảng hiệu LED phù hợp và cách bảo trì để kéo dài tuổi thọ.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop",
    category: "interior-tips",
    author: "Nguyễn Văn A",
    publishedAt: "2024-03-01",
    readTime: "5 phút",
  },
];

const categories = [
  { id: "all", label: "Tất cả" },
  { id: "interior-tips", label: "Mẹo nội thất" },
  { id: "career-advice", label: "Tư vấn nghề nghiệp" },
  { id: "company-news", label: "Tin công ty" },
  { id: "industry-insights", label: "Insights ngành" },
];

const categoryLabels: Record<string, string> = {
  "interior-tips": "Mẹo nội thất",
  "career-advice": "Tư vấn nghề nghiệp",
  "company-news": "Tin công ty",
  "industry-insights": "Insights ngành",
};

export default function NewsPage() {
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1a365d] to-[#2b4c7e] py-16">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">
              Tin Tức & Bài Viết
            </h1>
            <p className="text-xl text-white/80">
              Cập nhật xu hướng mới nhất về thiết kế nội thất và thị trường nhân sự
            </p>
          </div>
        </Container>
      </section>

      {/* Categories */}
      <Section padding="sm" className="border-b">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-[#1a365d] hover:text-white transition-colors"
            >
              {cat.label}
            </button>
          ))}
        </div>
      </Section>

      {/* Featured Post */}
      <Section padding="lg">
        <Link href={`/tin-tuc/${featuredPost.id}`} className="group block">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <Badge
                variant="interior"
                className="absolute top-4 left-4"
              >
                {categoryLabels[featuredPost.category]}
              </Badge>
            </div>
            <div>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {featuredPost.publishedAt}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {featuredPost.author}
                </span>
                <span>{featuredPost.readTime} đọc</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 font-heading mb-4 group-hover:text-[#1a365d] transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-gray-600 text-lg mb-6">{featuredPost.excerpt}</p>
              <span className="inline-flex items-center gap-2 text-[#1a365d] font-semibold group-hover:gap-3 transition-all">
                Đọc tiếp
                <ArrowRight className="w-5 h-5" />
              </span>
            </div>
          </div>
        </Link>
      </Section>

      {/* Other Posts Grid */}
      <Section variant="gray" padding="xl">
        <SectionHeader
          subtitle="Bài viết mới"
          title="Khám Phá Thêm"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherPosts.map((post) => (
            <Link key={post.id} href={`/tin-tuc/${post.id}`} className="group">
              <Card variant="interactive" padding="none" className="h-full overflow-hidden">
                <div className="relative aspect-video">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge
                    variant={post.category === "career-advice" ? "staffing" : "interior"}
                    className="absolute top-4 left-4"
                    size="sm"
                  >
                    {categoryLabels[post.category]}
                  </Badge>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span>{post.publishedAt}</span>
                    <span>•</span>
                    <span>{post.readTime} đọc</span>
                  </div>
                  <h3 className="font-bold text-gray-900 font-heading mb-2 group-hover:text-[#1a365d] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" size="lg">
            Xem thêm bài viết
          </Button>
        </div>
      </Section>

      {/* Newsletter */}
      <Section variant="interior" padding="lg">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">
            Đăng ký nhận tin
          </h2>
          <p className="text-white/80 mb-6">
            Nhận bài viết mới nhất và thông tin tuyển dụng qua email
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Email của bạn"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a962]"
            />
            <Button variant="interior">Đăng ký</Button>
          </div>
        </div>
      </Section>
    </>
  );
}

