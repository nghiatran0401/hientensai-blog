import PostCardSkeleton from "./PostCardSkeleton";

interface PostListSkeletonProps {
  count?: number;
}

export default function PostListSkeleton({ count = 6 }: PostListSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
      {Array.from({ length: count }).map((_, index) => (
        <PostCardSkeleton key={index} />
      ))}
    </div>
  );
}

