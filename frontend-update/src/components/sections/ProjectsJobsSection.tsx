"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Section, SectionHeader, Badge, Button } from "@/components/ui";
import { ArrowRight, MapPin, Clock, Briefcase, Eye, Flame, Zap } from "lucide-react";

// Dummy data for projects
const dummyProjects = [
  {
    id: "1",
    title: "Showroom Mercedes-Benz Quận 7",
    category: "Showroom",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    location: "TP. Hồ Chí Minh",
    area: "1,200 m²",
  },
  {
    id: "2",
    title: "Nhà hàng Nhật Sakura",
    category: "Nhà hàng",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    location: "Đà Nẵng",
    area: "450 m²",
  },
  {
    id: "3",
    title: "The Coffee House Landmark 81",
    category: "Cafe",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop",
    location: "TP. Hồ Chí Minh",
    area: "280 m²",
  },
  {
    id: "4",
    title: "Văn phòng FPT Software",
    category: "Văn phòng",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    location: "Hà Nội",
    area: "2,500 m²",
  },
];

// Dummy data for jobs
const dummyJobs = [
  {
    id: "1",
    title: "Nhân viên Kho vận",
    company: "Lazada Express",
    location: "Bình Dương",
    salary: "10 - 15 triệu",
    employmentType: "Toàn thời gian",
    isHot: true,
    isUrgent: false,
    publishedAt: "2 ngày trước",
  },
  {
    id: "2",
    title: "Công nhân Sản xuất",
    company: "Samsung Electronics",
    location: "Bắc Ninh",
    salary: "8 - 12 triệu",
    employmentType: "Toàn thời gian",
    isHot: false,
    isUrgent: true,
    publishedAt: "Hôm nay",
  },
  {
    id: "3",
    title: "Nhân viên Bốc xếp",
    company: "Shopee Express",
    location: "TP. Hồ Chí Minh",
    salary: "9 - 13 triệu",
    employmentType: "Toàn thời gian",
    isHot: true,
    isUrgent: true,
    publishedAt: "1 ngày trước",
  },
  {
    id: "4",
    title: "Lái xe Tải",
    company: "GHTK",
    location: "Đồng Nai",
    salary: "12 - 18 triệu",
    employmentType: "Toàn thời gian",
    isHot: false,
    isUrgent: false,
    publishedAt: "3 ngày trước",
  },
];

export function ProjectsJobsSection() {
  const [activeTab, setActiveTab] = useState<"projects" | "jobs">("projects");

  return (
    <Section variant="gray" padding="xl">
      <SectionHeader
        subtitle="Hoạt động nổi bật"
        title="Dự Án & Việc Làm Mới Nhất"
        description="Khám phá những dự án nội thất ấn tượng và cơ hội việc làm hấp dẫn"
      />

      {/* Tab Switcher */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex p-1.5 bg-white rounded-xl shadow-md">
          <button
            onClick={() => setActiveTab("projects")}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300",
              activeTab === "projects"
                ? "bg-[#1a365d] text-white shadow-lg"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            <Eye className="w-5 h-5" />
            Dự án nổi bật
          </button>
          <button
            onClick={() => setActiveTab("jobs")}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300",
              activeTab === "jobs"
                ? "bg-[#065f46] text-white shadow-lg"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            <Briefcase className="w-5 h-5" />
            Việc làm mới
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      {activeTab === "projects" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dummyProjects.map((project, index) => (
              <Link key={project.id} href={`/noi-that/du-an/${project.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Category Badge */}
                    <Badge
                      variant="interior"
                      className="absolute top-4 left-4"
                    >
                      {project.category}
                    </Badge>

                    {/* View Icon */}
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="w-5 h-5 text-[#1a365d]" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 font-heading mb-2 group-hover:text-[#1a365d] transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {project.location}
                      </span>
                      <span>{project.area}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/noi-that/du-an">
              <Button variant="interior" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Xem tất cả dự án
              </Button>
            </Link>
          </div>
        </motion.div>
      )}

      {/* Jobs List */}
      {activeTab === "jobs" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid gap-4">
            {dummyJobs.map((job, index) => (
              <Link key={job.id} href={`/nhan-su/viec-lam/${job.id}`}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex flex-col md:flex-row md:items-center gap-4 p-5 bg-white rounded-xl border border-gray-100 hover:shadow-lg hover:border-[#34d399] transition-all duration-300"
                >
                  {/* Company Logo Placeholder */}
                  <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-8 h-8 text-gray-400" />
                  </div>

                  {/* Job Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900 group-hover:text-[#065f46] transition-colors">
                        {job.title}
                      </h3>
                      {job.isHot && (
                        <Badge variant="danger" size="sm">
                          <Flame className="w-3 h-3 mr-1" />
                          HOT
                        </Badge>
                      )}
                      {job.isUrgent && (
                        <Badge variant="warning" size="sm">
                          <Zap className="w-3 h-3 mr-1" />
                          Gấp
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 mb-2">{job.company}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="text-[#065f46] font-semibold">
                        {job.salary}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.publishedAt}
                      </span>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <div className="flex items-center gap-3">
                    <Badge variant="staffing">{job.employmentType}</Badge>
                    <span className="hidden md:flex items-center gap-1 text-[#065f46] font-semibold group-hover:gap-2 transition-all">
                      Ứng tuyển
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/nhan-su/viec-lam">
              <Button variant="staffing" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Xem tất cả việc làm
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </Section>
  );
}

