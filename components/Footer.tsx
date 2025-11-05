import Link from "next/link";
import Image from "next/image";
import { getAllCategories } from "@/lib/posts";
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";
import type { Category } from "@/types/blog";

export default async function Footer() {
  let categories: Category[] = [];
  try {
    categories = await getAllCategories();
  } catch (error) {
    // Handle database connection errors gracefully during build
    console.warn("Could not fetch categories for footer:", error);
    categories = [];
  }

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#333333] bg-black mt-16 sm:mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-12">
          {/* About */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="relative flex-shrink-0">
                <Image src="/logo.png" alt="Hien Tensai" width={40} height={40} className="h-8 w-8 sm:h-10 sm:w-10 object-contain transition-transform group-hover:scale-105" />
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#4dd0e1] via-[#1f84ae] to-[#1597b3] bg-clip-text text-transparent group-hover:from-[#26c6da] group-hover:via-[#1a7fa9] group-hover:to-[#0d7a94] transition-all">
                Hien Tensai
              </span>
            </Link>
            <p className="text-[#b3b3b3] text-sm leading-relaxed mb-4">Chia sẻ về cuộc sống, học tập và du lịch</p>

            {/* Social Media Links */}
            <div className="flex items-center gap-4 lg:gap-6 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[#666666] hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[#666666] hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[#666666] hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[#666666] hover:text-white transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[#666666] hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Danh mục</h3>
            <ul className="space-y-2">
              {categories.slice(0, 5).map((category) => (
                <li key={category.id}>
                  <Link href={`/category/${category.slug}`} className="text-sm text-[#666666] hover:text-white transition-colors">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Liên kết</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/posts" className="text-sm text-[#666666] hover:text-white transition-colors font-medium">
                  Tất cả bài viết
                </Link>
              </li>
              <li>
                <Link href="/archive" className="text-sm text-[#666666] hover:text-white transition-colors">
                  Lưu trữ
                </Link>
              </li>
              <li>
                <Link href="/feed" className="text-sm text-[#666666] hover:text-white transition-colors">
                  RSS Feed
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#333333] pt-8 text-center text-sm text-[#808080]">
          <p>© {currentYear} Hien Tensai Blog. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}
