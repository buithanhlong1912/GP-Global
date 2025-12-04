import {
  Badge,
  Button,
  Card,
  Container,
  Section,
  SectionHeader,
} from '@/components/ui';
import { INTERIOR_SERVICES } from '@/lib/constants';
import {
  ArrowRight,
  Building2,
  Coffee,
  Layers,
  Palette,
  Phone,
  Settings,
  ShieldCheck,
  Signpost,
  Store,
} from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Thiết kế & Thi công Nội thất',
  description:
    'Dịch vụ thiết kế thi công nội thất chuyên nghiệp: showroom, nhà hàng, cafe, văn phòng, ALU, CNC, bảng hiệu. 10+ năm kinh nghiệm, 1000+ dự án hoàn thành.',
  keywords:
    'thiết kế nội thất, thi công nội thất, ALU, CNC, bảng hiệu, showroom, nhà hàng, cafe, văn phòng',
};

const iconMap: Record<string, React.ReactNode> = {
  Palette: <Palette className="w-8 h-8" />,
  Layers: <Layers className="w-8 h-8" />,
  Settings: <Settings className="w-8 h-8" />,
  Signpost: <Signpost className="w-8 h-8" />,
  Coffee: <Coffee className="w-8 h-8" />,
  Store: <Store className="w-8 h-8" />,
};

// Dummy projects
const featuredProjects = [
  {
    id: '1',
    title: 'Showroom BMW Phú Mỹ Hưng',
    category: 'Showroom',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    area: '1,500 m²',
  },
  {
    id: '2',
    title: 'Nhà hàng Golden Dragon',
    category: 'Nhà hàng',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
    area: '600 m²',
  },
  {
    id: '3',
    title: 'Highlands Coffee Landmark',
    category: 'Cafe',
    image:
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop',
    area: '350 m²',
  },
];

export default function InteriorPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative min-h-[70vh] flex items-center bg-interior-gradient overflow-hidden">
        <div className="absolute inset-0 bg-mesh-pattern opacity-30" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920)',
          }}
        />

        <Container className="relative z-10 py-20">
          <div className="max-w-3xl">
            <Badge
              variant="interior"
              className="mb-6 bg-[#c9a962] text-[#1a365d]"
            >
              <Building2 className="w-4 h-4 mr-1" />
              Nội thất
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-6">
              Thiết kế & Thi công
              <span className="text-[#c9a962]"> Nội Thất</span> Chuyên Nghiệp
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Biến ý tưởng thành hiện thực với đội ngũ thiết kế và thi công hàng
              đầu. Từ showroom đến nhà hàng, từ ALU đến bảng hiệu - Chúng tôi
              làm được tất cả.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/noi-that/du-an">
                <Button
                  variant="interior"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Xem dự án
                </Button>
              </Link>
              <Link href="/noi-that/bao-gia">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-[#1a365d]"
                >
                  Nhận báo giá miễn phí
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/20">
              <div>
                <span className="block text-4xl font-bold text-[#c9a962]">
                  1000+
                </span>
                <span className="text-white/70">Dự án hoàn thành</span>
              </div>
              <div>
                <span className="block text-4xl font-bold text-[#c9a962]">
                  10+
                </span>
                <span className="text-white/70">Năm kinh nghiệm</span>
              </div>
              <div>
                <span className="block text-4xl font-bold text-[#c9a962]">
                  100%
                </span>
                <span className="text-white/70">Khách hàng hài lòng</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <Section padding="xl">
        <SectionHeader
          subtitle="Dịch vụ của chúng tôi"
          title="Giải Pháp Nội Thất Toàn Diện"
          description="Từ thiết kế đến thi công, từ ý tưởng đến thực tế - Chúng tôi cung cấp dịch vụ trọn gói"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INTERIOR_SERVICES.map((service, index) => (
            <Link
              key={service.id}
              href={`/noi-that/dich-vu/${service.id}`}
              className="group"
            >
              <Card
                variant="interactive"
                className="h-full p-0 overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(https://images.unsplash.com/photo-161822119571${index}-dd6b41faaea6?w=600&h=400&fit=crop)`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Icon */}
                  <div className="absolute bottom-4 left-4 w-14 h-14 bg-[#c9a962] rounded-xl flex items-center justify-center text-[#1a365d]">
                    {iconMap[service.icon]}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 font-heading mb-2 group-hover:text-[#1a365d] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <span className="inline-flex items-center gap-2 text-[#1a365d] font-semibold group-hover:gap-3 transition-all">
                    Xem chi tiết
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      {/* Process Section */}
      <Section variant="gray" padding="xl">
        <SectionHeader
          subtitle="Quy trình làm việc"
          title="4 Bước Để Có Không Gian Hoàn Hảo"
        />

        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              step: 1,
              title: 'Tư vấn & Khảo sát',
              description:
                'Lắng nghe nhu cầu, khảo sát thực tế và đưa ra giải pháp phù hợp',
              icon: <Phone className="w-6 h-6" />,
            },
            {
              step: 2,
              title: 'Thiết kế & Báo giá',
              description:
                'Thiết kế 2D/3D chuyên nghiệp và báo giá chi tiết, minh bạch',
              icon: <Palette className="w-6 h-6" />,
            },
            {
              step: 3,
              title: 'Thi công',
              description:
                'Thi công đúng tiến độ, đảm bảo chất lượng theo thiết kế',
              icon: <Settings className="w-6 h-6" />,
            },
            {
              step: 4,
              title: 'Bàn giao & Bảo hành',
              description: 'Bàn giao công trình hoàn chỉnh, bảo hành dài hạn',
              icon: <ShieldCheck className="w-6 h-6" />,
            },
          ].map((item) => (
            <div key={item.step} className="relative">
              {/* Connector Line */}
              {item.step < 4 && (
                <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-[#c9a962]" />
              )}

              <div className="relative bg-white p-6 rounded-2xl text-center">
                {/* Step Number */}
                <div className="w-20 h-20 mx-auto mb-4 bg-[#1a365d] rounded-full flex items-center justify-center text-white relative z-10">
                  <span className="text-2xl font-bold">{item.step}</span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Featured Projects */}
      <Section padding="xl">
        <SectionHeader
          subtitle="Dự án tiêu biểu"
          title="Những Công Trình Ấn Tượng"
        />

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {featuredProjects.map((project) => (
            <Link
              key={project.id}
              href={`/noi-that/du-an/${project.id}`}
              className="group"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <Badge variant="interior" className="mb-3">
                    {project.category}
                  </Badge>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {project.title}
                  </h3>
                  <p className="text-white/70">{project.area}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/noi-that/du-an">
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Xem tất cả dự án
            </Button>
          </Link>
        </div>
      </Section>

      {/* CTA Section */}
      <Section variant="interior" padding="lg">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">
            Bạn có dự án cần tư vấn?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Liên hệ ngay để nhận báo giá miễn phí và tư vấn chuyên nghiệp từ đội
            ngũ của chúng tôi.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/noi-that/bao-gia">
              <Button
                variant="interior"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Nhận báo giá ngay
              </Button>
            </Link>
            <a href="tel:19001234">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-[#1a365d]"
                leftIcon={<Phone className="w-5 h-5" />}
              >
                Hotline: 1900 1234
              </Button>
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
