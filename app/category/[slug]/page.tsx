import { getPostsByCategory, getAllCategories } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import StructuredData from "@/components/StructuredData";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getPostsByCategory(slug);

  if (posts.length === 0) {
    return {
      title: "Category Not Found",
    };
  }

  const categoryName = posts[0].categories.find((cat) => cat.slug === slug)?.name || slug;
  const categoryDescription = posts[0].categories.find((cat) => cat.slug === slug)?.description;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.hientensai.com";
  const categoryUrl = `${siteUrl}/category/${slug}`;

  const description = categoryDescription
    ? `${categoryDescription} Khám phá ${posts.length} bài viết trong danh mục ${categoryName}.`
    : `Khám phá ${posts.length} bài viết trong danh mục ${categoryName} trên Hien Tensai Blog.`;

  const title = `${categoryName} | Hien Tensai Blog`;

  return {
    title,
    description,
    keywords: [categoryName, "bài viết", "blog", "hiền tensai"],
    openGraph: {
      title,
      description,
      url: categoryUrl,
      siteName: "Hien Tensai Blog",
      type: "website",
      locale: "vi_VN",
      images: [
        {
          url: `${siteUrl}/logo.png`,
          width: 1200,
          height: 630,
          alt: `${categoryName} - Hien Tensai Blog`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/logo.png`],
    },
    alternates: {
      canonical: categoryUrl,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const posts = await getPostsByCategory(slug);

  if (posts.length === 0) {
    notFound();
  }

  const categoryName = posts[0].categories.find((cat) => cat.slug === slug)?.name || slug;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.hientensai.com";
  const categoryUrl = `${siteUrl}/category/${slug}`;

  return (
    <>
      <StructuredData
        type="breadcrumb"
        data={{
          breadcrumb: {
            items: [
              { name: "Trang chủ", url: siteUrl },
              { name: "Bài viết", url: `${siteUrl}/posts` },
              { name: categoryName, url: categoryUrl },
            ],
          },
        }}
      />
      <main className="min-h-screen">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
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
              <span className="text-[#666666]">{categoryName}</span>
            </nav>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold pb-[8px] bg-gradient-to-r from-[#4dd0e1] via-[#1f84ae] to-[#1597b3] bg-clip-text text-transparent">{categoryName}</h1>
            <p className="text-lg text-[#666666]">{posts.length} bài viết</p>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
