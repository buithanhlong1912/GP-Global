'use client';

import { Container } from '@/components/ui';
import {
  COMPANY_INFO,
  INTERIOR_NAV,
  SOCIAL_LINKS,
  STAFFING_NAV,
} from '@/lib/constants';
import {
  ArrowUp,
  Building2,
  Clock,
  ExternalLink,
  Facebook,
  FileText,
  Linkedin,
  Mail,
  MapPin,
  Newspaper,
  Phone,
  Users,
  Youtube,
} from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 !p-4">
      {/* Main Footer */}
      <div className="py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-3 mb-6">
                <div className="relative w-12 h-12">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c9a962] to-[#34d399] rounded-lg transform rotate-3" />
                  <div className="absolute inset-0 bg-gray-900 rounded-lg flex items-center justify-center font-bold text-xl">
                    <span className="text-[#c9a962]">V</span>
                    <span className="text-[#34d399]">B</span>
                  </div>
                </div>
                <div>
                  <span className="block font-heading font-bold text-xl text-white">
                    {COMPANY_INFO.name}
                  </span>
                  <span className="block text-xs text-gray-500">
                    Interior & Staffing
                  </span>
                </div>
              </Link>

              <p className="text-gray-400 mb-6 leading-relaxed">
                {COMPANY_INFO.description}
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.zalo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors"
                  aria-label="Zalo"
                >
                  <span className="text-sm font-bold">Zalo</span>
                </a>
              </div>
            </div>

            {/* Interior Links */}
            <div>
              <h4 className="flex items-center gap-2 text-white font-semibold text-lg mb-6">
                <Building2 className="w-5 h-5 text-[#c9a962]" />
                Nội thất
              </h4>
              <ul className="space-y-3">
                {INTERIOR_NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-[#c9a962] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Staffing Links */}
            <div>
              <h4 className="flex items-center gap-2 text-white font-semibold text-lg mb-6">
                <Users className="w-5 h-5 text-[#34d399]" />
                Nhân sự
              </h4>
              <ul className="space-y-3">
                {STAFFING_NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-[#34d399] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <h4 className="flex items-center gap-2 text-white font-semibold text-lg mt-8 mb-4">
                <Newspaper className="w-5 h-5 text-gray-500" />
                Khác
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/tin-tuc"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Tin tức
                  </Link>
                </li>
                <li>
                  <Link
                    href="/lien-he"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Liên hệ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-6">
                Thông tin liên hệ
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#c9a962] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">{COMPANY_INFO.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#34d399] flex-shrink-0" />
                  <div>
                    <a
                      href={`tel:${COMPANY_INFO.hotline.replace(/\s/g, '')}`}
                      className="text-white font-semibold text-lg hover:text-[#34d399] transition-colors"
                    >
                      {COMPANY_INFO.hotline}
                    </a>
                    <span className="block text-sm text-gray-500">
                      Hotline 24/7
                    </span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  <span className="text-gray-400">T2 - T7: 8:00 - 18:00</span>
                </li>
              </ul>

              {/* Company Profile Download */}
              <div className="mt-6 p-4 bg-gray-800 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#c9a962]/20 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#c9a962]" />
                  </div>
                  <div className="flex-1">
                    <span className="block text-white font-medium">
                      Hồ sơ năng lực
                    </span>
                    <span className="block text-sm text-gray-500">
                      PDF • 5.2 MB
                    </span>
                  </div>
                  <a
                    href="/documents/company-profile.pdf"
                    download
                    className="!p-2 bg-[#c9a962] text-gray-900 rounded-lg hover:bg-[#b8963d] transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500 text-center md:text-left">
              © {currentYear} {COMPANY_INFO.name}. Tất cả quyền được bảo lưu.
              <br className="md:hidden" />
              <span className="hidden md:inline"> | </span>
              MST: {COMPANY_INFO.taxId}
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/dieu-khoan"
                className="text-gray-500 hover:text-white transition-colors"
              >
                Điều khoản
              </Link>
              <Link
                href="/chinh-sach"
                className="text-gray-500 hover:text-white transition-colors"
              >
                Chính sách
              </Link>
              <button
                onClick={scrollToTop}
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#1a365d] transition-colors"
                aria-label="Lên đầu trang"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
