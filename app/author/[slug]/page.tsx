import { getAuthorBySlug, getAllAuthors, getPostsByAuthor } from "@/lib/authors";
import PostCard from "@/components/PostCard";
import { notFound } from "next/navigation";
import Link from "next/link";
import { User, ArrowLeft } from "lucide-react";
import PostImage from "@/components/PostImage";

interface AuthorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const authors = await getAllAuthors();
    return authors.map((author) => ({
      slug: author.slug,
    }));
  } catch (error) {
    // Return empty array if database table doesn't exist during build
    console.warn("Could not fetch authors for static generation:", error);
    return [];
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const posts = await getPostsByAuthor(author.id);

  return (
    <main className="min-h-screen">
      <section className="max-w-7xl mx-auto px-6 py-12">
        {/* Author Header */}
        <div className="max-w-3xl mx-auto mb-16">
          <nav className="text-sm text-[#999999] mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-[#1a1a1a] transition-colors">
              Trang chủ
            </Link>
            <span>/</span>
            <span className="text-[#666666]">{author.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            {/* Avatar */}
            {author.avatarUrl ? (
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-[#f5f5f5] flex-shrink-0">
                <PostImage src={author.avatarUrl} alt={author.name} fill className="object-cover" />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-[#f0f4f8] flex items-center justify-center flex-shrink-0">
                <User className="w-12 h-12 text-[#2c5aa0]" />
              </div>
            )}

            {/* Author Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <User className="w-5 h-5 text-[#666666]" />
                <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a]">{author.name}</h1>
              </div>

              {author.bio && <p className="text-lg text-[#666666] leading-relaxed mb-4">{author.bio}</p>}

              <div className="flex flex-wrap gap-4 text-sm text-[#666666]">
                {author.email && (
                  <a href={`mailto:${author.email}`} className="hover:text-[#2c5aa0] transition-colors">
                    {author.email}
                  </a>
                )}
                {author.website && (
                  <a href={author.website} target="_blank" rel="noopener noreferrer" className="hover:text-[#2c5aa0] transition-colors">
                    Website
                  </a>
                )}
              </div>
            </div>
          </div>

          <p className="text-lg text-[#666666] mt-8">{posts.length} bài viết</p>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Back Link */}
        <div className="mt-16 text-center">
          <Link href="/posts" className="inline-flex items-center gap-2 text-[#666666] hover:text-[#1a1a1a] transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại danh sách bài viết</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
