import { getAllPosts } from "@/lib/posts";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  const posts = await getAllPosts();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.hientensai.com";

  const rssItems = posts
    .slice(0, 20) // Latest 20 posts
    .map((post) => {
      const url = `${siteUrl}/posts/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      const content = post.excerpt || "";

      return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${content}]]></description>
      <pubDate>${pubDate}</pubDate>
      ${post.featuredImage ? `<enclosure url="${siteUrl}${post.featuredImage.url}" type="image/jpeg" />` : ""}
      ${post.categories.map((cat) => `<category><![CDATA[${cat.name}]]></category>`).join("\n      ")}
    </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Hiền Tên Sài Blog</title>
    <link>${siteUrl}</link>
    <description>Chia sẻ về cuộc sống, học tập và du lịch</description>
    <language>vi-VN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed" rel="self" type="application/rss+xml" />
${rssItems}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
    },
  });
}
