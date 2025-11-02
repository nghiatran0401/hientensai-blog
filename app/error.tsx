"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#fafafa] px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-[#e5e5e5] mb-4">500</h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1a1a1a]">Đã xảy ra lỗi</h2>
          <p className="text-lg text-[#666666] mb-8">
            Rất tiếc, đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#2c5aa0] text-white rounded-lg hover:bg-[#1e3f6e] transition-colors font-medium"
          >
            <RefreshCw className="w-4 h-4" />
            Thử lại
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#2c5aa0] border border-[#2c5aa0] rounded-lg hover:bg-[#f0f4f8] transition-colors font-medium"
          >
            <Home className="w-4 h-4" />
            Về trang chủ
          </Link>
        </div>
      </div>
    </main>
  );
}

