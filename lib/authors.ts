import { prisma } from "@/lib/prisma";
import { transformToPostIndex } from "@/lib/posts";
import type { PostIndex } from "@/types/blog";

export interface Author {
  id: number;
  name: string;
  slug: string;
  email?: string;
  bio?: string;
  avatarUrl?: string;
  website?: string;
}

/**
 * Get all authors
 */
export async function getAllAuthors(): Promise<Author[]> {
  const dbAuthors = await prisma.author.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return dbAuthors.map((author: { id: number; name: string; slug: string; email: string | null; bio: string | null; avatarUrl: string | null; website: string | null }) => ({
    id: author.id,
    name: author.name,
    slug: author.slug,
    email: author.email || undefined,
    bio: author.bio || undefined,
    avatarUrl: author.avatarUrl || undefined,
    website: author.website || undefined,
  }));
}

/**
 * Get author by slug
 */
export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const author = await prisma.author.findUnique({
    where: { slug },
  });

  if (!author) {
    return null;
  }

  return {
    id: author.id,
    name: author.name,
    slug: author.slug,
    email: author.email || undefined,
    bio: author.bio || undefined,
    avatarUrl: author.avatarUrl || undefined,
    website: author.website || undefined,
  };
}

/**
 * Get posts by author ID
 */
export async function getPostsByAuthor(authorId: number): Promise<PostIndex[]> {
  const dbPosts = await prisma.post.findMany({
    where: {
      status: "publish",
      authorId,
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
