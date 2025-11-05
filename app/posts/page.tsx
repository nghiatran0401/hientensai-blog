import { getPaginatedPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import type { Metadata } from "next";

interface PostsPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export async function generateMetadata({ searchParams }: PostsPageProps): Promise<Metadata> {
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page, 10) : 1;
  const { total, totalPages } = await getPaginatedPosts(currentPage, 12);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.hientensai.com";

  const title = currentPage > 1 ? `Tất cả bài viết - Trang ${currentPage} | Hien Tensai Blog` : "Tất cả bài viết | Hien Tensai Blog";

  const description =
    currentPage > 1
      ? `Danh sách tất cả bài viết - Trang ${currentPage}/${totalPages}. ${total} bài viết về cuộc sống, học tập và du lịch.`
      : `Khám phá ${total} bài viết về cuộc sống, học tập và du lịch trên Hien Tensai Blog.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/posts${currentPage > 1 ? `?page=${currentPage}` : ""}`,
      siteName: "Hien Tensai Blog",
      type: "website",
      locale: "vi_VN",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    alternates: {
      canonical: `${siteUrl}/posts${currentPage > 1 ? `?page=${currentPage}` : ""}`,
    },
  };
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page, 10) : 1;
  const { posts, total, totalPages } = await getPaginatedPosts(currentPage, 12);

  return (
    <main className="min-h-screen">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Header */}
        <div className="max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#1a1a1a]">Tất cả bài viết</h1>
          <p className="text-lg text-[#666666]">
            {total} bài viết {totalPages > 1 && `• Trang ${currentPage}/${totalPages}`}
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/posts" />
      </section>
    </main>
  );
}
