"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui";
import { MAIN_NAV, COMPANY_INFO } from "@/lib/constants";
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  Building2,
  Users,
  Search,
} from "lucide-react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  // Determine theme based on current path
  const isInteriorSection = pathname.startsWith("/noi-that");
  const isStaffingSection = pathname.startsWith("/nhan-su");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-gray-900 text-white text-sm py-2">
        <Container>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Hotline: <strong>{COMPANY_INFO.hotline}</strong>
              </span>
              <span>Email: {COMPANY_INFO.email}</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/noi-that"
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1 rounded transition-colors",
                  isInteriorSection
                    ? "bg-[#c9a962] text-[#1a365d]"
                    : "hover:bg-white/10"
                )}
              >
                <Building2 className="w-4 h-4" />
                Nội thất
              </Link>
              <Link
                href="/nhan-su"
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1 rounded transition-colors",
                  isStaffingSection
                    ? "bg-[#34d399] text-[#065f46]"
                    : "hover:bg-white/10"
                )}
              >
                <Users className="w-4 h-4" />
                Nhân sự
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white shadow-sm"
        )}
      >
        <Container>
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 lg:w-12 lg:h-12">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a365d] to-[#065f46] rounded-lg transform rotate-3 group-hover:rotate-6 transition-transform" />
                <div className="absolute inset-0 bg-white rounded-lg flex items-center justify-center font-bold text-lg lg:text-xl">
                  <span className="text-[#1a365d]">V</span>
                  <span className="text-[#065f46]">B</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="block font-heading font-bold text-xl text-gray-900">
                  {COMPANY_INFO.shortName}
                </span>
                <span className="block text-xs text-gray-500 uppercase tracking-wider">
                  Interior & Staffing
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {MAIN_NAV.map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 font-medium rounded-lg transition-colors",
                      pathname === item.href ||
                        (item.children && pathname.startsWith(item.href))
                        ? "text-[#1a365d] bg-gray-100"
                        : "text-gray-700 hover:text-[#1a365d] hover:bg-gray-50"
                    )}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform",
                          activeDropdown === item.label && "rotate-180"
                        )}
                      />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.children && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 pt-2 w-64">
                      <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                        {item.children.map((child) => (
                          <div key={child.href}>
                            {child.children ? (
                              <div className="px-4 py-2">
                                <span className="text-xs font-semibold uppercase text-gray-400 tracking-wider">
                                  {child.label}
                                </span>
                                <div className="mt-2 space-y-1">
                                  {child.children.map((subChild) => (
                                    <Link
                                      key={subChild.href}
                                      href={subChild.href}
                                      className="block px-3 py-2 text-sm text-gray-600 hover:text-[#1a365d] hover:bg-gray-50 rounded-lg transition-colors"
                                    >
                                      {subChild.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <Link
                                href={child.href}
                                className={cn(
                                  "block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors",
                                  pathname === child.href && "bg-gray-50 text-[#1a365d]"
                                )}
                              >
                                {child.label}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Tìm kiếm"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                href="/lien-he"
                className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-[#1a365d] text-white font-semibold rounded-lg hover:bg-[#2b4c7e] transition-colors shadow-lg"
              >
                <Phone className="w-4 h-4" />
                Liên hệ
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label={isOpen ? "Đóng menu" : "Mở menu"}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </Container>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            isOpen ? "max-h-[80vh] border-t border-gray-100" : "max-h-0"
          )}
        >
          <div className="bg-white py-4 max-h-[70vh] overflow-y-auto">
            <Container>
              {/* Division Switcher */}
              <div className="flex gap-2 mb-4">
                <Link
                  href="/noi-that"
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors",
                    isInteriorSection
                      ? "bg-[#1a365d] text-white"
                      : "bg-gray-100 text-gray-700"
                  )}
                >
                  <Building2 className="w-5 h-5" />
                  Nội thất
                </Link>
                <Link
                  href="/nhan-su"
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors",
                    isStaffingSection
                      ? "bg-[#065f46] text-white"
                      : "bg-gray-100 text-gray-700"
                  )}
                >
                  <Users className="w-5 h-5" />
                  Nhân sự
                </Link>
              </div>

              {/* Mobile Nav Items */}
              <nav className="space-y-1">
                {MAIN_NAV.map((item) => (
                  <MobileNavItem
                    key={item.href}
                    item={item}
                    pathname={pathname}
                  />
                ))}
              </nav>

              {/* Contact CTA */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <Link
                  href="/lien-he"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#1a365d] text-white font-semibold rounded-lg"
                >
                  <Phone className="w-5 h-5" />
                  Liên hệ ngay
                </Link>
                <p className="text-center text-gray-500 mt-3">
                  Hotline: <strong className="text-gray-900">{COMPANY_INFO.hotline}</strong>
                </p>
              </div>
            </Container>
          </div>
        </div>
      </header>
    </>
  );
}

// Mobile Nav Item Component
interface MobileNavItemProps {
  item: {
    label: string;
    href: string;
    children?: {
      label: string;
      href: string;
      children?: { label: string; href: string }[];
    }[];
  };
  pathname: string;
}

function MobileNavItem({ item, pathname }: MobileNavItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div>
      <div className="flex items-center">
        <Link
          href={item.href}
          className={cn(
            "flex-1 py-3 px-4 font-medium rounded-lg transition-colors",
            pathname === item.href
              ? "text-[#1a365d] bg-gray-100"
              : "text-gray-700"
          )}
        >
          {item.label}
        </Link>
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-3 text-gray-500"
          >
            <ChevronDown
              className={cn(
                "w-5 h-5 transition-transform",
                isExpanded && "rotate-180"
              )}
            />
          </button>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div className="pl-4 space-y-1">
          {item.children!.map((child) => (
            <div key={child.href}>
              {child.children ? (
                <div className="py-2">
                  <span className="text-xs font-semibold uppercase text-gray-400 px-4">
                    {child.label}
                  </span>
                  <div className="mt-1 space-y-1">
                    {child.children.map((subChild) => (
                      <Link
                        key={subChild.href}
                        href={subChild.href}
                        className="block py-2 px-4 text-sm text-gray-600"
                      >
                        {subChild.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={child.href}
                  className={cn(
                    "block py-2 px-4 text-gray-600 rounded-lg",
                    pathname === child.href && "text-[#1a365d] bg-gray-50"
                  )}
                >
                  {child.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

