'use client';

import { Section, SectionHeader } from '@/components/ui';
import { WHY_CHOOSE_US } from '@/lib/constants';
import { motion } from 'framer-motion';
import {
  Award,
  CheckCircle,
  Headphones,
  LucideIcon,
  PiggyBank,
  Shield,
  Users,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Award,
  CheckCircle,
  PiggyBank,
  Shield,
  Users,
  Headphones,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function WhyChooseUsSection() {
  return (
    <Section variant="gray" padding="xl" className="!p-4">
      <SectionHeader
        subtitle="Tại sao chọn chúng tôi"
        title="6 Lý Do Khách Hàng Tin Tưởng"
        description="Chúng tôi tự hào mang đến dịch vụ chất lượng hàng đầu với đội ngũ chuyên nghiệp và cam kết tận tâm"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 !mt-4 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {WHY_CHOOSE_US.map((item, index) => {
          const Icon = iconMap[item.icon] || Award;
          const isHighlighted = index === 0 || index === 3;

          return (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className={`group relative !p-4 lg:p-8 rounded-2xl transition-all duration-300 ${
                isHighlighted
                  ? 'bg-gradient-to-br from-[#1a365d] to-[#2b4c7e] text-white'
                  : 'bg-white hover:shadow-xl'
              }`}
            >
              {/* Number Badge */}
              <span
                className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  isHighlighted
                    ? 'bg-[#c9a962] text-[#1a365d]'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {String(item.id).padStart(2, '0')}
              </span>

              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${
                  isHighlighted ? 'bg-white/10' : 'bg-[#1a365d]/5'
                }`}
              >
                <Icon
                  className={`w-8 h-8 ${
                    isHighlighted ? 'text-[#c9a962]' : 'text-[#1a365d]'
                  }`}
                />
              </div>

              {/* Content */}
              <h3
                className={`text-xl font-bold font-heading mb-3 ${
                  isHighlighted ? 'text-white' : 'text-gray-900'
                }`}
              >
                {item.title}
              </h3>
              <p
                className={`leading-relaxed ${
                  isHighlighted ? 'text-white/80' : 'text-gray-600'
                }`}
              >
                {item.description}
              </p>

              {/* Decorative Element */}
              {isHighlighted && (
                <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10">
                  <Icon className="w-full h-full" />
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="!mt-4 text-center"
      >
        <p className="text-gray-600 mb-4">
          Bạn có câu hỏi? Đừng ngần ngại liên hệ với chúng tôi
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/lien-he"
            className="inline-flex items-center gap-2 !px-6 !py-3 bg-[#1a365d] text-white font-semibold rounded-lg hover:bg-[#2b4c7e] transition-colors"
          >
            <Headphones className="w-5 h-5" />
            Liên hệ tư vấn
          </a>
          <a
            href="tel:19001234"
            className="inline-flex items-center gap-2 !px-6 !py-3 border-2 border-[#1a365d] text-[#1a365d] font-semibold rounded-lg hover:bg-[#1a365d] hover:text-white transition-colors"
          >
            Hotline: 1900 1234
          </a>
        </div>
      </motion.div>
    </Section>
  );
}
