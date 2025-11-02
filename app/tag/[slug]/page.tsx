import { getPostsByTag, getAllTags } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import StructuredData from "@/components/StructuredData";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import type { PostIndex } from "@/types/blog";

interface TagPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const tags = await getAllTags();
    return tags.map((tag) => ({
      slug: tag.slug,
    }));
  } catch (error) {
    // Return empty array if database connection fails during build
    console.warn("Could not fetch tags for static generation:", error);
    return [];
  }
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = await params;
  let posts: PostIndex[] = [];
  try {
    posts = await getPostsByTag(slug);
  } catch (error) {
    console.warn(`Could not fetch posts for tag ${slug}:`, error);
  }

  if (posts.length === 0) {
    return {
      title: "Tag Not Found",
    };
  }

  const tagName = posts[0].tags.find((tag) => tag.slug === slug)?.name || slug;
  const tagDescription = posts[0].tags.find((tag) => tag.slug === slug)?.description;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.hientensai.com";
  const tagUrl = `${siteUrl}/tag/${slug}`;

  const description = tagDescription ? `${tagDescription} Khám phá ${posts.length} bài viết với tag ${tagName}.` : `Khám phá ${posts.length} bài viết với tag ${tagName} trên Hiền Tensai Blog.`;

  const title = `#${tagName} | Hiền Tensai Blog`;

  return {
    title,
    description,
    keywords: [tagName, "bài viết", "blog", "hiền tensai"],
    openGraph: {
      title,
      description,
      url: tagUrl,
      siteName: "Hiền Tensai Blog",
      type: "website",
      locale: "vi_VN",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    alternates: {
      canonical: tagUrl,
    },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;
  let posts: PostIndex[] = [];
  try {
    posts = await getPostsByTag(slug);
  } catch (error) {
    console.warn(`Could not fetch posts for tag ${slug}:`, error);
  }

  if (posts.length === 0) {
    notFound();
  }

  const tagName = posts[0].tags.find((tag) => tag.slug === slug)?.name || slug;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.hientensai.com";
  const tagUrl = `${siteUrl}/tag/${slug}`;

  return (
    <>
      <StructuredData
        type="breadcrumb"
        data={{
          breadcrumb: {
            items: [
              { name: "Trang chủ", url: siteUrl },
              { name: "Bài viết", url: `${siteUrl}/posts` },
              { name: tagName, url: tagUrl },
            ],
          },
        }}
      />
      <main className="min-h-screen">
        <section className="max-w-7xl mx-auto px-6 py-12">
          {/* Page Header */}
          <div className="max-w-3xl mx-auto mb-16">
            <nav className="text-sm text-[#999999] mb-6 flex items-center gap-2">
              <Link href="/" className="hover:text-[#1a1a1a] transition-colors">
                Trang chủ
              </Link>
              <span>/</span>
              <Link href="/posts" className="hover:text-[#1a1a1a] transition-colors">
                Bài viết
              </Link>
              <span>/</span>
              <span className="text-[#666666]">#{tagName}</span>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#1a1a1a]">#{tagName}</h1>
            <p className="text-lg text-[#666666]">{posts.length} bài viết</p>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
