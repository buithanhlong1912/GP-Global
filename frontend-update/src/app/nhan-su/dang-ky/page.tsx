"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section, Container, Input, Button, Badge, Card } from "@/components/ui";
import { JOB_CATEGORIES, LOCATIONS, EMPLOYMENT_TYPES, COMPANY_INFO } from "@/lib/constants";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Upload,
  CheckCircle,
  ArrowRight,
  FileText,
  Shield,
  Clock,
  Users,
} from "lucide-react";

const experienceLevels = [
  "Chưa có kinh nghiệm",
  "Dưới 1 năm",
  "1 - 2 năm",
  "2 - 5 năm",
  "Trên 5 năm",
];

const availabilities = [
  { id: "immediate", label: "Có thể đi làm ngay" },
  { id: "2weeks", label: "Trong vòng 2 tuần" },
  { id: "1month", label: "Trong vòng 1 tháng" },
  { id: "negotiable", label: "Thỏa thuận" },
];

export default function CandidateRegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    experience: "",
    education: "",
    skills: [] as string[],
    desiredPosition: "",
    desiredSalary: "",
    desiredLocation: "",
    availability: "",
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

  const updateFormData = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
            Đăng ký thành công!
          </h1>
          <p className="text-gray-600 mb-8">
            Cảm ơn bạn đã đăng ký. Đội ngũ tư vấn của chúng tôi sẽ liên hệ trong vòng
            24 giờ để hướng dẫn các bước tiếp theo.
          </p>
          <div className="flex justify-center gap-4">
            <a href="/nhan-su/viec-lam">
              <Button variant="staffing" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Xem việc làm ngay
              </Button>
            </a>
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
      <section className="bg-staffing-gradient py-16">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="staffing" className="mb-4 bg-[#34d399] text-[#065f46]">
              <Users className="w-4 h-4 mr-1" />
              Ứng viên
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">
              Đăng Ký Ứng Viên
            </h1>
            <p className="text-xl text-white/80">
              Điền thông tin để chúng tôi kết nối bạn với cơ hội việc làm phù hợp nhất
            </p>
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <Section padding="sm" className="border-b bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#065f46] rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-[#34d399]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Miễn phí 100%</h3>
              <p className="text-sm text-gray-600">Không thu bất kỳ phí nào</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#065f46] rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-[#34d399]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Phản hồi nhanh</h3>
              <p className="text-sm text-gray-600">Liên hệ trong 24 giờ</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#065f46] rounded-xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-[#34d399]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Nhiều cơ hội</h3>
              <p className="text-sm text-gray-600">Hàng trăm việc làm mỗi ngày</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Form */}
      <Section padding="xl">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= s
                      ? "bg-[#065f46] text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-20 h-1 mx-2 ${
                      step > s ? "bg-[#065f46]" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <Card padding="lg">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Info */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <User className="w-6 h-6 text-[#065f46]" />
                    Thông tin cá nhân
                  </h2>

                  <div className="grid md:grid-cols-2 gap-5">
                    <Input
                      label="Họ và tên"
                      placeholder="Nguyễn Văn A"
                      value={formData.fullName}
                      onChange={(e) => updateFormData("fullName", e.target.value)}
                      required
                      leftIcon={<User className="w-5 h-5" />}
                    />
                    <Input
                      label="Số điện thoại"
                      type="tel"
                      placeholder="0901 234 567"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      required
                      leftIcon={<Phone className="w-5 h-5" />}
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      required
                      leftIcon={<Mail className="w-5 h-5" />}
                    />
                    <Input
                      label="Ngày sinh"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Giới tính
                      </label>
                      <select
                        value={formData.gender}
                        onChange={(e) => updateFormData("gender", e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#065f46]"
                      >
                        <option value="">-- Chọn giới tính --</option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                        <option value="other">Khác</option>
                      </select>
                    </div>
                    <Input
                      label="Địa chỉ hiện tại"
                      placeholder="Quận 1, TP.HCM"
                      value={formData.address}
                      onChange={(e) => updateFormData("address", e.target.value)}
                      leftIcon={<MapPin className="w-5 h-5" />}
                    />
                  </div>

                  <div className="mt-8 flex justify-end">
                    <Button
                      type="button"
                      variant="staffing"
                      rightIcon={<ArrowRight className="w-5 h-5" />}
                      onClick={() => setStep(2)}
                    >
                      Tiếp theo
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Experience & Skills */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Briefcase className="w-6 h-6 text-[#065f46]" />
                    Kinh nghiệm & Kỹ năng
                  </h2>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Kinh nghiệm làm việc <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.experience}
                        onChange={(e) => updateFormData("experience", e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#065f46]"
                      >
                        <option value="">-- Chọn kinh nghiệm --</option>
                        {experienceLevels.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Trình độ học vấn
                      </label>
                      <select
                        value={formData.education}
                        onChange={(e) => updateFormData("education", e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#065f46]"
                      >
                        <option value="">-- Chọn trình độ --</option>
                        <option value="Chưa tốt nghiệp THPT">Chưa tốt nghiệp THPT</option>
                        <option value="Tốt nghiệp THPT">Tốt nghiệp THPT</option>
                        <option value="Trung cấp / Cao đẳng">Trung cấp / Cao đẳng</option>
                        <option value="Đại học">Đại học</option>
                        <option value="Sau đại học">Sau đại học</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Kỹ năng / Chứng chỉ (chọn nhiều)
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                          "Bằng lái xe B2",
                          "Bằng lái xe C",
                          "Chứng chỉ hàn",
                          "Chứng chỉ điện",
                          "Tin học văn phòng",
                          "Tiếng Anh cơ bản",
                          "Xe nâng",
                          "Khác",
                        ].map((skill) => (
                          <label
                            key={skill}
                            className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                              formData.skills.includes(skill)
                                ? "border-[#065f46] bg-[#065f46]/5"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={formData.skills.includes(skill)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  updateFormData("skills", [...formData.skills, skill]);
                                } else {
                                  updateFormData(
                                    "skills",
                                    formData.skills.filter((s) => s !== skill)
                                  );
                                }
                              }}
                              className="w-4 h-4 text-[#065f46] focus:ring-[#065f46]"
                            />
                            <span className="text-sm">{skill}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* CV Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        CV / Hồ sơ (nếu có)
                      </label>
                      <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl text-center hover:border-[#065f46] transition-colors cursor-pointer">
                        <Upload className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-600">
                          Kéo thả file hoặc{" "}
                          <span className="text-[#065f46] font-medium">chọn file</span>
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          PDF, DOC, DOCX (Max 5MB)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <Button type="button" variant="ghost" onClick={() => setStep(1)}>
                      Quay lại
                    </Button>
                    <Button
                      type="button"
                      variant="staffing"
                      rightIcon={<ArrowRight className="w-5 h-5" />}
                      onClick={() => setStep(3)}
                    >
                      Tiếp theo
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Job Preferences */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-[#065f46]" />
                    Mong muốn công việc
                  </h2>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Vị trí mong muốn <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.desiredPosition}
                        onChange={(e) => updateFormData("desiredPosition", e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#065f46]"
                      >
                        <option value="">-- Chọn vị trí --</option>
                        {JOB_CATEGORIES.map((cat) => (
                          <option key={cat.id} value={cat.title}>
                            {cat.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <Input
                        label="Mức lương mong muốn"
                        placeholder="VD: 10 - 15 triệu"
                        value={formData.desiredSalary}
                        onChange={(e) => updateFormData("desiredSalary", e.target.value)}
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Địa điểm làm việc mong muốn
                        </label>
                        <select
                          value={formData.desiredLocation}
                          onChange={(e) => updateFormData("desiredLocation", e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#065f46]"
                        >
                          <option value="">-- Chọn địa điểm --</option>
                          {LOCATIONS.map((loc) => (
                            <option key={loc.id} value={loc.label}>
                              {loc.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Khả năng đi làm <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {availabilities.map((item) => (
                          <label
                            key={item.id}
                            className={`flex items-center gap-2 p-4 border rounded-lg cursor-pointer transition-colors ${
                              formData.availability === item.id
                                ? "border-[#065f46] bg-[#065f46]/5"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <input
                              type="radio"
                              name="availability"
                              value={item.id}
                              checked={formData.availability === item.id}
                              onChange={(e) =>
                                updateFormData("availability", e.target.value)
                              }
                              className="w-4 h-4 text-[#065f46] focus:ring-[#065f46]"
                            />
                            <span>{item.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <Button type="button" variant="ghost" onClick={() => setStep(2)}>
                      Quay lại
                    </Button>
                    <Button
                      type="submit"
                      variant="staffing"
                      size="lg"
                      isLoading={isSubmitting}
                      rightIcon={<CheckCircle className="w-5 h-5" />}
                    >
                      Hoàn tất đăng ký
                    </Button>
                  </div>
                </motion.div>
              )}
            </form>
          </Card>

          {/* Contact Info */}
          <div className="mt-8 text-center text-gray-600">
            <p>
              Cần hỗ trợ? Gọi ngay{" "}
              <a
                href={`tel:${COMPANY_INFO.hotline.replace(/\s/g, "")}`}
                className="text-[#065f46] font-semibold hover:underline"
              >
                {COMPANY_INFO.hotline}
              </a>
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}

