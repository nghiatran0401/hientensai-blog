"use client";

import { useEffect, useState } from "react";
import { List, ChevronDown, ChevronUp } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsMobileProps {
  content: string;
}

export default function TableOfContentsMobile({ content }: TableOfContentsMobileProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const headings = document.querySelectorAll(".prose-wrapper h1, .prose-wrapper h2, .prose-wrapper h3, .prose-wrapper h4, .prose-wrapper h5, .prose-wrapper h6");

      const items: TOCItem[] = [];
      headings.forEach((heading) => {
        const level = parseInt(heading.tagName.charAt(1));
        const text = heading.textContent || "";

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
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [content]);

  useEffect(() => {
    if (tocItems.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

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
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [tocItems]);

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <div className="lg:hidden sticky top-16 z-30 bg-white border-b border-[#e5e5e5] shadow-sm">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between px-4 sm:px-6 py-3 text-left hover:bg-[#f5f5f5] transition-colors">
        <div className="flex items-center gap-2">
          <List className="w-4 h-4 text-[#666666]" />
          <span className="text-sm font-semibold text-[#1a1a1a]">Mục lục</span>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-[#666666]" /> : <ChevronDown className="w-4 h-4 text-[#666666]" />}
      </button>

      {isOpen && (
        <div className="max-h-[60vh] overflow-y-auto bg-white border-t border-[#e5e5e5]">
          <nav className="p-4 sm:px-6">
            <ul className="space-y-1.5">
              {tocItems.map((item, index) => (
                <li key={`${item.id}-${index}`} style={{ paddingLeft: `${(item.level - 1) * 12}px` }}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                      const element = document.getElementById(item.id);
                      if (element) {
                        const headerOffset = 80;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                          top: offsetPosition,
                          behavior: "smooth",
                        });

                        setTimeout(() => {
                          window.history.pushState(null, "", `#${item.id}`);
                        }, 100);
                      }
                    }}
                    className={`block py-2 px-2 text-sm rounded transition-colors ${activeId === item.id ? "text-[#2c5aa0] font-medium bg-[#f0f4f8]" : "text-[#666666] hover:text-[#2c5aa0] hover:bg-[#f5f5f5]"}`}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
