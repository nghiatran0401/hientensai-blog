import Link from "next/link";
import type { PostIndex } from "@/types/blog";
import { formatDate } from "@/lib/posts";
import PostImage from "@/components/PostImage";

interface RelatedPostsProps {
  posts: PostIndex[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  // Filter out any posts with invalid slugs
  const validPosts = posts.filter((post) => post.slug && post.slug.trim() !== "");

  if (validPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-[#e5e5e5]">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-[#1a1a1a]">Bài viết liên quan</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {validPosts.map((post) => (
          <article key={post.id} className="group">
            <Link href={`/posts/${encodeURIComponent(post.slug)}`} className="block">
              {/* Featured Image */}
              {post.featuredImage && (
                <div className="relative w-full h-48 bg-[#f5f5f5] rounded-lg overflow-hidden mb-4">
                  <PostImage src={post.featuredImage.url} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
              )}

              {/* Categories */}
              {post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.categories.slice(0, 1).map((category) => (
                    <span key={category.id} className="text-xs font-medium text-[#2c5aa0] uppercase tracking-wide">
                      {category.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h3 className="text-lg font-bold mb-2 text-[#1a1a1a] group-hover:text-[#2c5aa0] transition-colors line-clamp-2 leading-tight">{post.title}</h3>

              {/* Date */}
              <time dateTime={post.date} className="text-sm text-[#999999]">
                {formatDate(post.date)}
              </time>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
