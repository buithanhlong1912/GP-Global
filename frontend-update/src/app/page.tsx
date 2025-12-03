import {
  HeroSection,
  WhyChooseUsSection,
  ServicesSection,
  ProjectsJobsSection,
  PartnersSection,
  ContactSection,
} from "@/components/sections";
import { Section, SectionHeader, Badge, Button } from "@/components/ui";
import { COMPANY_INFO } from "@/lib/constants";
import { FileText, Download, Shield, Award, Building2 } from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* Hero Section with Dual Segment */}
      <HeroSection />

      {/* Company Introduction */}
      <Section padding="xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=800&fit=crop"
                    alt="Dự án nội thất"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=400&fit=crop"
                    alt="Đội ngũ nhân viên"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="pt-8 space-y-4">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop"
                    alt="Văn phòng hiện đại"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=800&fit=crop"
                    alt="Tuyển dụng nhân sự"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#1a365d] rounded-xl flex items-center justify-center">
                  <Award className="w-8 h-8 text-[#c9a962]" />
                </div>
                <div>
                  <span className="block text-3xl font-bold text-[#1a365d]">
                    10+
                  </span>
                  <span className="text-gray-600">Năm kinh nghiệm</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <Badge variant="interior" className="mb-4">
              Về chúng tôi
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-6">
              Giải Pháp Toàn Diện Cho{" "}
              <span className="text-[#1a365d]">Doanh Nghiệp</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              <strong>{COMPANY_INFO.name}</strong> là đơn vị tiên phong trong lĩnh vực
              thiết kế thi công nội thất và cung ứng nhân sự tại Việt Nam. Với hơn 10
              năm kinh nghiệm, chúng tôi tự hào mang đến giải pháp toàn diện cho mọi
              doanh nghiệp.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#1a365d]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-[#1a365d]" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Thiết kế & Thi công Nội thất
                  </h4>
                  <p className="text-gray-600">
                    Showroom, nhà hàng, cafe, văn phòng, ALU, CNC, bảng hiệu
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#065f46]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-[#065f46]" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Cung ứng Nhân sự Chuyên nghiệp
                  </h4>
                  <p className="text-gray-600">
                    Kho vận, logistics, sản xuất, lao động, outsourcing
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg">
                Tìm hiểu thêm
              </Button>
              <Button variant="outline" size="lg">
                Xem video giới thiệu
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Why Choose Us - 6 Reasons */}
      <WhyChooseUsSection />

      {/* Services Overview */}
      <ServicesSection />

      {/* Projects - Jobs Combined Section */}
      <ProjectsJobsSection />

      {/* Partners Section */}
      <PartnersSection />

      {/* Business Licenses & Documents */}
      <Section variant="gray" padding="lg">
        <div className="grid md:grid-cols-3 gap-6">
          {/* License Card 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="w-14 h-14 bg-[#1a365d]/10 rounded-xl flex items-center justify-center mb-4">
              <FileText className="w-7 h-7 text-[#1a365d]" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Giấy phép kinh doanh
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Số: {COMPANY_INFO.businessLicense}
              <br />
              MST: {COMPANY_INFO.taxId}
            </p>
            <a
              href="/documents/business-license.pdf"
              className="inline-flex items-center gap-2 text-[#1a365d] font-semibold hover:underline"
            >
              <Download className="w-4 h-4" />
              Tải xuống
            </a>
          </div>

          {/* License Card 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="w-14 h-14 bg-[#065f46]/10 rounded-xl flex items-center justify-center mb-4">
              <Award className="w-7 h-7 text-[#065f46]" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Chứng nhận ISO 9001:2015
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Hệ thống quản lý chất lượng đạt chuẩn quốc tế
            </p>
            <a
              href="/documents/iso-certificate.pdf"
              className="inline-flex items-center gap-2 text-[#065f46] font-semibold hover:underline"
            >
              <Download className="w-4 h-4" />
              Tải xuống
            </a>
          </div>

          {/* Profile Card */}
          <div className="bg-gradient-to-br from-[#1a365d] to-[#2b4c7e] p-6 rounded-2xl text-white">
            <div className="w-14 h-14 bg-[#c9a962] rounded-xl flex items-center justify-center mb-4">
              <FileText className="w-7 h-7 text-[#1a365d]" />
            </div>
            <h3 className="text-lg font-bold mb-2">Hồ sơ năng lực công ty</h3>
            <p className="text-white/80 text-sm mb-4">
              Tìm hiểu chi tiết về năng lực, dự án và đội ngũ của chúng tôi
            </p>
            <a
              href="/documents/company-profile.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#c9a962] text-[#1a365d] font-semibold rounded-lg hover:bg-white transition-colors"
            >
              <Download className="w-5 h-5" />
              Tải PDF (5.2 MB)
            </a>
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <ContactSection />
    </>
  );
}
