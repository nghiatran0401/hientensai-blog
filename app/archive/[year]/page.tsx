import { getPostsByDate, getArchiveDates } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, ArrowLeft } from "lucide-react";

interface ArchiveYearPageProps {
  params: Promise<{
    year: string;
  }>;
}

export async function generateStaticParams() {
  const archives = await getArchiveDates();
  const years = [...new Set(archives.filter((a) => !a.month).map((a) => a.year.toString()))];
  return years.map((year) => ({
    year,
  }));
}

export default async function ArchiveYearPage({ params }: ArchiveYearPageProps) {
  const { year } = await params;
  const yearNum = parseInt(year, 10);

  if (isNaN(yearNum) || yearNum < 2000 || yearNum > new Date().getFullYear() + 1) {
    notFound();
  }

  const posts = await getPostsByDate(yearNum);

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
            <span className="text-[#666666]">{year}</span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-[#666666]" />
            <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a]">{year}</h1>
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
          <Link href="/archive" className="inline-flex items-center gap-2 text-[#666666] hover:text-[#1a1a1a] transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại lưu trữ</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

