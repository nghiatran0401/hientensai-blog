import Link from "next/link";
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
    <footer className="border-t border-[#333333] bg-[#1a1a1a] mt-16 sm:mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-12">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Hiền Tensai</h3>
            <p className="text-[#b3b3b3] text-sm leading-relaxed mb-4">Chia sẻ về cuộc sống, học tập và du lịch</p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#2a2a2a] flex items-center justify-center text-[#b3b3b3] hover:bg-[#2c5aa0] hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#2a2a2a] flex items-center justify-center text-[#b3b3b3] hover:bg-[#2c5aa0] hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#2a2a2a] flex items-center justify-center text-[#b3b3b3] hover:bg-[#2c5aa0] hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#2a2a2a] flex items-center justify-center text-[#b3b3b3] hover:bg-[#2c5aa0] hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#2a2a2a] flex items-center justify-center text-[#b3b3b3] hover:bg-[#2c5aa0] hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
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
                  <Link href={`/category/${category.slug}`} className="text-sm text-[#b3b3b3] hover:text-white transition-colors">
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
                <Link href="/posts" className="text-sm text-[#b3b3b3] hover:text-white transition-colors">
                  Tất cả bài viết
                </Link>
              </li>
              <li>
                <Link href="/archive" className="text-sm text-[#b3b3b3] hover:text-white transition-colors">
                  Lưu trữ
                </Link>
              </li>
              <li>
                <Link href="/feed" className="text-sm text-[#b3b3b3] hover:text-white transition-colors">
                  RSS Feed
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#333333] pt-8 text-center text-sm text-[#808080]">
          <p>© {currentYear} Hiền Tensai Blog. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}
