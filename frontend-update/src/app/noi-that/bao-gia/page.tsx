"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section, Container, SectionHeader, Input, Button, Badge, Card } from "@/components/ui";
import { COMPANY_INFO, INTERIOR_SERVICES } from "@/lib/constants";
import {
  Send,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Upload,
  FileText,
  Calculator,
  Clock,
  Shield,
  ArrowRight,
} from "lucide-react";

const projectTypes = [
  "Showroom / Cửa hàng",
  "Nhà hàng / Quán ăn",
  "Cafe / Bar",
  "Văn phòng",
  "Khách sạn",
  "Bảng hiệu / Signage",
  "ALU / CNC",
  "Khác",
];

const budgetRanges = [
  "Dưới 100 triệu",
  "100 - 300 triệu",
  "300 - 500 triệu",
  "500 triệu - 1 tỷ",
  "1 - 3 tỷ",
  "Trên 3 tỷ",
  "Chưa xác định",
];

const timelines = [
  "Gấp (dưới 1 tháng)",
  "1 - 2 tháng",
  "2 - 3 tháng",
  "3 - 6 tháng",
  "Chưa xác định",
];

export default function QuotePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    area: "",
    location: "",
    timeline: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <Section padding="xl">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6"
          >
            <CheckCircle className="w-12 h-12 text-green-500" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Gửi yêu cầu thành công!
          </h1>
          <p className="text-gray-600 mb-8">
            Cảm ơn bạn đã quan tâm đến dịch vụ của chúng tôi. Đội ngũ tư vấn sẽ liên
            hệ lại trong vòng 24 giờ để thảo luận chi tiết về dự án của bạn.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              variant="primary"
              onClick={() => setIsSubmitted(false)}
            >
              Gửi yêu cầu khác
            </Button>
            <a href="/">
              <Button variant="outline">Về trang chủ</Button>
            </a>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-interior-gradient py-16">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="interior" className="mb-4 bg-[#c9a962] text-[#1a365d]">
              <Calculator className="w-4 h-4 mr-1" />
              Báo giá
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">
              Nhận Báo Giá Miễn Phí
            </h1>
            <p className="text-xl text-white/80">
              Điền thông tin bên dưới để nhận báo giá chi tiết trong vòng 24 giờ
            </p>
          </div>
        </Container>
      </section>

      {/* Features Bar */}
      <Section padding="sm" className="border-b bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#1a365d] rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-[#c9a962]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Phản hồi nhanh</h3>
              <p className="text-sm text-gray-600">Báo giá trong 24 giờ</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#1a365d] rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-[#c9a962]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Minh bạch</h3>
              <p className="text-sm text-gray-600">Báo giá chi tiết từng hạng mục</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#1a365d] rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-[#c9a962]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Hoàn toàn miễn phí</h3>
              <p className="text-sm text-gray-600">Không phát sinh chi phí tư vấn</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Form Section */}
      <Section padding="xl">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card padding="lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Thông tin yêu cầu báo giá
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#1a365d] text-white rounded-full flex items-center justify-center text-sm">
                      1
                    </span>
                    Thông tin liên hệ
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Họ và tên"
                      name="name"
                      placeholder="Nguyễn Văn A"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                    <Input
                      label="Số điện thoại"
                      name="phone"
                      type="tel"
                      placeholder="0901 234 567"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                    />
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                    <Input
                      label="Công ty (nếu có)"
                      name="company"
                      placeholder="Tên công ty"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Project Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#1a365d] text-white rounded-full flex items-center justify-center text-sm">
                      2
                    </span>
                    Thông tin dự án
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Loại dự án <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) =>
                          setFormData({ ...formData, projectType: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a365d]"
                      >
                        <option value="">-- Chọn loại dự án --</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Ngân sách dự kiến
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) =>
                          setFormData({ ...formData, budget: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a365d]"
                      >
                        <option value="">-- Chọn ngân sách --</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Input
                      label="Diện tích (m²)"
                      name="area"
                      placeholder="VD: 200"
                      value={formData.area}
                      onChange={(e) =>
                        setFormData({ ...formData, area: e.target.value })
                      }
                    />
                    <Input
                      label="Địa điểm thi công"
                      name="location"
                      placeholder="VD: Quận 1, TP.HCM"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      required
                    />
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Thời gian dự kiến
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) =>
                          setFormData({ ...formData, timeline: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a365d]"
                      >
                        <option value="">-- Chọn thời gian --</option>
                        {timelines.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#1a365d] text-white rounded-full flex items-center justify-center text-sm">
                      3
                    </span>
                    Mô tả chi tiết
                  </h3>
                  <textarea
                    rows={5}
                    placeholder="Mô tả yêu cầu, ý tưởng, phong cách mong muốn..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a365d] resize-none"
                  />

                  {/* File Upload */}
                  <div className="mt-4 p-6 border-2 border-dashed border-gray-300 rounded-xl text-center hover:border-[#1a365d] transition-colors cursor-pointer">
                    <Upload className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-600">
                      Kéo thả file hoặc <span className="text-[#1a365d] font-medium">chọn file</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Bản vẽ, hình ảnh tham khảo (PDF, JPG, PNG - Max 10MB)
                    </p>
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  isLoading={isSubmitting}
                  rightIcon={<Send className="w-5 h-5" />}
                >
                  Gửi yêu cầu báo giá
                </Button>
              </form>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card variant="elevated" className="bg-[#1a365d] text-white">
              <h3 className="text-xl font-bold mb-4">Cần tư vấn ngay?</h3>
              <p className="text-white/80 mb-6">
                Gọi điện hoặc nhắn tin để được tư vấn trực tiếp
              </p>
              <div className="space-y-4">
                <a
                  href={`tel:${COMPANY_INFO.hotline.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <Phone className="w-5 h-5 text-[#c9a962]" />
                  <div>
                    <p className="text-sm text-white/70">Hotline</p>
                    <p className="font-semibold">{COMPANY_INFO.hotline}</p>
                  </div>
                </a>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <Mail className="w-5 h-5 text-[#c9a962]" />
                  <div>
                    <p className="text-sm text-white/70">Email</p>
                    <p className="font-semibold">{COMPANY_INFO.email}</p>
                  </div>
                </a>
              </div>
            </Card>

            {/* Services Quick List */}
            <Card>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Dịch vụ nổi bật
              </h3>
              <ul className="space-y-3">
                {INTERIOR_SERVICES.slice(0, 5).map((service) => (
                  <li key={service.id}>
                    <a
                      href={`/noi-that/dich-vu/${service.id}`}
                      className="flex items-center gap-2 text-gray-600 hover:text-[#1a365d] transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </Card>

            {/* FAQ */}
            <Card>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Câu hỏi thường gặp
              </h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-medium text-gray-900">
                    Báo giá mất bao lâu?
                  </p>
                  <p className="text-gray-600">
                    Chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    Có phí tư vấn không?
                  </p>
                  <p className="text-gray-600">
                    Hoàn toàn miễn phí cho lần tư vấn đầu tiên.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    Có bảo hành không?
                  </p>
                  <p className="text-gray-600">
                    Bảo hành từ 1-5 năm tùy hạng mục thi công.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}

