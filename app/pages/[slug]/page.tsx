import { getPageBySlug, getAllPageSlugs } from "@/lib/pages";
import PostContent from "@/components/PostContent";
import PostImage from "@/components/PostImage";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllPageSlugs();
    return slugs.map((slug) => ({
      slug,
    }));
  } catch (error) {
    // Return empty array if database connection fails during build
    console.warn("Could not fetch page slugs for static generation:", error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.hientensai.com";
  const title = `${page.title} | Hien Tensai Blog`;
  const description = page.title;
  const url = `${siteUrl}/pages/${slug}`;

  return {
    title,
    description,
    authors: [{ name: "Hien Tensai" }],
    openGraph: {
      title,
      description,
      url,
      siteName: "Hien Tensai Blog",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <article className="max-w-3xl mx-auto px-6 lg:px-8 py-12 md:py-16">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-[#1a1a1a]">{page.title}</h1>

        {/* Featured Image */}
        {page.featuredImage && (
          <div className="relative w-full aspect-video mb-12 rounded-lg bg-[#f5f5f5] flex items-center justify-center">
            <PostImage src={page.featuredImage.url} alt={page.title} fill className="object-contain" priority />
          </div>
        )}

        {/* Page Content */}
        <PostContent content={page.content} />

        {/* Footer navigation */}
        <div className="mt-20 pt-8 border-t border-[#e5e5e5]">
          <Link href="/" className="inline-flex items-center gap-2 text-[#666666] hover:text-[#1a1a1a] transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            <span>Về trang chủ</span>
          </Link>
        </div>
      </article>
    </main>
  );
}
