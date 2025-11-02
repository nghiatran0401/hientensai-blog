"use client";

import { Share2, Facebook, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

export default function SocialShare({ url, title, description }: SocialShareProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      // You could add a toast notification here
      alert("Đã sao chép liên kết!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-[#666666] mb-1">
        <Share2 className="w-4 h-4" />
        <span className="font-medium">Chia sẻ</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-colors text-sm font-medium"
          aria-label="Chia sẻ trên Facebook"
        >
          <Facebook className="w-4 h-4" />
          <span>Facebook</span>
        </a>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a91da] transition-colors text-sm font-medium"
          aria-label="Chia sẻ trên Twitter"
        >
          <Twitter className="w-4 h-4" />
          <span>Twitter</span>
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white rounded-lg hover:bg-[#095195] transition-colors text-sm font-medium"
          aria-label="Chia sẻ trên LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
          <span>LinkedIn</span>
        </a>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-[#e5e5e5] text-[#666666] rounded-lg hover:bg-[#f5f5f5] hover:border-[#2c5aa0] hover:text-[#2c5aa0] transition-colors text-sm font-medium"
          aria-label="Sao chép liên kết"
        >
          <LinkIcon className="w-4 h-4" />
          <span>Sao chép</span>
        </button>
      </div>
    </div>
  );
}
