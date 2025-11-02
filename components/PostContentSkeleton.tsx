export default function PostContentSkeleton() {
  return (
    <div className="prose prose-lg max-w-none">
      {/* Title Skeleton */}
      <div className="space-y-3 mb-8">
        <div className="h-10 bg-[#f5f5f5] rounded animate-pulse w-3/4" />
        <div className="h-10 bg-[#f5f5f5] rounded animate-pulse w-1/2" />
      </div>

      {/* Meta Skeleton */}
      <div className="flex items-center gap-4 mb-8 pb-8 border-b border-[#e5e5e5]">
        <div className="h-4 w-32 bg-[#f5f5f5] rounded animate-pulse" />
        <div className="h-4 w-24 bg-[#f5f5f5] rounded animate-pulse" />
      </div>

      {/* Featured Image Skeleton */}
      <div className="relative w-full aspect-video mb-12 rounded-lg bg-[#f5f5f5] animate-pulse" />

      {/* Content Paragraphs Skeleton */}
      <div className="space-y-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="h-4 bg-[#f5f5f5] rounded animate-pulse w-full" />
            <div className="h-4 bg-[#f5f5f5] rounded animate-pulse w-full" />
            <div className="h-4 bg-[#f5f5f5] rounded animate-pulse w-5/6" />
          </div>
        ))}
      </div>
    </div>
  );
}

