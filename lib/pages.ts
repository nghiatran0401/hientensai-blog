import { prisma } from "@/lib/prisma";
import type { Page, PageIndex } from "@/types/blog";

// Cache for pages index
let pagesIndexCache: PageIndex[] | null = null;

/**
 * Transform Prisma page to PageIndex
 */
function transformToPageIndex(dbPage: any): PageIndex {
  return {
    id: dbPage.id,
    slug: dbPage.slug,
    title: dbPage.title,
    date: dbPage.date.toISOString(),
    modified: dbPage.modified.toISOString(),
    parent: dbPage.parentId || 0,
    menuOrder: dbPage.menuOrder,
  };
}

/**
 * Transform Prisma page to Page
 */
function transformToPage(dbPage: any): Page {
  return {
    id: dbPage.id,
    slug: dbPage.slug,
    title: dbPage.title,
    content: dbPage.content,
    date: dbPage.date.toISOString(),
    modified: dbPage.modified.toISOString(),
    author: dbPage.authorId,
    featuredImage: dbPage.featuredImageUrl
      ? {
          url: dbPage.featuredImageUrl,
          original: dbPage.featuredImageUrl,
          id: dbPage.featuredImageId || 0,
        }
      : null,
    parent: dbPage.parentId || 0,
    menuOrder: dbPage.menuOrder,
    status: dbPage.status,
    images: dbPage.images.map((img: any) => ({
      original: img.originalUrl,
      clean: img.cleanUrl || img.originalUrl,
      alt: img.altText || "",
      width: img.width || undefined,
      height: img.height || undefined,
    })),
    meta: {
      originalLink: dbPage.originalLink || "",
      template: dbPage.template || "default",
    },
  };
}

/**
 * Get all pages (index)
 */
export async function getAllPages(): Promise<PageIndex[]> {
  if (pagesIndexCache) {
    return pagesIndexCache;
  }

  const dbPages = await prisma.page.findMany({
    where: { status: "publish" },
    orderBy: {
      menuOrder: "asc",
    },
  });

  const pages = dbPages.map(transformToPageIndex);
  pagesIndexCache = pages;
  return pages;
}

/**
 * Get all page slugs
 */
export async function getAllPageSlugs(): Promise<string[]> {
  const pages = await getAllPages();
  return pages.map((page) => page.slug);
}

/**
 * Get a single page by slug
 */
export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const dbPage = await prisma.page.findUnique({
      where: { slug },
      include: {
        images: true,
      },
    });

    if (!dbPage) {
      return null;
    }

    return transformToPage(dbPage);
  } catch (error) {
    console.error(`Error reading page ${slug}:`, error);
    return null;
  }
}
