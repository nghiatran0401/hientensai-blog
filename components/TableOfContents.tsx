"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Wait a bit for PostContent to render and add IDs to headings
    const timeoutId = setTimeout(() => {
      // Extract headings from the rendered DOM (not the HTML string)
      const headings = document.querySelectorAll(".prose-wrapper h1, .prose-wrapper h2, .prose-wrapper h3, .prose-wrapper h4, .prose-wrapper h5, .prose-wrapper h6");

      const items: TOCItem[] = [];
      headings.forEach((heading) => {
        const level = parseInt(heading.tagName.charAt(1));
        const text = heading.textContent || "";

        // Generate ID if it doesn't exist
        let id = heading.id;
        if (!id) {
          id = text
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");
          if (id) {
            heading.id = id;
          }
        }

        if (text.trim() && id) {
          items.push({ id, text: text.trim(), level });
        }
      });

      setTocItems(items);
    }, 100); // Small delay to ensure DOM is ready

    return () => clearTimeout(timeoutId);
  }, [content]);

  useEffect(() => {
    if (tocItems.length === 0) return;

    // Update active heading on scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Account for header + offset

      for (let i = tocItems.length - 1; i >= 0; i--) {
        const element = document.getElementById(tocItems[i].id);
        if (element) {
          const elementTop = element.getBoundingClientRect().top + window.scrollY;
          if (elementTop <= scrollPosition) {
            setActiveId(tocItems[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [tocItems]);

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <nav className="hidden lg:block fixed top-28 left-4 xl:left-8 w-64 max-h-[calc(100vh-9rem)] overflow-y-auto bg-white border border-[#e5e5e5] rounded-lg p-5 shadow-sm z-20">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#e5e5e5]">
        <List className="w-4 h-4 text-[#666666]" />
        <h3 className="text-sm font-semibold text-[#1a1a1a] uppercase tracking-wide">Mục lục</h3>
      </div>
      <ul className="space-y-1.5">
        {tocItems.map((item, index) => (
          <li key={`${item.id}-${index}`} style={{ paddingLeft: `${(item.level - 1) * 12}px` }}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(item.id);
                if (element) {
                  // Calculate offset for fixed header (header height + some padding)
                  const headerOffset = 120;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  });

                  // Update URL without causing another scroll
                  setTimeout(() => {
                    window.history.pushState(null, "", `#${item.id}`);
                  }, 100);
                }
              }}
              className={`block py-1.5 px-2 text-sm rounded transition-colors ${activeId === item.id ? "text-[#2c5aa0] font-medium bg-[#f0f4f8]" : "text-[#666666] hover:text-[#2c5aa0] hover:bg-[#f5f5f5]"}`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
