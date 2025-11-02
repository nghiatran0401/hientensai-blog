import { searchPosts } from "@/lib/search";
import PostCard from "@/components/PostCard";
import { Search } from "lucide-react";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || "";
  const results = query ? await searchPosts(query, 50) : [];

  return (
    <main className="min-h-screen">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Search Header */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Search className="w-6 h-6 text-[#666666]" />
            <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a]">Tìm kiếm</h1>
          </div>

          {/* Search Form */}
          <form method="GET" action="/search" className="mb-8">
            <div className="relative">
              <input
                type="search"
                name="q"
                defaultValue={query}
                placeholder="Tìm kiếm bài viết..."
                className="w-full px-6 py-4 pr-12 border border-[#e5e5e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c5aa0] focus:border-transparent text-[#1a1a1a]"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#2c5aa0] text-white rounded-lg hover:bg-[#1e3f6e] transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Results */}
          {query && <p className="text-lg text-[#666666] mb-8">{results.length > 0 ? `Tìm thấy ${results.length} bài viết cho "${query}"` : `Không tìm thấy kết quả cho "${query}"`}</p>}
        </div>

        {/* Results Grid */}
        {results.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {results.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* No Results */}
        {query && results.length === 0 && (
          <div className="max-w-3xl mx-auto text-center py-16">
            <p className="text-[#666666] text-lg mb-4">Không tìm thấy bài viết nào phù hợp.</p>
            <p className="text-[#999999] text-sm">Thử lại với từ khóa khác hoặc xem tất cả bài viết.</p>
          </div>
        )}
      </section>
    </main>
  );
}
