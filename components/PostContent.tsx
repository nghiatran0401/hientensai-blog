"use client";

import { useEffect } from "react";

interface PostContentProps {
  content: string;
}

export default function PostContent({ content }: PostContentProps) {
  useEffect(() => {
    // Add IDs to headings for Table of Contents
    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    headings.forEach((heading) => {
      if (!heading.id) {
        const text = heading.textContent || "";
        const id = text
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");
        if (id) {
          heading.id = id;
        }
      }
    });
  }, [content]);

  return (
    <div
      className="prose prose-lg max-w-none
        prose-headings:font-bold
        prose-headings:text-[#1a1a1a]
        prose-headings:scroll-mt-28
        prose-headings:mb-6
        prose-headings:mt-8
        prose-p:text-[#1a1a1a]
        prose-p:leading-[1.8]
        prose-p:text-[18px]
        prose-p:mb-6
        prose-a:text-[#2c5aa0]
        prose-a:underline
        prose-a:decoration-1
        prose-a:underline-offset-2
        prose-a:transition-colors
        hover:prose-a:text-[#1e3f6e]
        prose-img:rounded-lg
        prose-img:w-full
        prose-img:my-10
        prose-img:max-w-full
        prose-img:h-auto
        prose-strong:text-[#1a1a1a]
        prose-strong:font-semibold
        prose-blockquote:border-l-4
        prose-blockquote:border-[#e5e5e5]
        prose-blockquote:pl-6
        prose-blockquote:italic
        prose-blockquote:text-[#666666]
        prose-code:bg-[#f5f5f5]
        prose-code:px-1.5
        prose-code:py-0.5
        prose-code:rounded
        prose-code:text-sm
        prose-code:font-mono
        prose-pre:bg-[#1a1a1a]
        prose-pre:text-[#ededed]
        prose-pre:p-4
        prose-pre:rounded-lg
        prose-pre:overflow-x-auto
        prose-ul:my-6
        prose-ol:my-6
        prose-li:mb-3
        prose-li:text-[18px]
        prose-li:leading-[1.8]"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
