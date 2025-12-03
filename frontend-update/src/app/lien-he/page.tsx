import { Metadata } from "next";
import { ContactSection } from "@/components/sections";
import { Section, Container, Badge, Card } from "@/components/ui";
import { COMPANY_INFO } from "@/lib/constants";
import { MapPin, Phone, Mail, Clock, Building2, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Liên hệ",
  description:
    "Liên hệ với VIETBUILD GROUP - Thiết kế nội thất & Cung ứng nhân sự. Hotline: 1900 1234. Địa chỉ: Landmark 81, TP.HCM",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1a365d] to-[#065f46] py-16">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">
              Liên Hệ Với Chúng Tôi
            </h1>
            <p className="text-xl text-white/80">
              Đội ngũ tư vấn sẵn sàng hỗ trợ bạn 24/7
            </p>
          </div>
        </Container>
      </section>

      {/* Quick Contact Cards */}
      <Section padding="lg" className="-mt-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card variant="elevated" className="text-center">
            <div className="w-14 h-14 mx-auto mb-4 bg-[#1a365d]/10 rounded-xl flex items-center justify-center">
              <Phone className="w-7 h-7 text-[#1a365d]" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Hotline</h3>
            <a
              href={`tel:${COMPANY_INFO.hotline.replace(/\s/g, "")}`}
              className="text-xl font-bold text-[#1a365d] hover:underline"
            >
              {COMPANY_INFO.hotline}
            </a>
            <p className="text-sm text-gray-500 mt-1">Hỗ trợ 24/7</p>
          </Card>

          <Card variant="elevated" className="text-center">
            <div className="w-14 h-14 mx-auto mb-4 bg-[#065f46]/10 rounded-xl flex items-center justify-center">
              <Mail className="w-7 h-7 text-[#065f46]" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Email</h3>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="text-[#065f46] hover:underline"
            >
              {COMPANY_INFO.email}
            </a>
            <p className="text-sm text-gray-500 mt-1">Phản hồi trong 24h</p>
          </Card>

          <Card variant="elevated" className="text-center">
            <div className="w-14 h-14 mx-auto mb-4 bg-gray-100 rounded-xl flex items-center justify-center">
              <MapPin className="w-7 h-7 text-gray-700" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Địa chỉ</h3>
            <p className="text-gray-600 text-sm">{COMPANY_INFO.address}</p>
          </Card>

          <Card variant="elevated" className="text-center">
            <div className="w-14 h-14 mx-auto mb-4 bg-gray-100 rounded-xl flex items-center justify-center">
              <Clock className="w-7 h-7 text-gray-700" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Giờ làm việc</h3>
            <p className="text-gray-600">T2 - T7: 8:00 - 18:00</p>
            <p className="text-sm text-gray-500 mt-1">Chủ nhật: Nghỉ</p>
          </Card>
        </div>
      </Section>

      {/* Division Contact */}
      <Section variant="gray" padding="lg">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Interior Division */}
          <Card variant="elevated" className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-[#1a365d] rounded-xl flex items-center justify-center">
                <Building2 className="w-7 h-7 text-[#c9a962]" />
              </div>
              <div>
                <Badge variant="interior">Nội thất</Badge>
                <h3 className="text-xl font-bold text-gray-900 mt-1">
                  Bộ phận Thiết kế & Thi công
                </h3>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Tư vấn về thiết kế nội thất, báo giá thi công, ALU, CNC, bảng hiệu
            </p>
            <div className="space-y-3">
              <a
                href="tel:0901234567"
                className="flex items-center gap-2 text-[#1a365d] hover:underline"
              >
                <Phone className="w-4 h-4" />
                0901 234 567
              </a>
              <a
                href="mailto:noithat@vietbuildgroup.vn"
                className="flex items-center gap-2 text-[#1a365d] hover:underline"
              >
                <Mail className="w-4 h-4" />
                noithat@vietbuildgroup.vn
              </a>
            </div>
          </Card>

          {/* Staffing Division */}
          <Card variant="elevated" className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-[#065f46] rounded-xl flex items-center justify-center">
                <Users className="w-7 h-7 text-[#34d399]" />
              </div>
              <div>
                <Badge variant="staffing">Nhân sự</Badge>
                <h3 className="text-xl font-bold text-gray-900 mt-1">
                  Bộ phận Cung ứng Nhân sự
                </h3>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Tư vấn việc làm, đăng ký ứng viên, cung ứng nhân sự cho doanh nghiệp
            </p>
            <div className="space-y-3">
              <a
                href="tel:0902345678"
                className="flex items-center gap-2 text-[#065f46] hover:underline"
              >
                <Phone className="w-4 h-4" />
                0902 345 678
              </a>
              <a
                href="mailto:nhansu@vietbuildgroup.vn"
                className="flex items-center gap-2 text-[#065f46] hover:underline"
              >
                <Mail className="w-4 h-4" />
                nhansu@vietbuildgroup.vn
              </a>
            </div>
          </Card>
        </div>
      </Section>

      {/* Map & Contact Form */}
      <ContactSection />

      {/* Google Map Placeholder */}
      <Section padding="none" withContainer={false}>
        <div className="h-96 bg-gray-200 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 mx-auto text-gray-400 mb-2" />
            <p className="text-gray-500">
              Google Map sẽ hiển thị ở đây
              <br />
              <span className="text-sm">
                (Cần cấu hình Google Maps API Key)
              </span>
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}

