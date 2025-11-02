import { getArchiveDates } from "@/lib/posts";
import Link from "next/link";
import { Calendar } from "lucide-react";

export default async function ArchivePage() {
  const archives = await getArchiveDates();

  // Group by year
  const groupedByYear = archives.reduce((acc, item) => {
    if (!item.month) {
      // Year-only entry
      if (!acc[item.year]) {
        acc[item.year] = { year: item.year, total: item.count, months: [] };
      } else {
        acc[item.year].total = item.count;
      }
    } else {
      // Month entry
      if (!acc[item.year]) {
        acc[item.year] = { year: item.year, total: 0, months: [] };
      }
      acc[item.year].months.push({ month: item.month, count: item.count });
    }
    return acc;
  }, {} as Record<number, { year: number; total: number; months: Array<{ month: number; count: number }> }>);

  const years = Object.values(groupedByYear).sort((a, b) => b.year - a.year);

  const monthNames = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  return (
    <main className="min-h-screen">
      <section className="max-w-3xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-[#666666]" />
            <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a]">Lưu trữ</h1>
          </div>
          <p className="text-lg text-[#666666]">Xem bài viết theo năm và tháng</p>
        </div>

        {/* Archive List */}
        <div className="space-y-8">
          {years.map((yearData) => (
            <div key={yearData.year} className="border-b border-[#e5e5e5] pb-8 last:border-0">
              <Link href={`/archive/${yearData.year}`} className="block group">
                <h2 className="text-2xl font-bold mb-4 text-[#1a1a1a] group-hover:text-[#2c5aa0] transition-colors">
                  {yearData.year}
                </h2>
                <p className="text-sm text-[#666666] mb-4">{yearData.total} bài viết</p>
              </Link>

              {/* Months */}
              {yearData.months.length > 0 && (
                <div className="ml-4 mt-4 space-y-2">
                  {yearData.months
                    .sort((a, b) => b.month - a.month)
                    .map((monthData) => (
                      <Link
                        key={`${yearData.year}-${monthData.month}`}
                        href={`/archive/${yearData.year}/${monthData.month}`}
                        className="flex items-center justify-between py-2 px-4 rounded-lg hover:bg-[#f5f5f5] transition-colors group"
                      >
                        <span className="text-[#666666] group-hover:text-[#2c5aa0] transition-colors">
                          {monthNames[monthData.month - 1]}
                        </span>
                        <span className="text-sm text-[#999999]">{monthData.count} bài viết</span>
                      </Link>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

