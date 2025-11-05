"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { X, Menu } from "lucide-react";
import type { Category } from "@/types/blog";

interface MobileMenuProps {
  categories: Category[];
}

export default function MobileMenu({ categories }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle mounting for portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const drawerContent =
    isOpen && mounted ? (
      <>
        {/* Backdrop with smooth fade - behind menu */}
        <div className="fixed inset-0 bg-black/50 transition-opacity z-[9999] md:hidden" onClick={() => setIsOpen(false)} aria-hidden="true" />

        {/* Menu Panel - Slide from right - in front */}
        <div className="fixed right-0 top-0 h-full w-72 sm:w-80 bg-white shadow-2xl overflow-y-auto z-[10000] md:hidden transform translate-x-0 transition-transform duration-300 ease-out">
          {/* Header with brand and close button */}
          <div className="sticky top-0 bg-white border-b border-[#e5e5e5] px-6 py-4 flex items-center justify-between z-10 shadow-sm">
            <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 hover:opacity-80 transition-opacity group">
              <div className="relative flex-shrink-0">
                <Image src="/logo.png" alt="Hien Tensai" width={32} height={32} className="h-8 w-8 object-contain" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-[#4dd0e1] via-[#1f84ae] to-[#1597b3] bg-clip-text text-transparent group-hover:from-[#26c6da] group-hover:via-[#1a7fa9] group-hover:to-[#0d7a94] transition-all">
                Hien Tensai
              </span>
            </Link>
            <button onClick={() => setIsOpen(false)} className="p-1.5 text-[#666666] hover:text-[#1a1a1a] hover:bg-[#f5f5f5] rounded-full transition-colors" aria-label="Close menu">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Content */}
          <nav className="px-6 py-6">
            <div className="space-y-8">
              {/* Main Links */}
              <div>
                <Link href="/posts" onClick={() => setIsOpen(false)} className="block py-3 text-base font-semibold text-[#1a1a1a] hover:text-[#2c5aa0] transition-colors border-b border-[#e5e5e5]">
                  Bài viết
                </Link>
              </div>

              {/* Categories */}
              {categories.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-[#999999] uppercase tracking-wider mb-4">Danh mục</h3>
                  <ul className="space-y-1">
                    {categories.slice(0, 8).map((category) => (
                      <li key={category.id}>
                        <Link
                          href={`/category/${category.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="block py-2.5 text-base text-[#666666] hover:text-[#2c5aa0] hover:bg-[#f5f5f5] rounded-md px-2 -mx-2 transition-colors"
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Additional Links */}
              <div>
                <h3 className="text-xs font-semibold text-[#999999] uppercase tracking-wider mb-4">Khác</h3>
                <ul className="space-y-1">
                  <li>
                    <Link href="/archive" onClick={() => setIsOpen(false)} className="block py-2.5 text-base text-[#666666] hover:text-[#2c5aa0] hover:bg-[#f5f5f5] rounded-md px-2 -mx-2 transition-colors">
                      Lưu trữ
                    </Link>
                  </li>
                  <li>
                    <Link href="/search" onClick={() => setIsOpen(false)} className="block py-2.5 text-base text-[#666666] hover:text-[#2c5aa0] hover:bg-[#f5f5f5] rounded-md px-2 -mx-2 transition-colors">
                      Tìm kiếm
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </>
    ) : null;

  return (
    <>
      {/* Hamburger Button */}
      <button onClick={() => setIsOpen(true)} className="md:hidden p-2 -mr-2 text-[#666666] hover:text-[#1a1a1a] transition-colors" aria-label="Open menu">
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Menu Overlay - Rendered via Portal */}
      {mounted && createPortal(drawerContent, document.body)}
    </>
  );
}
