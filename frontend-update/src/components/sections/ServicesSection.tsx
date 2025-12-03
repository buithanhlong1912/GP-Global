"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Section, SectionHeader, Button } from "@/components/ui";
import { INTERIOR_SERVICES, JOB_CATEGORIES } from "@/lib/constants";
import {
  Building2,
  Users,
  ArrowRight,
  Palette,
  Layers,
  Settings,
  Signpost,
  Coffee,
  Store,
  Package,
  Factory,
  ShoppingBag,
  Building,
  Wrench,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Palette,
  Layers,
  Settings,
  Signpost,
  Coffee,
  Store,
  Package,
  Factory,
  Users,
  ShoppingBag,
  Building,
  Wrench,
};

export function ServicesSection() {
  const [activeTab, setActiveTab] = useState<"interior" | "staffing">("interior");

  return (
    <Section padding="xl">
      <SectionHeader
        subtitle="Dịch vụ của chúng tôi"
        title="Giải Pháp Toàn Diện"
        description="Từ thiết kế nội thất đến cung ứng nhân sự - Chúng tôi đáp ứng mọi nhu cầu của doanh nghiệp"
      />

      {/* Tab Switcher */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex p-1.5 bg-gray-100 rounded-xl">
          <button
            onClick={() => setActiveTab("interior")}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300",
              activeTab === "interior"
                ? "bg-[#1a365d] text-white shadow-lg"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            <Building2 className="w-5 h-5" />
            Nội thất
          </button>
          <button
            onClick={() => setActiveTab("staffing")}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300",
              activeTab === "staffing"
                ? "bg-[#065f46] text-white shadow-lg"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            <Users className="w-5 h-5" />
            Nhân sự
          </button>
        </div>
      </div>

      {/* Interior Services */}
      {activeTab === "interior" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INTERIOR_SERVICES.map((service, index) => {
              const Icon = iconMap[service.icon] || Palette;
              return (
                <Link
                  key={service.id}
                  href={`/noi-that/dich-vu/${service.id}`}
                  className="group"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative h-full p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:border-[#c9a962] transition-all duration-300"
                  >
                    {/* Image Background */}
                    <div className="relative h-48 -mx-6 -mt-6 mb-6 rounded-t-2xl overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{
                          backgroundImage: `url(https://images.unsplash.com/photo-161822119571${index}-dd6b41faaea6?w=600&h=400&fit=crop)`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      {/* Icon Badge */}
                      <div className="absolute bottom-4 left-4 w-14 h-14 bg-[#c9a962] rounded-xl flex items-center justify-center shadow-lg">
                        <Icon className="w-7 h-7 text-[#1a365d]" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 font-heading mb-2 group-hover:text-[#1a365d] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>

                    {/* Link */}
                    <span className="inline-flex items-center gap-2 text-[#1a365d] font-semibold group-hover:gap-3 transition-all">
                      Xem chi tiết
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <Link href="/noi-that/dich-vu">
              <Button variant="interior" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Xem tất cả dịch vụ
              </Button>
            </Link>
          </div>
        </motion.div>
      )}

      {/* Staffing Services / Job Categories */}
      {activeTab === "staffing" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {JOB_CATEGORIES.map((category, index) => {
              const Icon = iconMap[category.icon] || Users;
              return (
                <Link
                  key={category.id}
                  href={`/nhan-su/viec-lam?category=${category.id}`}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="group p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:border-[#34d399] transition-all duration-300 text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-[#065f46]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#34d399] transition-colors">
                      <Icon className="w-8 h-8 text-[#065f46] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-[#065f46] transition-colors">
                      {category.title}
                    </h3>
                    <span className="text-sm text-[#34d399] font-medium">
                      {category.count} việc làm
                    </span>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Staffing Services Cards */}
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {/* For Job Seekers */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="p-8 bg-gradient-to-br from-[#065f46] to-[#047857] rounded-2xl text-white"
            >
              <h3 className="text-2xl font-bold font-heading mb-4">
                Dành cho Người tìm việc
              </h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-[#34d399] rounded-full flex items-center justify-center text-[#065f46]">
                    ✓
                  </span>
                  Hàng trăm việc làm mới mỗi ngày
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-[#34d399] rounded-full flex items-center justify-center text-[#065f46]">
                    ✓
                  </span>
                  Hỗ trợ tư vấn nghề nghiệp miễn phí
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-[#34d399] rounded-full flex items-center justify-center text-[#065f46]">
                    ✓
                  </span>
                  Kết nối trực tiếp với nhà tuyển dụng
                </li>
              </ul>
              <Link href="/nhan-su/viec-lam">
                <Button
                  variant="staffing"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Tìm việc ngay
                </Button>
              </Link>
            </motion.div>

            {/* For Businesses */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-8 bg-white rounded-2xl border-2 border-[#065f46]"
            >
              <h3 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                Dành cho Doanh nghiệp
              </h3>
              <ul className="space-y-3 mb-6 text-gray-700">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-[#065f46] rounded-full flex items-center justify-center text-white text-sm">
                    ✓
                  </span>
                  Cung ứng nhân sự nhanh chóng
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-[#065f46] rounded-full flex items-center justify-center text-white text-sm">
                    ✓
                  </span>
                  Đội ngũ đã qua sàng lọc, đào tạo
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-[#065f46] rounded-full flex items-center justify-center text-white text-sm">
                    ✓
                  </span>
                  Chi phí linh hoạt, tối ưu hiệu quả
                </li>
              </ul>
              <Link href="/nhan-su/doanh-nghiep">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#065f46] text-[#065f46] hover:bg-[#065f46] hover:text-white"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Tìm hiểu thêm
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </Section>
  );
}

