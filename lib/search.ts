import { prisma } from "@/lib/prisma";
import type { PostIndex } from "@/types/blog";
import { transformToPostIndex } from "@/lib/posts";

/**
 * Search posts by title and content
 */
export async function searchPosts(query: string, limit: number = 20): Promise<PostIndex[]> {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const searchTerm = `%${query.trim()}%`;

  // MySQL doesn't support case-insensitive mode, use LIKE query directly
  const dbPosts = await prisma.$queryRaw<any[]>`
    SELECT p.id
    FROM posts p
    WHERE p.status = 'publish'
    AND (
      p.title LIKE ${searchTerm}
      OR p.excerpt LIKE ${searchTerm}
      OR p.content LIKE ${searchTerm}
    )
    ORDER BY p.post_date DESC
    LIMIT ${limit}
  `;

  // Get full post data with relations for matching posts
  const postIds = dbPosts.map((p: any) => p.id);

  if (postIds.length === 0) {
    return [];
  }

  const fullPosts = await prisma.post.findMany({
    where: {
      id: {
        in: postIds,
      },
      status: "publish",
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

  return fullPosts.map(transformToPostIndex);
}
