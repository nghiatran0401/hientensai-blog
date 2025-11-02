import PostContentSkeleton from "@/components/PostContentSkeleton";

export default function PostLoading() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      <article className="max-w-3xl mx-auto px-6 lg:px-8 py-12 md:py-16 lg:ml-80">
        <PostContentSkeleton />
      </article>
    </main>
  );
}

