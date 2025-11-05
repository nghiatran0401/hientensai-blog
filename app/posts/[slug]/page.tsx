import { getPostBySlug, getAllPostSlugs, getRelatedPosts, getRecentPosts, calculateReadingTime, formatDate } from "@/lib/posts";
import PostContent from "@/components/PostContent";
import PostImage from "@/components/PostImage";
import RelatedPosts from "@/components/RelatedPosts";
import SocialShare from "@/components/SocialShare";
import TableOfContents from "@/components/TableOfContents";
import TableOfContentsMobile from "@/components/TableOfContentsMobile";
import PostSidebar from "@/components/PostSidebar";
import StructuredData from "@/components/StructuredData";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import type { Metadata } from "next";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate SEO metadata for each post
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.hientensai.com";
  const title = `${post.title} | Hien Tensai Blog`;
  const description = post.excerpt || post.title;
  const image = post.featuredImage ? `${siteUrl}${post.featuredImage.url}` : `${siteUrl}/logo.png`;
  const url = `${siteUrl}/posts/${slug}`;

  return {
    title,
    description,
    authors: [{ name: "Hien Tensai" }],
    openGraph: {
      title,
      description,
      url,
      siteName: "Hien Tensai Blog",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "vi_VN",
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: ["Hien Tensai"],
      tags: post.tags.map((tag) => tag.name),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
    keywords: [...post.categories.map((cat) => cat.name), ...post.tags.map((tag) => tag.name)],
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.hientensai.com";
  const postUrl = `${siteUrl}/posts/${slug}`;
  const readingTime = calculateReadingTime(post.content);

  // Get related posts
  const categoryIds = post.categories.map((cat) => cat.id);
  const tagIds = post.tags.map((tag) => tag.id);
  const relatedPosts = await getRelatedPosts(post.id, categoryIds, tagIds, 3);

  // Get recent posts for sidebar (exclude current post)
  const allRecentPosts = await getRecentPosts(10);
  const recentPosts = allRecentPosts.filter((p) => p.id !== post.id);

  return (
    <>
      <StructuredData
        type="article"
        data={{
          article: {
            title: post.title,
            description: post.excerpt || post.title,
            image: post.featuredImage ? `${siteUrl}${post.featuredImage.url}` : undefined,
            datePublished: post.date,
            dateModified: post.modified,
            author: "Hien Tensai",
            url: postUrl,
          },
        }}
      />
      <main className="min-h-screen bg-[#fafafa]">
        {/* Mobile Table of Contents */}
        <TableOfContentsMobile content={post.content} />

        {/* Container for sidebars and article */}
        <div className="relative lg:flex lg:justify-center lg:items-start lg:gap-6 lg:min-h-screen">
          {/* Left Sidebar - TOC */}
          <aside className="hidden lg:block lg:flex-shrink-0 lg:pt-8 lg:pl-4 xl:pl-8 lg:sticky lg:top-28 lg:self-start lg:h-fit">
            <TableOfContents content={post.content} />
          </aside>

          {/* Main article content - Substack style centered layout */}
          <article className="max-w-3xl w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:flex-shrink-0">
            {/* Categories */}
            {post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.categories.map((category) => (
                  <Link key={category.id} href={`/category/${category.slug}`} className="inline-flex items-center">
                    <span className="bg-[#f0f4f8] text-[#2c5aa0] hover:bg-[#e0e9f2] border-0 font-medium px-3 py-1 text-xs transition-colors rounded">{category.name}</span>
                  </Link>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight text-[#1a1a1a]">{post.title}</h1>

            {/* Meta information */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap text-[#666666] mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-[#e5e5e5] text-xs sm:text-sm">
              <time dateTime={post.date} className="text-sm">
                {formatDate(post.date)}
              </time>
              {post.modified !== post.date && <span className="text-sm">• Cập nhật: {formatDate(post.modified)}</span>}
              <span className="text-sm flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {readingTime} phút đọc
              </span>
            </div>

            {/* Featured Image */}
            {post.featuredImage && (
              <div className="relative w-full aspect-video mb-8 sm:mb-12 rounded-lg bg-[#f5f5f5] flex items-center justify-center">
                <PostImage src={post.featuredImage.url} alt={post.title} fill className="object-contain" priority />
              </div>
            )}

            {/* Post Content */}
            <div className="prose-wrapper relative">
              <PostContent content={post.content} />
            </div>

            {/* Tags section */}
            {post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-[#e5e5e5]">
                <h3 className="text-sm font-semibold text-[#666666] mb-4 uppercase tracking-wide">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link key={tag.id} href={`/tag/${tag.slug}`} className="inline-flex items-center">
                      <span className="bg-white text-[#666666] hover:text-[#2c5aa0] border border-[#e5e5e5] hover:border-[#2c5aa0] font-normal px-3 py-1 text-xs transition-colors rounded">#{tag.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Social Share */}
            <div className="mt-12 pt-8 border-t border-[#e5e5e5]">
              <SocialShare url={postUrl} title={post.title} description={post.excerpt} />
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}

            {/* Footer navigation */}
            <div className="mt-20 pt-8 border-t border-[#e5e5e5]">
              <Link href="/posts" className="inline-flex items-center gap-2 text-[#666666] hover:text-[#1a1a1a] transition-colors text-sm font-medium">
                <ArrowLeft className="w-4 h-4" />
                <span>Quay lại danh sách bài viết</span>
              </Link>
            </div>
          </article>

          {/* Right Sidebar */}
          <aside className="hidden xl:block xl:flex-shrink-0 xl:pt-8 xl:pr-8 xl:sticky xl:top-28 xl:self-start xl:h-fit">
            <PostSidebar recentPosts={recentPosts} />
          </aside>
        </div>
      </main>
    </>
  );
}
