import Link from "next/link";
import type { PostIndex } from "@/types/blog";
import { formatDate } from "@/lib/posts";
import PostImage from "@/components/PostImage";

interface PostSidebarProps {
  recentPosts?: PostIndex[];
}

export default function PostSidebar({ recentPosts = [] }: PostSidebarProps) {
  if (recentPosts.length === 0) {
    return null;
  }

  return (
    <aside className="w-72 max-h-[calc(100vh-9rem)] overflow-y-auto">
      <div className="bg-white border border-[#e5e5e5] rounded-lg p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-[#1a1a1a] uppercase tracking-wide mb-4 pb-3 border-b border-[#e5e5e5]">Bài viết gần đây</h3>
        <div className="space-y-4">
          {recentPosts.slice(0, 5).map((post) => {
            if (!post.slug || post.slug.trim() === "") return null;
            return (
              <article key={post.id} className="group">
                <Link href={`/posts/${encodeURIComponent(post.slug)}`} className="block">
                  <div className="flex gap-3">
                    {post.featuredImage && (
                      <div className="relative w-16 h-16 flex-shrink-0 bg-[#f5f5f5] rounded overflow-hidden">
                        <PostImage src={post.featuredImage.url} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="64px" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-[#1a1a1a] group-hover:text-[#2c5aa0] transition-colors line-clamp-2 leading-snug mb-1">{post.title}</h4>
                      <time dateTime={post.date} className="text-xs text-[#999999]">
                        {formatDate(post.date)}
                      </time>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
