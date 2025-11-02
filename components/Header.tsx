import Link from "next/link";
import { getAllCategories } from "@/lib/posts";
import MobileMenu from "@/components/MobileMenu";
import type { Category } from "@/types/blog";

export default async function Header() {
  let categories: Category[] = [];
  try {
    categories = await getAllCategories();
  } catch (error) {
    // Handle database connection errors gracefully during build
    console.warn("Could not fetch categories for header:", error);
    categories = [];
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#e5e5e5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="text-lg sm:text-xl font-semibold text-[#1a1a1a] hover:text-[#2c5aa0] transition-colors">
            Hiền Tensai
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <Link href="/posts" className="text-sm text-[#666666] hover:text-[#1a1a1a] transition-colors font-medium">
              Bài viết
            </Link>
            {categories.slice(0, 4).map((category) => (
              <Link key={category.id} href={`/category/${category.slug}`} className="text-sm text-[#666666] hover:text-[#1a1a1a] transition-colors">
                {category.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu */}
          <MobileMenu categories={categories} />
        </nav>
      </div>
    </header>
  );
}
