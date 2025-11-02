import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#fafafa]">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-[#e5e5e5] mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1a1a1a]">Trang không tồn tại</h2>
          <p className="text-lg text-[#666666] mb-8">Xin lỗi, chúng tôi không tìm thấy trang bạn đang tìm kiếm.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#2c5aa0] text-white rounded-lg hover:bg-[#1e3f6e] transition-colors font-medium">
            <Home className="w-4 h-4" />
            Về trang chủ
          </Link>
          <Link href="/posts" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#2c5aa0] border border-[#2c5aa0] rounded-lg hover:bg-[#f0f4f8] transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" />
            Xem bài viết
          </Link>
        </div>
      </div>
    </main>
  );
}
