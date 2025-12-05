'use client';

import { Badge, Button, Container, Section } from '@/components/ui';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  Eye,
  Grid,
  LayoutList,
  MapPin,
  Ruler,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// Dummy projects data
const projects = [
  {
    id: '1',
    title: 'Showroom Mercedes-Benz Quận 7',
    category: 'showroom',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    location: 'TP. Hồ Chí Minh',
    area: '1,200 m²',
    completedDate: '2024-01',
    client: 'Mercedes-Benz Vietnam',
  },
  {
    id: '2',
    title: 'Nhà hàng Nhật Sakura Premium',
    category: 'restaurant',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
    location: 'Đà Nẵng',
    area: '450 m²',
    completedDate: '2024-02',
    client: 'Sakura Group',
  },
  {
    id: '3',
    title: 'The Coffee House Landmark 81',
    category: 'cafe',
    image:
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop',
    location: 'TP. Hồ Chí Minh',
    area: '280 m²',
    completedDate: '2023-12',
    client: 'TCH Vietnam',
  },
  {
    id: '4',
    title: 'Văn phòng FPT Software Tower',
    category: 'office',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    location: 'Hà Nội',
    area: '2,500 m²',
    completedDate: '2024-03',
    client: 'FPT Software',
  },
  {
    id: '5',
    title: 'Bảng hiệu LED Vincom Center',
    category: 'signage',
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    location: 'TP. Hồ Chí Minh',
    area: '150 m²',
    completedDate: '2024-01',
    client: 'Vingroup',
  },
  {
    id: '6',
    title: 'Quầy Bar Rooftop Sky Lounge',
    category: 'bar',
    image:
      'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&h=600&fit=crop',
    location: 'Đà Nẵng',
    area: '180 m²',
    completedDate: '2023-11',
    client: 'Sky Lounge',
  },
  {
    id: '7',
    title: 'Samsung Store Crescent Mall',
    category: 'retail',
    image:
      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=600&fit=crop',
    location: 'TP. Hồ Chí Minh',
    area: '320 m²',
    completedDate: '2024-02',
    client: 'Samsung Electronics',
  },
  {
    id: '8',
    title: 'Nhà hàng Hải Sản Biển Đông',
    category: 'restaurant',
    image:
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop',
    location: 'Nha Trang',
    area: '800 m²',
    completedDate: '2023-10',
    client: 'Biển Đông Corp',
  },
];

const categories = [
  { id: 'all', label: 'Tất cả' },
  { id: 'showroom', label: 'Showroom' },
  { id: 'restaurant', label: 'Nhà hàng' },
  { id: 'cafe', label: 'Cafe' },
  { id: 'office', label: 'Văn phòng' },
  { id: 'retail', label: 'Cửa hàng' },
  { id: 'signage', label: 'Bảng hiệu' },
  { id: 'bar', label: 'Bar' },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="bg-interior-gradient !py-4 flex flex-col justify-center items-center">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <Badge
              variant="interior"
              className="mb-4 bg-[#c9a962] text-[#1a365d] !p-2"
            >
              Portfolio
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">
              Dự Án Nổi Bật
            </h1>
            <p className="text-xl text-white/80">
              Khám phá những công trình ấn tượng mà chúng tôi đã thực hiện cho
              các đối tác trên khắp Việt Nam
            </p>
          </div>
        </Container>
      </section>

      {/* Filters */}
      <Section padding="md" className="border-b border-gray-300 !p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  '!px-4 !py-2 rounded-full text-sm font-medium transition-colors',
                  activeCategory === cat.id
                    ? 'bg-[#1a365d] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* View Mode */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                '!p-2 rounded-lg transition-colors cursor-pointer',
                viewMode === 'grid'
                  ? 'bg-[#1a365d] text-white'
                  : 'text-gray-500',
              )}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                '!p-2 rounded-lg transition-colors cursor-pointer',
                viewMode === 'list'
                  ? 'bg-[#1a365d] text-white'
                  : 'text-gray-500',
              )}
            >
              <LayoutList className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Section>

      {/* Projects Grid/List */}
      <Section padding="xl" className="!p-4">
        <motion.div
          layout
          className={cn(
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-6 flex flex-col gap-4',
          )}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/noi-that/du-an/${project.id}`}
                className={cn(
                  'group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all !p-4',
                  viewMode === 'list' && 'flex flex-col md:flex-row',
                )}
              >
                {/* Image */}
                <div
                  className={cn(
                    'relative overflow-hidden rounded-t-2xl',
                    viewMode === 'grid'
                      ? 'aspect-[4/3]'
                      : 'md:w-80 aspect-video md:aspect-auto rounded-2xl',
                  )}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                      <Badge variant="interior">{project.category}</Badge>
                      <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1a365d]">
                        <Eye className="w-5 h-5" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div
                  className={cn(
                    '!px-4 flex flex-col justify-end gap-4',
                    viewMode === 'list' && 'flex-1',
                  )}
                >
                  <h3 className="text-xl font-bold text-gray-900 font-heading mb-3 group-hover:text-[#1a365d] transition-colors">
                    {project.title}
                  </h3>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#c9a962]" />
                      {project.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Ruler className="w-4 h-4 text-[#c9a962]" />
                      {project.area}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#c9a962]" />
                      {project.completedDate}
                    </div>
                  </div>

                  {viewMode === 'list' && (
                    <div className="mt-4 flex items-center gap-2 text-[#1a365d] font-semibold">
                      Xem chi tiết
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        <div className="mt-12 text-center !mt-4">
          <Button variant="outline" size="lg" className="!p-2">
            Xem thêm dự án
          </Button>
        </div>
      </Section>

      {/* CTA */}
      <Section variant="interior" padding="lg" className="!p-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Bạn có dự án tương tự?
          </h2>
          <p className="text-white/80 mb-6">
            Liên hệ để nhận tư vấn và báo giá miễn phí ngay hôm nay
          </p>
          <Link href="/noi-that/bao-gia">
            <Button
              variant="interior"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="!p-2"
            >
              Nhận báo giá
            </Button>
          </Link>
        </div>
      </Section>
    </>
  );
}
