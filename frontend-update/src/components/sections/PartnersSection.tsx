'use client';

import { Section, SectionHeader } from '@/components/ui';
import { PARTNERS } from '@/lib/constants';
import { motion } from 'framer-motion';

export function PartnersSection() {
  // Duplicate for infinite scroll effect
  const duplicatedPartners = [...PARTNERS, ...PARTNERS];

  return (
    <Section padding="lg">
      <SectionHeader
        subtitle="Đối tác của chúng tôi"
        title="Được Tin Tưởng Bởi 200+ Doanh Nghiệp"
      />

      {/* Logo Carousel */}
      <div className="relative overflow-hidden !mt-4">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Scrolling Container */}
        <motion.div
          className="flex gap-12 py-8"
          animate={{
            x: [0, -50 * PARTNERS.length],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 30,
              ease: 'linear',
            },
          }}
        >
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex-shrink-0 w-40 h-20 bg-gray-50 rounded-xl flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 hover:shadow-lg"
            >
              {/* Placeholder for actual logos */}
              <span className="text-gray-400 font-semibold text-lg">
                {partner.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { value: '10+', label: 'Năm hoạt động' },
          { value: '1000+', label: 'Dự án hoàn thành' },
          { value: '500+', label: 'Nhân viên' },
          { value: '200+', label: 'Đối tác doanh nghiệp' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <span className="block text-4xl md:text-5xl font-bold text-[#1a365d] font-heading">
              {stat.value}
            </span>
            <span className="text-gray-600">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
