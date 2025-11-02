import PostListSkeleton from "@/components/PostListSkeleton";

export default function CategoryLoading() {
  return (
    <main className="min-h-screen">
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto mb-16">
          <div className="h-12 bg-[#f5f5f5] rounded animate-pulse w-64 mb-4" />
          <div className="h-6 bg-[#f5f5f5] rounded animate-pulse w-48" />
        </div>

        <PostListSkeleton count={9} />
      </section>
    </main>
  );
}

