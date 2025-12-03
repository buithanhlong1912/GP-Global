import { Metadata } from "next";
import { Section, Container, SectionHeader, Badge, Button, Card } from "@/components/ui";
import { COMPANY_INFO, WHY_CHOOSE_US } from "@/lib/constants";
import {
  Building2,
  Award,
  Users,
  Target,
  CheckCircle,
  ArrowRight,
  Phone,
  Shield,
  Lightbulb,
  Heart,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Giới thiệu - Thiết kế Nội thất",
  description:
    "VIETBUILD GROUP - Công ty thiết kế thi công nội thất hàng đầu Việt Nam với hơn 10 năm kinh nghiệm, 1000+ dự án hoàn thành.",
};

const values = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Chất lượng",
    description: "Cam kết chất lượng cao nhất trong từng sản phẩm và dịch vụ",
  },
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: "Sáng tạo",
    description: "Luôn đổi mới và sáng tạo để mang đến giải pháp tối ưu",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Chuyên nghiệp",
    description: "Đội ngũ được đào tạo bài bản với tinh thần làm việc chuyên nghiệp",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Tận tâm",
    description: "Đặt lợi ích khách hàng lên hàng đầu trong mọi hoạt động",
  },
];

const milestones = [
  { year: "2015", event: "Thành lập công ty tại TP.HCM" },
  { year: "2017", event: "Mở rộng dịch vụ ALU & CNC" },
  { year: "2019", event: "Đạt mốc 500 dự án hoàn thành" },
  { year: "2021", event: "Mở chi nhánh Hà Nội" },
  { year: "2023", event: "Đạt chứng nhận ISO 9001:2015" },
  { year: "2024", event: "Kỷ niệm 1000+ dự án hoàn thành" },
];

export default function InteriorAboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center bg-interior-gradient overflow-hidden">
        <div className="absolute inset-0 bg-mesh-pattern opacity-30" />
        <Container className="relative z-10 py-20">
          <div className="max-w-3xl">
            <Badge variant="interior" className="mb-6 bg-[#c9a962] text-[#1a365d]">
              <Building2 className="w-4 h-4 mr-1" />
              Về chúng tôi
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-6">
              Kiến Tạo Không Gian
              <br />
              <span className="text-[#c9a962]">Xây Dựng Ước Mơ</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              {COMPANY_INFO.description}
            </p>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <Section padding="lg" className="-mt-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: "10+", label: "Năm kinh nghiệm", icon: <Award /> },
            { value: "1000+", label: "Dự án hoàn thành", icon: <Building2 /> },
            { value: "500+", label: "Nhân viên", icon: <Users /> },
            { value: "100%", label: "Khách hàng hài lòng", icon: <Target /> },
          ].map((stat, i) => (
            <Card key={i} variant="elevated" className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-3 bg-[#1a365d]/10 rounded-xl flex items-center justify-center text-[#1a365d]">
                {stat.icon}
              </div>
              <span className="block text-3xl font-bold text-[#1a365d]">
                {stat.value}
              </span>
              <span className="text-gray-600">{stat.label}</span>
            </Card>
          ))}
        </div>
      </Section>

      {/* Story */}
      <Section padding="xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              subtitle="Câu chuyện của chúng tôi"
              title="Từ Đam Mê Đến Thành Công"
              align="left"
            />
            <div className="space-y-4 text-gray-600">
              <p>
                VIETBUILD GROUP được thành lập năm 2015 bởi đội ngũ kiến trúc sư và
                kỹ sư giàu kinh nghiệm với mong muốn mang đến những giải pháp nội
                thất hoàn hảo cho khách hàng Việt Nam.
              </p>
              <p>
                Từ một xưởng nhỏ chuyên sản xuất ALU và bảng hiệu, chúng tôi đã phát
                triển thành công ty thiết kế thi công nội thất toàn diện với quy mô
                hơn 500 nhân viên và 2 chi nhánh trên cả nước.
              </p>
              <p>
                Với triết lý "Chất lượng là nền tảng - Sáng tạo là động lực", chúng
                tôi tự hào đã hoàn thành hơn 1000 dự án và trở thành đối tác tin cậy
                của nhiều thương hiệu lớn tại Việt Nam.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
              alt="Đội ngũ VIETBUILD GROUP"
              className="rounded-2xl shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-[#1a365d] text-white p-6 rounded-xl">
              <span className="block text-4xl font-bold text-[#c9a962]">10+</span>
              <span>Năm kinh nghiệm</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section variant="gray" padding="xl">
        <SectionHeader
          subtitle="Giá trị cốt lõi"
          title="Điều Chúng Tôi Tin Tưởng"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, i) => (
            <Card key={i} variant="elevated" className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#1a365d] rounded-2xl flex items-center justify-center text-[#c9a962]">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Milestones */}
      <Section padding="xl">
        <SectionHeader
          subtitle="Hành trình phát triển"
          title="Các Cột Mốc Quan Trọng"
        />

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#c9a962] -translate-x-1/2 hidden md:block" />

            <div className="space-y-8">
              {milestones.map((milestone, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-8 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`flex-1 ${
                      i % 2 === 0 ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <span className="text-3xl font-bold text-[#1a365d]">
                      {milestone.year}
                    </span>
                    <p className="text-gray-600 mt-1">{milestone.event}</p>
                  </div>
                  <div className="hidden md:flex w-12 h-12 bg-[#c9a962] rounded-full items-center justify-center z-10">
                    <CheckCircle className="w-6 h-6 text-[#1a365d]" />
                  </div>
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section variant="interior" padding="lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Sẵn sàng hợp tác?
          </h2>
          <p className="text-white/80 mb-6">
            Liên hệ ngay để được tư vấn miễn phí và nhận báo giá
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/noi-that/bao-gia">
              <Button variant="interior" size="lg" rightIcon={<ArrowRight />}>
                Nhận báo giá
              </Button>
            </a>
            <a href="tel:19001234">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-[#1a365d]"
                leftIcon={<Phone />}
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

