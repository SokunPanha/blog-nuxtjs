import { prisma } from "~~/server/api/utils/db";
import {
  getPaginationParams,
  createPaginatedResponse,
} from "~~/server/utils/pagination";

export default defineEventHandler(async (event) => {
  const { page, limit, skip, search } = getPaginationParams(event);
  const query = getQuery(event);
  const categorySlug = query.category as string | undefined;
  const tagSlug = query.tag as string | undefined;

  // Build where clause - only published posts
  const where: any = {
    status: "PUBLISHED",
    deletedAt: null,
  };

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { excerpt: { contains: search, mode: "insensitive" } },
    ];
  }

  if (categorySlug) {
    where.categories = {
      some: {
        slug: categorySlug,
      },
    };
  }

  if (tagSlug) {
    where.tags = {
      some: {
        slug: tagSlug,
      },
    };
  }

  // Get total count
  const total = await prisma.post.count({ where });

  // Get posts with relations
  const posts = await prisma.post.findMany({
    where,
    skip,
    take: limit,
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      title: true,
      excerpt: true,
      slug: true,
      coverImage: true,
      publishedAt: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatar: true,
        },
      },
      categories: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      tags: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });

  return {
    status: 200,
    message: "Posts retrieved successfully",
    ...createPaginatedResponse(posts, total, page, limit),
  };
});
