import { getAllPosts, getAllPostSlugs, getAllCategories, getAllTags } from "@/lib/posts";
import { getAllPages } from "@/lib/pages";
import type { MetadataRoute } from "next";
import type { Tag } from "@/types/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.hientensai.com";

  // Homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  // Posts
  const posts = await getAllPosts();
  posts.forEach((post) => {
    routes.push({
      url: `${siteUrl}/posts/${post.slug}`,
      lastModified: new Date(post.modified),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  });

  // Categories
  const categories = await getAllCategories();
  categories.forEach((category) => {
    routes.push({
      url: `${siteUrl}/category/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    });
  });

  // Tags
  const tags = await getAllTags();
  tags.forEach((tag: Tag) => {
    routes.push({
      url: `${siteUrl}/tag/${tag.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    });
  });

  // Pages
  try {
    const pages = await getAllPages();
    pages.forEach((page) => {
      routes.push({
        url: `${siteUrl}/${page.slug}`,
        lastModified: new Date(page.modified),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    });
  } catch (error) {
    // Pages might not exist, ignore
  }

  return routes;
}
