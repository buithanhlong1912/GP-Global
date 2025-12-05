'use client';

import { Button, Input, Section, SectionHeader } from '@/components/ui';
import { COMPANY_INFO } from '@/lib/constants';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Clock,
  Download,
  FileText,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import { useState } from 'react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <Section variant="interior" padding="xl" className="!mt-12 !p-4">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left - Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeader
            subtitle="Liên hệ với chúng tôi"
            title="Sẵn Sàng Hỗ Trợ Bạn"
            description="Đội ngũ tư vấn viên của chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn 24/7"
            align="left"
            titleClassName="text-white"
          />

          {/* Contact Details */}
          <div className="space-y-6 mt-8 flex flex-col">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#c9a962] rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-[#1a365d]" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Địa chỉ</h4>
                <p className="text-white/70">{COMPANY_INFO.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#c9a962] rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-[#1a365d]" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Hotline</h4>
                <a
                  href={`tel:${COMPANY_INFO.hotline.replace(/\s/g, '')}`}
                  className="text-2xl font-bold text-[#c9a962] hover:underline"
                >
                  {COMPANY_INFO.hotline}
                </a>
                <p className="text-white/70 text-sm">Hỗ trợ 24/7</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#c9a962] rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-[#1a365d]" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Email</h4>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="text-white/90 hover:text-[#c9a962] transition-colors"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#c9a962] rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-[#1a365d]" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Giờ làm việc</h4>
                <p className="text-white/70">Thứ 2 - Thứ 7: 8:00 - 18:00</p>
                <p className="text-white/70">Chủ nhật: Nghỉ</p>
              </div>
            </div>
            {/* Company Profile Download */}
            <div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#c9a962] rounded-xl flex items-center justify-center">
                  <FileText className="w-7 h-7 text-[#1a365d]" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white">
                    Hồ sơ năng lực công ty
                  </h4>
                  <p className="text-white/70 text-sm">
                    Tải về để tìm hiểu thêm về chúng tôi
                  </p>
                </div>
                <a
                  href="/documents/company-profile.pdf"
                  download
                  className="flex items-center gap-2 !px-5 !py-2 bg-[#c9a962] text-[#1a365d] font-semibold rounded-lg hover:bg-white transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Tải PDF
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right - Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl !p-4">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Gửi thành công!
                </h3>
                <p className="text-gray-600">
                  Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-gray-900 font-heading mb-6">
                  Gửi yêu cầu tư vấn
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <Input
                      label="Họ và tên"
                      name="name"
                      placeholder="Nguyễn Văn A"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="!px-2"
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
                      className="!px-2"
                    />
                  </div>

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
                    className="!px-2"
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Chủ đề <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
                    >
                      <option value="">-- Chọn chủ đề --</option>
                      <option value="interior">Tư vấn nội thất</option>
                      <option value="staffing">Cung ứng nhân sự</option>
                      <option value="quote">Yêu cầu báo giá</option>
                      <option value="partner">Hợp tác đối tác</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Nội dung <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Mô tả yêu cầu của bạn..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      className="w-full !px-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-transparent resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={isSubmitting}
                    rightIcon={<Send className="w-5 h-5" />}
                  >
                    Gửi yêu cầu
                  </Button>

                  <p className="text-center text-sm text-gray-500">
                    Bằng việc gửi form, bạn đồng ý với{' '}
                    <a
                      href="/chinh-sach"
                      className="text-[#1a365d] hover:underline"
                    >
                      chính sách bảo mật
                    </a>{' '}
                    của chúng tôi.
                  </p>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
