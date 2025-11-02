import { prisma } from "@/lib/prisma";
import type { Post, PostIndex, Category, Tag } from "@/types/blog";

// Cache for posts index
let postsIndexCache: PostIndex[] | null = null;

/**
 * Transform Prisma post to PostIndex
 */
export function transformToPostIndex(dbPost: any): PostIndex {
  return {
    id: dbPost.id,
    slug: dbPost.slug,
    title: dbPost.title,
    excerpt: dbPost.excerpt || "",
    date: dbPost.date.toISOString(),
    modified: dbPost.modified.toISOString(),
    featuredImage: dbPost.featuredImageUrl
      ? {
          url: dbPost.featuredImageUrl,
          original: dbPost.featuredImageUrl,
          id: dbPost.featuredImageId || 0,
        }
      : null,
    categories: dbPost.categories.map((pc: any) => ({
      id: pc.category.id,
      name: pc.category.name,
      slug: pc.category.slug,
      description: pc.category.description || undefined,
      parent: pc.category.parent
        ? {
            id: pc.category.parent.id,
            name: pc.category.parent.name,
            slug: pc.category.parent.slug,
          }
        : undefined,
    })),
    tags: dbPost.tags.map((pt: any) => ({
      id: pt.tag.id,
      name: pt.tag.name,
      slug: pt.tag.slug,
      description: pt.tag.description || undefined,
    })),
  };
}

/**
 * Transform Prisma post to Post
 */
function transformToPost(dbPost: any): Post {
  return {
    id: dbPost.id,
    slug: dbPost.slug,
    title: dbPost.title,
    content: dbPost.content,
    excerpt: dbPost.excerpt || "",
    date: dbPost.date.toISOString(),
    modified: dbPost.modified.toISOString(),
    author: dbPost.authorId,
    featuredImage: dbPost.featuredImageUrl
      ? {
          url: dbPost.featuredImageUrl,
          original: dbPost.featuredImageUrl,
          id: dbPost.featuredImageId || 0,
        }
      : null,
    categories: dbPost.categories.map((pc: any) => ({
      id: pc.category.id,
      name: pc.category.name,
      slug: pc.category.slug,
      description: pc.category.description || undefined,
      parent: pc.category.parent
        ? {
            id: pc.category.parent.id,
            name: pc.category.parent.name,
            slug: pc.category.parent.slug,
          }
        : undefined,
    })),
    tags: dbPost.tags.map((pt: any) => ({
      id: pt.tag.id,
      name: pt.tag.name,
      slug: pt.tag.slug,
      description: pt.tag.description || undefined,
    })),
    status: dbPost.status,
    commentStatus: dbPost.commentStatus,
    images: dbPost.images.map((img: any) => ({
      original: img.originalUrl,
      clean: img.cleanUrl || img.originalUrl,
      alt: img.altText || "",
      width: img.width || undefined,
      height: img.height || undefined,
    })),
    meta: {
      originalLink: dbPost.originalLink || "",
      format: dbPost.format || "standard",
    },
  };
}

/**
 * Get all posts (index)
 */
export async function getAllPosts(): Promise<PostIndex[]> {
  if (postsIndexCache) {
    return postsIndexCache;
  }

  const dbPosts = await prisma.post.findMany({
    where: { status: "publish" },
    include: {
      categories: {
        include: {
          category: {
            include: {
              parent: true,
            },
          },
        },
      },
      tags: {
        include: {
          tag: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  const posts = dbPosts.map(transformToPostIndex);
  postsIndexCache = posts;
  return posts;
}

/**
 * Get paginated posts
 */
export async function getPaginatedPosts(
  page: number = 1,
  limit: number = 12
): Promise<{
  posts: PostIndex[];
  total: number;
  totalPages: number;
  currentPage: number;
}> {
  const skip = (page - 1) * limit;

  const [dbPosts, total] = await Promise.all([
    prisma.post.findMany({
      where: { status: "publish" },
      include: {
        categories: {
          include: {
            category: {
              include: {
                parent: true,
              },
            },
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
      skip,
      take: limit,
    }),
    prisma.post.count({
      where: { status: "publish" },
    }),
  ]);

  return {
    posts: dbPosts.map(transformToPostIndex),
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}

/**
 * Get all post slugs
 */
export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((post) => post.slug);
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const dbPost = await prisma.post.findUnique({
      where: { slug },
      include: {
        // Author relation - only include if authors table exists (after db:push)
        // author: true, // Uncomment after running: npm run db:push
        categories: {
          include: {
            category: {
              include: {
                parent: true,
              },
            },
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        images: true,
      },
    });

    if (!dbPost) {
      return null;
    }

    return transformToPost(dbPost);
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

/**
 * Get posts by category slug
 */
export async function getPostsByCategory(categorySlug: string): Promise<PostIndex[]> {
  const dbPosts = await prisma.post.findMany({
    where: {
      status: "publish",
      categories: {
        some: {
          category: {
            slug: categorySlug,
          },
        },
      },
    },
    include: {
      categories: {
        include: {
          category: {
            include: {
              parent: true,
            },
          },
        },
      },
      tags: {
        include: {
          tag: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  return dbPosts.map(transformToPostIndex);
}

/**
 * Get posts by tag slug
 */
export async function getPostsByTag(tagSlug: string): Promise<PostIndex[]> {
  const dbPosts = await prisma.post.findMany({
    where: {
      status: "publish",
      tags: {
        some: {
          tag: {
            slug: tagSlug,
          },
        },
      },
    },
    include: {
      categories: {
        include: {
          category: {
            include: {
              parent: true,
            },
          },
        },
      },
      tags: {
        include: {
          tag: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  return dbPosts.map(transformToPostIndex);
}

/**
 * Get posts by year and month
 */
export async function getPostsByDate(year: number, month?: number): Promise<PostIndex[]> {
  const startDate = new Date(year, month ? month - 1 : 0, 1);
  const endDate = month ? new Date(year, month, 0, 23, 59, 59) : new Date(year + 1, 0, 0, 23, 59, 59);

  const dbPosts = await prisma.post.findMany({
    where: {
      status: "publish",
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      categories: {
        include: {
          category: {
            include: {
              parent: true,
            },
          },
        },
      },
      tags: {
        include: {
          tag: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  return dbPosts.map(transformToPostIndex);
}

/**
 * Get all available archive dates (years and months with posts)
 */
export async function getArchiveDates(): Promise<Array<{ year: number; month?: number; count: number }>> {
  const posts = await prisma.post.findMany({
    where: { status: "publish" },
    select: {
      date: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  const archiveMap = new Map<string, number>();

  posts.forEach((post: { date: Date }) => {
    const date = new Date(post.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    // Year-only key
    const yearKey = `${year}`;
    archiveMap.set(yearKey, (archiveMap.get(yearKey) || 0) + 1);

    // Year-month key
    const monthKey = `${year}-${month}`;
    archiveMap.set(monthKey, (archiveMap.get(monthKey) || 0) + 1);
  });

  const archives: Array<{ year: number; month?: number; count: number }> = [];

  archiveMap.forEach((count, key) => {
    const parts = key.split("-");
    if (parts.length === 1) {
      archives.push({ year: parseInt(parts[0]), count });
    } else {
      archives.push({ year: parseInt(parts[0]), month: parseInt(parts[1]), count });
    }
  });

  return archives.sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    if (a.month && b.month) return b.month - a.month;
    return 0;
  });
}

/**
 * Get recent posts
 */
export async function getRecentPosts(limit: number = 10): Promise<PostIndex[]> {
  const dbPosts = await prisma.post.findMany({
    where: { status: "publish" },
    include: {
      categories: {
        include: {
          category: {
            include: {
              parent: true,
            },
          },
        },
      },
      tags: {
        include: {
          tag: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
    take: limit,
  });

  return dbPosts.map(transformToPostIndex);
}

/**
 * Get all unique categories
 */
export async function getAllCategories(): Promise<Category[]> {
  const dbCategories = await prisma.category.findMany({
    include: {
      parent: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return dbCategories.map((cat: { id: number; name: string; slug: string; description: string | null; parent: { id: number; name: string; slug: string } | null }) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    description: cat.description || undefined,
    parent: cat.parent
      ? {
          id: cat.parent.id,
          name: cat.parent.name,
          slug: cat.parent.slug,
        }
      : undefined,
  }));
}

/**
 * Get all unique tags
 */
export async function getAllTags(): Promise<Tag[]> {
  const dbTags = await prisma.tag.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return dbTags.map((tag: { id: number; name: string; slug: string; description: string | null }) => ({
    id: tag.id,
    name: tag.name,
    slug: tag.slug,
    description: tag.description || undefined,
  }));
}

/**
 * Get related posts based on categories and tags
 */
export async function getRelatedPosts(postId: number, categoryIds: number[], tagIds: number[], limit: number = 3): Promise<PostIndex[]> {
  // Build OR condition only if we have categories or tags
  const orConditions: any[] = [];

  if (categoryIds.length > 0) {
    orConditions.push({
      categories: {
        some: {
          categoryId: {
            in: categoryIds,
          },
        },
      },
    });
  }

  if (tagIds.length > 0) {
    orConditions.push({
      tags: {
        some: {
          tagId: {
            in: tagIds,
          },
        },
      },
    });
  }

  // If no categories or tags, return recent posts instead
  if (orConditions.length === 0) {
    const dbPosts = await prisma.post.findMany({
      where: {
        status: "publish",
        id: {
          not: postId,
        },
      },
      include: {
        categories: {
          include: {
            category: {
              include: {
                parent: true,
              },
            },
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
      take: limit,
    });

    return dbPosts.map(transformToPostIndex).filter((post: PostIndex) => post.slug && post.slug.trim() !== "");
  }

  const dbPosts = await prisma.post.findMany({
    where: {
      status: "publish",
      id: {
        not: postId, // Exclude current post
      },
      slug: {
        not: "", // Ensure slug is not empty
      },
      OR: orConditions,
    },
    include: {
      categories: {
        include: {
          category: {
            include: {
              parent: true,
            },
          },
        },
      },
      tags: {
        include: {
          tag: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
    take: limit,
  });

  // Filter out any posts with invalid slugs
  return dbPosts.map(transformToPostIndex).filter((post: PostIndex) => post.slug && post.slug.trim() !== "");
}

/**
 * Calculate reading time in minutes from HTML content
 */
export function calculateReadingTime(content: string): number {
  // Remove HTML tags
  const text = content.replace(/<[^>]*>/g, "");
  // Count words (split by whitespace)
  const words = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
  // Average reading speed: 200 words per minute
  const wordsPerMinute = 200;
  const minutes = Math.ceil(words.length / wordsPerMinute);
  return Math.max(1, minutes); // At least 1 minute
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
