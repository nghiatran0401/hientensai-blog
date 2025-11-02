import PostCardSkeleton from "@/components/PostCardSkeleton";
import PostListSkeleton from "@/components/PostListSkeleton";

export default function HomeLoading() {
  return (
    <main className="min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <div className="text-center mb-12 md:mb-16">
          <div className="h-16 bg-[#f5f5f5] rounded animate-pulse w-80 mx-auto mb-4" />
          <div className="h-8 bg-[#f5f5f5] rounded animate-pulse w-96 mx-auto mb-6" />
          <div className="h-5 bg-[#f5f5f5] rounded animate-pulse w-64 mx-auto" />
        </div>
      </section>

      {/* Featured Post Skeleton */}
      <section className="max-w-4xl mx-auto px-6 mb-16 md:mb-24">
        <div className="bg-white rounded-2xl overflow-hidden border border-[#e5e5e5]">
          <div className="relative w-full h-64 md:h-96 bg-[#f5f5f5] animate-pulse" />
          <div className="p-6 md:p-8">
            <div className="h-4 w-20 bg-[#f5f5f5] rounded mb-4 animate-pulse" />
            <div className="h-10 bg-[#f5f5f5] rounded mb-4 animate-pulse w-3/4" />
            <div className="space-y-2 mb-6">
              <div className="h-4 bg-[#f5f5f5] rounded animate-pulse w-full" />
              <div className="h-4 bg-[#f5f5f5] rounded animate-pulse w-5/6" />
            </div>
            <div className="h-4 w-32 bg-[#f5f5f5] rounded animate-pulse" />
          </div>
        </div>
      </section>

      {/* Recent Posts Grid Skeleton */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="h-10 bg-[#f5f5f5] rounded animate-pulse w-64 mb-8 md:mb-12" />
        <PostListSkeleton count={6} />
      </section>
    </main>
  );
}

