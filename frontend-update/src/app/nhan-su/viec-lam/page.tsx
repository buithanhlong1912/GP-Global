'use client';

import { Badge, Button, Card, Container, Section } from '@/components/ui';
import { EMPLOYMENT_TYPES, JOB_CATEGORIES, LOCATIONS } from '@/lib/constants';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Briefcase,
  Building,
  Clock,
  DollarSign,
  Filter,
  Flame,
  MapPin,
  Search,
  X,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

// Dummy jobs data
const dummyJobs = [
  {
    id: '1',
    title: 'Nhân viên Kho vận - Bốc xếp',
    company: 'Lazada Express',
    companyLogo: null,
    location: 'Bình Dương',
    salary: '10 - 15 triệu',
    employmentType: 'full-time',
    category: 'logistics',
    description:
      'Tiếp nhận, kiểm đếm và sắp xếp hàng hóa trong kho. Làm việc theo ca.',
    requirements: ['Nam, 18-40 tuổi', 'Sức khỏe tốt', 'Không cần kinh nghiệm'],
    isHot: true,
    isUrgent: false,
    publishedAt: '2024-03-15',
    deadline: '2024-04-15',
  },
  {
    id: '2',
    title: 'Công nhân Sản xuất Điện tử',
    company: 'Samsung Electronics Vietnam',
    companyLogo: null,
    location: 'Bắc Ninh',
    salary: '8 - 12 triệu',
    employmentType: 'full-time',
    category: 'san-xuat',
    description: 'Lắp ráp linh kiện điện tử theo dây chuyền sản xuất.',
    requirements: ['Nam/Nữ 18-35 tuổi', 'Tốt nghiệp THPT', 'Chấp nhận OT'],
    isHot: false,
    isUrgent: true,
    publishedAt: '2024-03-16',
    deadline: '2024-04-30',
  },
  {
    id: '3',
    title: 'Nhân viên Giao hàng - Shipper',
    company: 'Shopee Express',
    companyLogo: null,
    location: 'TP. Hồ Chí Minh',
    salary: '12 - 18 triệu',
    employmentType: 'full-time',
    category: 'logistics',
    description: 'Giao hàng cho khách hàng trong khu vực được phân công.',
    requirements: ['Có xe máy', 'Biết đường TP.HCM', 'Điện thoại smartphone'],
    isHot: true,
    isUrgent: true,
    publishedAt: '2024-03-14',
    deadline: '2024-04-01',
  },
  {
    id: '4',
    title: 'Nhân viên Bán hàng - Thu ngân',
    company: 'Circle K',
    companyLogo: null,
    location: 'TP. Hồ Chí Minh',
    salary: '7 - 9 triệu',
    employmentType: 'part-time',
    category: 'ban-hang',
    description: 'Bán hàng, thu ngân, sắp xếp hàng hóa tại cửa hàng tiện lợi.',
    requirements: ['Nam/Nữ 18-30 tuổi', 'Chăm chỉ', 'Làm ca đêm được'],
    isHot: false,
    isUrgent: false,
    publishedAt: '2024-03-10',
    deadline: '2024-04-10',
  },
  {
    id: '5',
    title: 'Lái xe Tải',
    company: 'GHTK - Giao Hàng Tiết Kiệm',
    companyLogo: null,
    location: 'Đồng Nai',
    salary: '15 - 22 triệu',
    employmentType: 'full-time',
    category: 'logistics',
    description: 'Lái xe tải giao hàng liên tỉnh, bảo quản hàng hóa.',
    requirements: ['Bằng lái B2/C', 'Kinh nghiệm 2 năm', 'Không vi phạm'],
    isHot: true,
    isUrgent: false,
    publishedAt: '2024-03-12',
    deadline: '2024-04-20',
  },
  {
    id: '6',
    title: 'Thợ Hàn - Cơ khí',
    company: 'Công ty TNHH ABC',
    companyLogo: null,
    location: 'Bình Dương',
    salary: '12 - 16 triệu',
    employmentType: 'full-time',
    category: 'ky-thuat',
    description: 'Hàn các sản phẩm cơ khí theo bản vẽ kỹ thuật.',
    requirements: ['Có chứng chỉ hàn', 'Kinh nghiệm 1 năm', 'Đọc bản vẽ'],
    isHot: false,
    isUrgent: true,
    publishedAt: '2024-03-13',
    deadline: '2024-04-13',
  },
];

export default function JobsPage() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('category');

  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(
    categoryFromUrl || '',
  );
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredJobs = useMemo(() => {
    return dummyJobs.filter((job) => {
      const matchKeyword =
        searchKeyword === '' ||
        job.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        job.company.toLowerCase().includes(searchKeyword.toLowerCase());

      const matchCategory =
        selectedCategory === '' || job.category === selectedCategory;

      const matchLocation =
        selectedLocation === '' ||
        job.location.toLowerCase().includes(selectedLocation.toLowerCase());

      const matchType =
        selectedType === '' || job.employmentType === selectedType;

      return matchKeyword && matchCategory && matchLocation && matchType;
    });
  }, [searchKeyword, selectedCategory, selectedLocation, selectedType]);

  const clearFilters = () => {
    setSearchKeyword('');
    setSelectedCategory('');
    setSelectedLocation('');
    setSelectedType('');
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-staffing-gradient py-12 lg:py-16">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-4">
              Tìm Việc Làm Phù Hợp
            </h1>
            <p className="text-lg text-white/80">
              Hàng trăm cơ hội việc làm với mức lương hấp dẫn đang chờ bạn
            </p>
          </div>

          {/* Search Box */}
          <div className="bg-white rounded-2xl p-4 shadow-xl">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm việc làm, công ty..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#065f46]"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#065f46] min-w-[150px]"
                >
                  <option value="">Tất cả địa điểm</option>
                  {LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.label}>
                      {loc.label}
                    </option>
                  ))}
                </select>
                <Button
                  variant="staffing"
                  className="px-8"
                  leftIcon={<Search className="w-5 h-5" />}
                >
                  Tìm kiếm
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <Section padding="lg">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <Card className="sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Bộ lọc</h3>
                {(selectedCategory || selectedLocation || selectedType) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-[#065f46] hover:underline"
                  >
                    Xóa tất cả
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Ngành nghề</h4>
                <div className="space-y-2">
                  {JOB_CATEGORIES.map((cat) => (
                    <label
                      key={cat.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat.id}
                        onChange={() =>
                          setSelectedCategory(
                            selectedCategory === cat.id ? '' : cat.id,
                          )
                        }
                        className="w-4 h-4 text-[#065f46] focus:ring-[#065f46]"
                      />
                      <span className="text-gray-600">{cat.title}</span>
                      <span className="ml-auto text-xs text-gray-400">
                        ({cat.count})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Employment Type Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Loại hình</h4>
                <div className="space-y-2">
                  {EMPLOYMENT_TYPES.map((type) => (
                    <label
                      key={type.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="type"
                        checked={selectedType === type.id}
                        onChange={() =>
                          setSelectedType(
                            selectedType === type.id ? '' : type.id,
                          )
                        }
                        className="w-4 h-4 text-[#065f46] focus:ring-[#065f46]"
                      />
                      <span className="text-gray-600">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Địa điểm</h4>
                <div className="space-y-2">
                  {LOCATIONS.map((loc) => (
                    <label
                      key={loc.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="location"
                        checked={selectedLocation === loc.label}
                        onChange={() =>
                          setSelectedLocation(
                            selectedLocation === loc.label ? '' : loc.label,
                          )
                        }
                        className="w-4 h-4 text-[#065f46] focus:ring-[#065f46]"
                      />
                      <span className="text-gray-600">{loc.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </Card>
          </aside>

          {/* Mobile Filters */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700"
            >
              <Filter className="w-5 h-5" />
              Bộ lọc
              {(selectedCategory || selectedType) && (
                <Badge variant="staffing" size="sm">
                  {[selectedCategory, selectedType].filter(Boolean).length}
                </Badge>
              )}
            </button>

            {/* Mobile Filter Modal */}
            {showFilters && (
              <div className="fixed inset-0 z-50 bg-black/50">
                <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg">Bộ lọc</h3>
                    <button onClick={() => setShowFilters(false)}>
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Same filter content as desktop */}
                  {/* ... */}

                  <Button
                    variant="staffing"
                    fullWidth
                    className="mt-6"
                    onClick={() => setShowFilters(false)}
                  >
                    Áp dụng
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Jobs List */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Tìm thấy{' '}
                <strong className="text-gray-900">{filteredJobs.length}</strong>{' '}
                việc làm
              </p>
              <select className="px-4 py-2 rounded-lg border border-gray-200 text-sm">
                <option>Mới nhất</option>
                <option>Lương cao nhất</option>
                <option>Gấp nhất</option>
              </select>
            </div>

            {/* Jobs Grid */}
            <div className="space-y-4">
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/nhan-su/viec-lam/${job.id}`}>
                    <Card
                      variant="interactive"
                      className="group flex flex-col md:flex-row gap-4"
                    >
                      {/* Company Logo */}
                      <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Building className="w-8 h-8 text-gray-400" />
                      </div>

                      {/* Job Info */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
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

                        <p className="text-gray-600 mb-3">{job.company}</p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1 text-[#065f46] font-semibold">
                            <DollarSign className="w-4 h-4" />
                            {job.salary}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            Hạn: {job.deadline}
                          </span>
                        </div>

                        {/* Requirements Preview */}
                        <div className="flex flex-wrap gap-2 mt-3">
                          {job.requirements.slice(0, 3).map((req, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                            >
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action */}
                      <div className="flex md:flex-col items-center gap-2 md:gap-4">
                        <Badge variant="staffing">
                          {
                            EMPLOYMENT_TYPES.find(
                              (t) => t.id === job.employmentType,
                            )?.label
                          }
                        </Badge>
                        <span className="hidden md:flex items-center gap-1 text-[#065f46] font-semibold group-hover:gap-2 transition-all">
                          Chi tiết
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            {filteredJobs.length > 0 && (
              <div className="mt-10 text-center">
                <Button variant="outline" size="lg">
                  Xem thêm việc làm
                </Button>
              </div>
            )}

            {/* No Results */}
            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Không tìm thấy việc làm
                </h3>
                <p className="text-gray-600 mb-4">
                  Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                </p>
                <Button variant="staffing" onClick={clearFilters}>
                  Xóa bộ lọc
                </Button>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section variant="staffing" padding="lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Không tìm thấy việc phù hợp?
            </h2>
            <p className="text-white/80">
              Đăng ký hồ sơ để chúng tôi tìm việc phù hợp cho bạn
            </p>
          </div>
          <Link href="/nhan-su/dang-ky">
            <Button
              variant="staffing"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Đăng ký ứng viên
            </Button>
          </Link>
        </div>
      </Section>
    </>
  );
}
