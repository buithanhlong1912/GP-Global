import { Metadata } from "next";
import Link from "next/link";
import { Section, Container, SectionHeader, Button, Badge, Card } from "@/components/ui";
import { JOB_CATEGORIES } from "@/lib/constants";
import {
  ArrowRight,
  Users,
  Briefcase,
  Building,
  CheckCircle,
  Clock,
  Shield,
  Award,
  Phone,
  Package,
  Factory,
  ShoppingBag,
  Wrench,
  UserPlus,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Cung ứng Nhân sự & Việc làm",
  description:
    "Dịch vụ cung ứng nhân sự chuyên nghiệp: kho vận, logistics, sản xuất, lao động phổ thông. Tìm việc làm với mức lương hấp dẫn.",
  keywords:
    "cung ứng nhân sự, tuyển dụng, việc làm, kho vận, logistics, lao động, outsourcing",
};

const iconMap: Record<string, React.ReactNode> = {
  Package: <Package className="w-8 h-8" />,
  Factory: <Factory className="w-8 h-8" />,
  Users: <Users className="w-8 h-8" />,
  ShoppingBag: <ShoppingBag className="w-8 h-8" />,
  Building: <Building className="w-8 h-8" />,
  Wrench: <Wrench className="w-8 h-8" />,
};

const stats = [
  { value: "500+", label: "Nhân viên", icon: <Users className="w-6 h-6" /> },
  { value: "200+", label: "Đối tác", icon: <Building className="w-6 h-6" /> },
  { value: "50+", label: "Việc mới/tuần", icon: <Briefcase className="w-6 h-6" /> },
  { value: "98%", label: "Hài lòng", icon: <Award className="w-6 h-6" /> },
];

export default function StaffingPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative min-h-[70vh] flex items-center bg-staffing-gradient overflow-hidden">
        <div className="absolute inset-0 bg-mesh-pattern opacity-30" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920)",
          }}
        />

        <Container className="relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <Badge variant="staffing" className="mb-6 bg-[#34d399] text-[#065f46]">
                <Users className="w-4 h-4 mr-1" />
                Nhân sự
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-6">
                Cung Ứng{" "}
                <span className="text-[#34d399]">Nhân Sự</span>
                <br />
                Chuyên Nghiệp
              </h1>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Giải pháp nhân sự toàn diện cho doanh nghiệp. Từ kho vận, logistics đến
                sản xuất - Chúng tôi cung cấp nguồn nhân lực chất lượng, nhanh chóng.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/nhan-su/viec-lam">
                  <Button
                    variant="staffing"
                    size="lg"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    Tìm việc ngay
                  </Button>
                </Link>
                <Link href="/nhan-su/doanh-nghiep">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-[#065f46]"
                  >
                    Dành cho Doanh nghiệp
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right - Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-3 bg-[#34d399] rounded-xl flex items-center justify-center text-[#065f46]">
                    {stat.icon}
                  </div>
                  <span className="block text-3xl font-bold text-white">
                    {stat.value}
                  </span>
                  <span className="text-white/70">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* For Who Section */}
      <Section padding="xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* For Job Seekers */}
          <Card
            variant="elevated"
            className="p-8 border-2 border-transparent hover:border-[#34d399] transition-colors"
          >
            <div className="w-16 h-16 bg-[#065f46]/10 rounded-2xl flex items-center justify-center mb-6">
              <UserPlus className="w-8 h-8 text-[#065f46]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 font-heading mb-4">
              Dành cho Người tìm việc
            </h2>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#34d399] flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">Hàng trăm việc làm mới mỗi ngày</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#34d399] flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">Lương hấp dẫn, trả đúng hạn</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#34d399] flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">Môi trường làm việc an toàn</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#34d399] flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">Hỗ trợ đào tạo kỹ năng</span>
              </li>
            </ul>
            <div className="flex gap-3">
              <Link href="/nhan-su/viec-lam">
                <Button variant="staffing" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Xem việc làm
                </Button>
              </Link>
              <Link href="/nhan-su/dang-ky">
                <Button variant="outline" className="border-[#065f46] text-[#065f46]">
                  Đăng ký ứng viên
                </Button>
              </Link>
            </div>
          </Card>

          {/* For Businesses */}
          <Card
            variant="elevated"
            className="p-8 bg-[#065f46] text-white"
          >
            <div className="w-16 h-16 bg-[#34d399] rounded-2xl flex items-center justify-center mb-6">
              <Building className="w-8 h-8 text-[#065f46]" />
            </div>
            <h2 className="text-2xl font-bold font-heading mb-4">
              Dành cho Doanh nghiệp
            </h2>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#34d399] flex-shrink-0 mt-0.5" />
                <span className="text-white/90">Cung ứng nhân sự nhanh chóng</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#34d399] flex-shrink-0 mt-0.5" />
                <span className="text-white/90">Nhân viên đã qua sàng lọc, đào tạo</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#34d399] flex-shrink-0 mt-0.5" />
                <span className="text-white/90">Chi phí linh hoạt, tối ưu</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#34d399] flex-shrink-0 mt-0.5" />
                <span className="text-white/90">Hỗ trợ quản lý, thay thế miễn phí</span>
              </li>
            </ul>
            <div className="flex gap-3">
              <Link href="/nhan-su/doanh-nghiep">
                <Button
                  variant="staffing"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Tìm hiểu thêm
                </Button>
              </Link>
              <Link href="/lien-he">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#065f46]"
                >
                  Liên hệ
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </Section>

      {/* Job Categories */}
      <Section variant="gray" padding="xl">
        <SectionHeader
          subtitle="Lĩnh vực tuyển dụng"
          title="Việc Làm Theo Ngành Nghề"
          description="Đa dạng ngành nghề, phù hợp với mọi trình độ và kinh nghiệm"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {JOB_CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/nhan-su/viec-lam?category=${category.id}`}
              className="group"
            >
              <Card
                variant="interactive"
                className="text-center h-full"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-[#065f46]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#34d399] transition-colors">
                  <span className="text-[#065f46] group-hover:text-white transition-colors">
                    {iconMap[category.icon]}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-[#065f46] transition-colors">
                  {category.title}
                </h3>
                <span className="text-sm text-[#34d399] font-medium">
                  {category.count} việc làm
                </span>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/nhan-su/viec-lam">
            <Button
              variant="staffing"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Xem tất cả việc làm
            </Button>
          </Link>
        </div>
      </Section>

      {/* Process */}
      <Section padding="xl">
        <SectionHeader
          subtitle="Quy trình"
          title="Quy Trình Đơn Giản"
        />

        <div className="grid md:grid-cols-2 gap-12">
          {/* For Job Seekers */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <UserPlus className="w-6 h-6 text-[#065f46]" />
              Dành cho Ứng viên
            </h3>
            <div className="space-y-6">
              {[
                { step: 1, title: "Đăng ký hồ sơ", desc: "Điền thông tin cá nhân và kinh nghiệm" },
                { step: 2, title: "Phỏng vấn sơ bộ", desc: "Trao đổi ngắn với tư vấn viên" },
                { step: 3, title: "Kết nối việc làm", desc: "Nhận thông tin việc làm phù hợp" },
                { step: 4, title: "Bắt đầu làm việc", desc: "Nhận việc và bắt đầu thu nhập" },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="w-10 h-10 bg-[#065f46] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* For Businesses */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Building className="w-6 h-6 text-[#1a365d]" />
              Dành cho Doanh nghiệp
            </h3>
            <div className="space-y-6">
              {[
                { step: 1, title: "Gửi yêu cầu", desc: "Mô tả nhu cầu nhân sự của bạn" },
                { step: 2, title: "Tư vấn giải pháp", desc: "Đề xuất phương án phù hợp nhất" },
                { step: 3, title: "Cung cấp nhân sự", desc: "Gửi hồ sơ ứng viên đạt yêu cầu" },
                { step: 4, title: "Hỗ trợ quản lý", desc: "Đồng hành trong suốt quá trình" },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="w-10 h-10 bg-[#1a365d] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section variant="staffing" padding="lg">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">
            Sẵn sàng bắt đầu?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Dù bạn đang tìm việc hay cần nhân sự, chúng tôi luôn sẵn sàng hỗ trợ
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/nhan-su/dang-ky">
              <Button
                variant="staffing"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Đăng ký ứng viên
              </Button>
            </Link>
            <a href="tel:19001234">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-[#065f46]"
                leftIcon={<Phone className="w-5 h-5" />}
              >
                Hotline: 1900 1234
              </Button>
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}

