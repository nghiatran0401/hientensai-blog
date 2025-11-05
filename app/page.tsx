import { getRecentPosts, getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import PostImage from "@/components/PostImage";
import StructuredData from "@/components/StructuredData";
import Link from "next/link";
import { formatDate, calculateReadingTime } from "@/lib/posts";
import { Clock, ArrowRight } from "lucide-react";

export default async function Home() {
  const recentPosts = await getRecentPosts(12);
  const allPosts = await getAllPosts();
  const featuredPost = recentPosts[0];
  const otherPosts = recentPosts.slice(1);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.hientensai.com";

  return (
    <>
      <StructuredData
        type="breadcrumb"
        data={{
          breadcrumb: {
            items: [{ name: "Trang chủ", url: siteUrl }],
          },
        }}
      />
      <main className="min-h-screen">
        {/* Enhanced Hero Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-20">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 md:mb-6 text-[#1a1a1a] leading-tight tracking-tight">Hien Tensai</h1>
            <p className="text-xl md:text-2xl text-[#666666] leading-relaxed max-w-2xl mx-auto mb-6">Chia sẻ về cuộc sống, học tập và du lịch</p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-[#999999]">
              <span>{allPosts.length} bài viết</span>
              <span>•</span>
              <Link href="/posts" className="text-[#2c5aa0] hover:text-[#1e3f6e] font-medium transition-colors">
                Khám phá tất cả
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16 md:mb-24">
            <div className="bg-white rounded-2xl overflow-hidden border border-[#e5e5e5] shadow-sm hover:shadow-md transition-shadow duration-300">
              <Link href={`/posts/${featuredPost.slug}`} className="block">
                {featuredPost.featuredImage && (
                  <div className="relative w-full h-64 md:h-96 bg-[#f5f5f5] flex items-center justify-center">
                    <PostImage
                      src={featuredPost.featuredImage.url}
                      alt={featuredPost.title}
                      fill
                      className="object-contain transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 896px"
                      priority
                    />
                  </div>
                )}
                <div className="p-6 md:p-8">
                  {/* Categories */}
                  {featuredPost.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {featuredPost.categories.slice(0, 2).map((category) => (
                        <span key={category.id} className="text-xs font-semibold text-[#2c5aa0] uppercase tracking-wide px-2 py-1 bg-[#f0f4f8] rounded">
                          {category.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1a1a1a] leading-tight">{featuredPost.title}</h2>

                  {/* Excerpt */}
                  {featuredPost.excerpt && <p className="text-[#666666] text-lg md:text-xl leading-relaxed mb-6 line-clamp-3">{featuredPost.excerpt}</p>}

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-[#999999]">
                    <time dateTime={featuredPost.date}>{formatDate(featuredPost.date)}</time>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {calculateReadingTime(featuredPost.excerpt || featuredPost.title)} phút đọc
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* Recent Posts Grid */}
        {otherPosts.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16 md:pb-24">
            <div className="flex items-center justify-between mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a]">Bài viết gần đây</h2>
              <Link href="/posts" className="hidden md:flex items-center gap-2 text-[#2c5aa0] hover:text-[#1e3f6e] font-medium text-sm transition-colors">
                Xem tất cả
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {otherPosts.slice(0, 6).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* View All Link - Mobile */}
            <div className="mt-12 md:hidden text-center">
              <Link href="/posts" className="inline-flex items-center gap-2 text-[#2c5aa0] hover:text-[#1e3f6e] font-medium text-sm transition-colors px-6 py-3 border border-[#e5e5e5] rounded-lg hover:border-[#2c5aa0]">
                Xem tất cả bài viết
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
