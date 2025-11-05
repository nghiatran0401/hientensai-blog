import Link from "next/link";
import Image from "next/image";
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
          <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity group">
            <div className="relative flex-shrink-0">
              <Image src="/logo.png" alt="Hien Tensai" width={40} height={40} className="h-8 w-8 sm:h-10 sm:w-10 object-contain transition-transform group-hover:scale-105" priority />
            </div>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#4dd0e1] via-[#1f84ae] to-[#1597b3] bg-clip-text text-transparent group-hover:from-[#26c6da] group-hover:via-[#1a7fa9] group-hover:to-[#0d7a94] transition-all">
              Hien Tensai
            </span>
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
