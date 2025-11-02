import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [{ label: "Trang chủ", href: "/" }, ...items];

  return (
    <nav className="flex items-center gap-2 text-sm text-[#999999] mb-6" aria-label="Breadcrumb">
      {allItems.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {index === 0 ? (
            <Link href={item.href!} className="hover:text-[#1a1a1a] transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </Link>
          ) : index === allItems.length - 1 ? (
            <span className="text-[#666666]">{item.label}</span>
          ) : (
            <Link href={item.href!} className="hover:text-[#1a1a1a] transition-colors">
              {item.label}
            </Link>
          )}
          {index < allItems.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-[#e5e5e5]" />}
        </span>
      ))}
    </nav>
  );
}
