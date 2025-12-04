'use client';

import { Button, Container } from '@/components/ui';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Building2,
  ChevronLeft,
  ChevronRight,
  Play,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface HeroSlide {
  id: string;
  type: 'interior' | 'staffing';
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
}

const heroSlides: HeroSlide[] = [
  {
    id: 'interior-1',
    type: 'interior',
    title: 'Thiết kế & Thi công Nội thất',
    subtitle: 'Biến Ý Tưởng Thành Hiện Thực',
    description:
      'Chuyên thiết kế thi công nội thất cao cấp: showroom, nhà hàng, văn phòng, cửa hàng. ALU, CNC, bảng hiệu chất lượng hàng đầu Việt Nam.',
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&h=1080&fit=crop',
    cta: { text: 'Xem dự án', href: '/noi-that/du-an' },
    secondaryCta: { text: 'Nhận báo giá', href: '/noi-that/bao-gia' },
  },
  {
    id: 'staffing-1',
    type: 'staffing',
    title: 'Cung ứng Nhân sự Chuyên nghiệp',
    subtitle: 'Kết Nối Nhân Tài',
    description:
      'Giải pháp cung ứng nhân sự toàn diện: kho vận, logistics, sản xuất, lao động phổ thông. Nhanh chóng, tin cậy, chi phí tối ưu.',
    image:
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&h=1080&fit=crop',
    cta: { text: 'Tìm việc làm', href: '/nhan-su/viec-lam' },
    secondaryCta: { text: 'Doanh nghiệp', href: '/nhan-su/doanh-nghiep' },
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
  };

  const slide = heroSlides[currentSlide];
  const isInterior = slide.type === 'interior';

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen overflow-hidden !px-4">
      {/* Background Slides */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={slide.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
          }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          {/* Overlay */}
          <div
            className={cn(
              'absolute inset-0',
              isInterior
                ? 'bg-gradient-to-r from-[#1a365d]/95 via-[#1a365d]/80 to-transparent'
                : 'bg-gradient-to-r from-[#065f46]/95 via-[#065f46]/80 to-transparent',
            )}
          />
          {/* Pattern Overlay */}
          <div className="absolute inset-0 bg-mesh-pattern opacity-30" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-[90vh] lg:min-h-screen ">
        <Container>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="text-white py-12 lg:py-0"
              >
                {/* Division Badge */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center',
                      isInterior ? 'bg-[#c9a962]' : 'bg-[#34d399]',
                    )}
                  >
                    {isInterior ? (
                      <Building2 className="w-6 h-6 text-[#1a365d]" />
                    ) : (
                      <Users className="w-6 h-6 text-[#065f46]" />
                    )}
                  </div>
                  <span
                    className={cn(
                      'px-4 py-1.5 rounded-full text-sm font-medium',
                      isInterior
                        ? 'bg-[#c9a962]/20 text-[#c9a962]'
                        : 'bg-[#34d399]/20 text-[#34d399]',
                    )}
                  >
                    {isInterior ? 'Nội thất' : 'Nhân sự'}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-heading leading-tight mb-4">
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p
                  className={cn(
                    'text-xl md:text-2xl font-medium mb-6',
                    isInterior ? 'text-[#c9a962]' : 'text-[#34d399]',
                  )}
                >
                  {slide.subtitle}
                </p>

                {/* Description */}
                <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-xl">
                  {slide.description}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4 !mb-2">
                  <Link href={slide.cta.href}>
                    <Button
                      variant={isInterior ? 'interior' : 'staffing'}
                      size="lg"
                      className="!p-2"
                      rightIcon={<ArrowRight className="w-5 h-5" />}
                    >
                      {slide.cta.text}
                    </Button>
                  </Link>
                  {slide.secondaryCta && (
                    <Link href={slide.secondaryCta.href}>
                      <Button
                        variant="outline"
                        size="lg"
                        className="!p-[6px] border-white/30 text-white hover:bg-white/10"
                        leftIcon={<Play className="w-5 h-5" />}
                      >
                        {slide.secondaryCta.text}
                      </Button>
                    </Link>
                  )}
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/20">
                  {isInterior ? (
                    <>
                      <div>
                        <span className="block text-3xl font-bold text-[#c9a962]">
                          1000+
                        </span>
                        <span className="text-white/70">Dự án hoàn thành</span>
                      </div>
                      <div>
                        <span className="block text-3xl font-bold text-[#c9a962]">
                          10+
                        </span>
                        <span className="text-white/70">Năm kinh nghiệm</span>
                      </div>
                      <div>
                        <span className="block text-3xl font-bold text-[#c9a962]">
                          5★
                        </span>
                        <span className="text-white/70">Đánh giá</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <span className="block text-3xl font-bold text-[#34d399]">
                          500+
                        </span>
                        <span className="text-white/70">Nhân viên</span>
                      </div>
                      <div>
                        <span className="block text-3xl font-bold text-[#34d399]">
                          200+
                        </span>
                        <span className="text-white/70">Đối tác</span>
                      </div>
                      <div>
                        <span className="block text-3xl font-bold text-[#34d399]">
                          50+
                        </span>
                        <span className="text-white/70">Việc làm mới</span>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Right Side - Division Quick Links */}
            <div className="hidden lg:flex flex-col gap-6 justify-center">
              {/* Quick Switch Cards */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4 flex flex-col gap-4"
              >
                <Link
                  href="/noi-that"
                  className={cn(
                    'group block !p-6 rounded-2xl backdrop-blur-md transition-all duration-300',
                    currentSlide === 0
                      ? 'bg-white/20 border border-white/30'
                      : 'bg-white/10 hover:bg-white/20',
                  )}
                  onClick={() => setCurrentSlide(0)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-[#c9a962] rounded-xl flex items-center justify-center">
                      <Building2 className="w-7 h-7 text-[#1a365d]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white">Nội thất</h3>
                      <p className="text-white/70">
                        Thiết kế, thi công ALU, CNC, bảng hiệu
                      </p>
                    </div>
                    <ArrowRight className="w-6 h-6 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>

                <Link
                  href="/nhan-su"
                  className={cn(
                    'group block !p-6 rounded-2xl backdrop-blur-md transition-all duration-300',
                    currentSlide === 1
                      ? 'bg-white/20 border border-white/30'
                      : 'bg-white/10 hover:bg-white/20',
                  )}
                  onClick={() => setCurrentSlide(1)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-[#34d399] rounded-xl flex items-center justify-center">
                      <Users className="w-7 h-7 text-[#065f46]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white">Nhân sự</h3>
                      <p className="text-white/70">
                        Cung ứng, tuyển dụng, outsourcing
                      </p>
                    </div>
                    <ArrowRight className="w-6 h-6 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </Container>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <Container>
          <div className="flex items-center justify-between">
            {/* Slide Indicators */}
            <div className="flex items-center gap-3">
              {heroSlides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setDirection(i > currentSlide ? 1 : -1);
                    setCurrentSlide(i);
                  }}
                  className={cn(
                    'transition-all duration-300 p-2',
                    currentSlide === i
                      ? cn(
                          'w-10 h-3 rounded-full',
                          s.type === 'interior'
                            ? 'bg-[#c9a962]'
                            : 'bg-[#34d399]',
                        )
                      : 'w-3 h-3 rounded-full bg-white/50 hover:bg-white/70',
                  )}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrow Controls */}
            <div className="flex items-center justify-center gap-2 w-full">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile Division Quick Switch */}
      <div className="lg:hidden absolute bottom-24 left-0 right-0 z-20 px-4">
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentSlide(0)}
            className={cn(
              'flex-1 py-3 rounded-xl font-medium transition-all',
              currentSlide === 0
                ? 'bg-[#c9a962] text-[#1a365d]'
                : 'bg-white/10 text-white',
            )}
          >
            Nội thất
          </button>
          <button
            onClick={() => setCurrentSlide(1)}
            className={cn(
              'flex-1 py-3 rounded-xl font-medium transition-all',
              currentSlide === 1
                ? 'bg-[#34d399] text-[#065f46]'
                : 'bg-white/10 text-white',
            )}
          >
            Nhân sự
          </button>
        </div>
      </div>
    </section>
  );
}
