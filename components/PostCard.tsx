import Link from "next/link";
import type { PostIndex } from "@/types/blog";
import { formatDate, calculateReadingTime } from "@/lib/posts";
import PostImage from "@/components/PostImage";
import { Clock } from "lucide-react";

interface PostCardProps {
  post: PostIndex;
}

export default function PostCard({ post }: PostCardProps) {
  const readingTime = calculateReadingTime(post.excerpt || post.title);

  return (
    <article className="group">
      <Link href={`/posts/${post.slug}`} className="block h-full">
        <div className="h-full flex flex-col bg-white rounded-xl overflow-hidden border border-[#e5e5e5] hover:border-[#2c5aa0] hover:shadow-md transition-all duration-300">
          {/* Featured Image */}
          {post.featuredImage && (
            <div className="relative w-full h-48 bg-[#f5f5f5] flex items-center justify-center">
              <PostImage
                src={post.featuredImage.url}
                alt={post.title}
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          <div className="p-5 flex-1 flex flex-col">
            {/* Categories */}
            {post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {post.categories.slice(0, 1).map((category) => (
                  <span key={category.id} className="text-xs font-semibold text-[#2c5aa0] uppercase tracking-wide">
                    {category.name}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h3 className="text-lg font-bold mb-2.5 text-[#1a1a1a] group-hover:text-[#2c5aa0] transition-colors leading-tight line-clamp-2 flex-shrink-0">{post.title}</h3>

            {/* Excerpt */}
            {post.excerpt && <p className="text-[#666666] text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">{post.excerpt}</p>}

            {/* Meta */}
            <div className="flex items-center gap-3 text-xs text-[#999999] mt-auto pt-2">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {readingTime} phút
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
