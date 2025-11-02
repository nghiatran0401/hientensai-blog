export default function PostCardSkeleton() {
  return (
    <article className="bg-white rounded-xl overflow-hidden border border-[#e5e5e5]">
      {/* Image Skeleton */}
      <div className="relative w-full h-48 bg-[#f5f5f5] animate-pulse" />

      <div className="p-5">
        {/* Category Skeleton */}
        <div className="h-4 w-20 bg-[#f5f5f5] rounded mb-3 animate-pulse" />

        {/* Title Skeleton */}
        <div className="space-y-2 mb-2.5">
          <div className="h-5 bg-[#f5f5f5] rounded animate-pulse" />
          <div className="h-5 bg-[#f5f5f5] rounded w-4/5 animate-pulse" />
        </div>

        {/* Excerpt Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-[#f5f5f5] rounded animate-pulse" />
          <div className="h-4 bg-[#f5f5f5] rounded w-5/6 animate-pulse" />
        </div>

        {/* Meta Skeleton */}
        <div className="flex items-center gap-3">
          <div className="h-3 w-24 bg-[#f5f5f5] rounded animate-pulse" />
          <div className="h-3 w-16 bg-[#f5f5f5] rounded animate-pulse" />
        </div>
      </div>
    </article>
  );
}

