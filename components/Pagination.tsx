import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export default function Pagination({ currentPage, totalPages, basePath = "/posts" }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages: (number | string)[] = [];

  // Always show first page
  if (currentPage > 3) {
    pages.push(1);
    if (currentPage > 4) {
      pages.push("...");
    }
  }

  // Show pages around current page
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  // Always show last page
  if (currentPage < totalPages - 2) {
    if (currentPage < totalPages - 3) {
      pages.push("...");
    }
    pages.push(totalPages);
  }

  return (
    <nav className="flex items-center justify-center flex-wrap gap-2 mt-12 sm:mt-16 pt-8 border-t border-[#e5e5e5] px-4">
      {/* Previous button */}
      {currentPage > 1 ? (
        <Link
          href={currentPage === 2 ? basePath : `${basePath}?page=${currentPage - 1}`}
          className="flex items-center gap-1 px-4 py-2 bg-white border border-[#e5e5e5] text-[#666666] rounded-lg hover:bg-[#f5f5f5] hover:border-[#2c5aa0] hover:text-[#2c5aa0] transition-colors text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Trước</span>
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-4 py-2 bg-[#f5f5f5] border border-[#e5e5e5] text-[#999999] rounded-lg text-sm font-medium cursor-not-allowed">
          <ChevronLeft className="w-4 h-4" />
          <span>Trước</span>
        </span>
      )}

      {/* Page numbers */}
      <div className="flex items-center gap-2">
        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-[#999999]">
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <Link
              key={pageNum}
              href={pageNum === 1 ? basePath : `${basePath}?page=${pageNum}`}
              className={`min-w-[40px] px-3 py-2 text-center rounded-lg text-sm font-medium transition-colors ${
                isActive ? "bg-[#2c5aa0] text-white" : "bg-white border border-[#e5e5e5] text-[#666666] hover:bg-[#f5f5f5] hover:border-[#2c5aa0] hover:text-[#2c5aa0]"
              }`}
            >
              {pageNum}
            </Link>
          );
        })}
      </div>

      {/* Next button */}
      {currentPage < totalPages ? (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="flex items-center gap-1 px-4 py-2 bg-white border border-[#e5e5e5] text-[#666666] rounded-lg hover:bg-[#f5f5f5] hover:border-[#2c5aa0] hover:text-[#2c5aa0] transition-colors text-sm font-medium"
        >
          <span>Sau</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-4 py-2 bg-[#f5f5f5] border border-[#e5e5e5] text-[#999999] rounded-lg text-sm font-medium cursor-not-allowed">
          <span>Sau</span>
          <ChevronRight className="w-4 h-4" />
        </span>
      )}
    </nav>
  );
}
