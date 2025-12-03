"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { COMPANY_INFO, CONTACT_INFO } from "@/lib/constants";
import { Phone, MessageCircle, X, ArrowUp } from "lucide-react";

export function FloatingActions() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Fixed Call Button for Mobile */}
      <a
        href={`tel:${COMPANY_INFO.hotline.replace(/\s/g, "")}`}
        className="lg:hidden fixed bottom-4 left-4 z-50 flex items-center gap-2 px-4 py-3 bg-[#065f46] text-white rounded-full shadow-xl animate-pulse-slow"
      >
        <Phone className="w-5 h-5" />
        <span className="font-semibold">Gọi ngay</span>
      </a>

      {/* Floating Chat Buttons */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
        {/* Scroll to Top */}
        <button
          onClick={scrollToTop}
          className={cn(
            "w-12 h-12 bg-gray-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-gray-600",
            showScrollTop
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          )}
          aria-label="Lên đầu trang"
        >
          <ArrowUp className="w-5 h-5" />
        </button>

        {/* Chat Options */}
        <div
          className={cn(
            "flex flex-col gap-3 transition-all duration-300",
            isExpanded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          )}
        >
          {/* Zalo */}
          <a
            href={CONTACT_INFO.zaloOA}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3"
          >
            <span className="hidden group-hover:block bg-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium text-gray-700 whitespace-nowrap">
              Chat Zalo
            </span>
            <div className="w-12 h-12 bg-blue-500 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-white" viewBox="0 0 48 48" fill="currentColor">
                <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm9.76 25.03c-.53.53-1.23.82-1.97.82H17.5c-1.1 0-2-.9-2-2V17.5c0-1.1.9-2 2-2h14.29c.74 0 1.44.29 1.97.82.53.53.82 1.23.82 1.97v8.77c0 .74-.29 1.44-.82 1.97z" />
              </svg>
            </div>
          </a>

          {/* Messenger */}
          <a
            href={CONTACT_INFO.messenger}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3"
          >
            <span className="hidden group-hover:block bg-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium text-gray-700 whitespace-nowrap">
              Messenger
            </span>
            <div className="w-12 h-12 bg-gradient-to-br from-[#00B2FF] to-[#006AFF] rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
          </a>

          {/* Phone */}
          <a
            href={`tel:${COMPANY_INFO.hotline.replace(/\s/g, "")}`}
            className="group hidden lg:flex items-center gap-3"
          >
            <span className="hidden group-hover:block bg-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium text-gray-700 whitespace-nowrap">
              {COMPANY_INFO.hotline}
            </span>
            <div className="w-12 h-12 bg-green-500 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
              <Phone className="w-6 h-6 text-white" />
            </div>
          </a>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300",
            isExpanded
              ? "bg-gray-700 rotate-45"
              : "bg-gradient-to-br from-[#1a365d] to-[#065f46] animate-bounce"
          )}
          aria-label={isExpanded ? "Đóng" : "Liên hệ nhanh"}
        >
          {isExpanded ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-7 h-7 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 safe-area-bottom">
        <div className="grid grid-cols-4 divide-x divide-gray-200">
          <a
            href={`tel:${COMPANY_INFO.hotline.replace(/\s/g, "")}`}
            className="flex flex-col items-center justify-center py-3 text-[#065f46] hover:bg-gray-50"
          >
            <Phone className="w-5 h-5" />
            <span className="text-xs mt-1">Gọi điện</span>
          </a>
          <a
            href={CONTACT_INFO.zaloOA}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-3 text-blue-500 hover:bg-gray-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48" fill="currentColor">
              <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4z" />
            </svg>
            <span className="text-xs mt-1">Zalo</span>
          </a>
          <a
            href={CONTACT_INFO.messenger}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-3 text-blue-600 hover:bg-gray-50"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-xs mt-1">Messenger</span>
          </a>
          <a
            href="/lien-he"
            className="flex flex-col items-center justify-center py-3 text-[#1a365d] hover:bg-gray-50"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-xs mt-1">Báo giá</span>
          </a>
        </div>
      </div>
    </>
  );
}

