import { getPostsByDate, getArchiveDates } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, ArrowLeft } from "lucide-react";
import type { PostIndex } from "@/types/blog";

interface ArchiveMonthPageProps {
  params: Promise<{
    year: string;
    month: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const archives = await getArchiveDates();
    const monthArchives = archives.filter((a) => a.month);
    return monthArchives.map((a) => ({
      year: a.year.toString(),
      month: a.month!.toString(),
    }));
  } catch (error) {
    // Return empty array if database connection fails during build
    console.warn("Could not fetch archive dates for static generation:", error);
    return [];
  }
}

export default async function ArchiveMonthPage({ params }: ArchiveMonthPageProps) {
  const { year, month } = await params;
  const yearNum = parseInt(year, 10);
  const monthNum = parseInt(month, 10);

  if (isNaN(yearNum) || isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
    notFound();
  }

  let posts: PostIndex[] = [];
  try {
    posts = await getPostsByDate(yearNum, monthNum);
  } catch (error) {
    console.warn(`Could not fetch posts for archive ${year}/${month}:`, error);
    notFound();
  }

  const monthNames = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];

  return (
    <main className="min-h-screen">
      <section className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="max-w-3xl mx-auto mb-16">
          <nav className="text-sm text-[#999999] mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-[#1a1a1a] transition-colors">
              Trang chủ
            </Link>
            <span>/</span>
            <Link href="/archive" className="hover:text-[#1a1a1a] transition-colors">
              Lưu trữ
            </Link>
            <span>/</span>
            <Link href={`/archive/${year}`} className="hover:text-[#1a1a1a] transition-colors">
              {year}
            </Link>
            <span>/</span>
            <span className="text-[#666666]">{monthNames[monthNum - 1]}</span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-[#666666]" />
            <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a]">
              {monthNames[monthNum - 1]} {year}
            </h1>
          </div>
          <p className="text-lg text-[#666666]">{posts.length} bài viết</p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Back Link */}
        <div className="mt-16 text-center">
          <Link href={`/archive/${year}`} className="inline-flex items-center gap-2 text-[#666666] hover:text-[#1a1a1a] transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại {year}</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
