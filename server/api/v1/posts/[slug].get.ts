import { prisma } from "~~/server/api/utils/db";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: "Post slug is required",
    });
  }

  // Get the post
  const post = await prisma.post.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
      deletedAt: null,
    },
    include: {
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

  if (!post) {
    throw createError({
      statusCode: 404,
      message: "Post not found",
    });
  }

  // Get related posts (same category, excluding current post)
  const categoryIds = post.categories.map((c) => c.id);
  const relatedPosts = await prisma.post.findMany({
    where: {
      id: { not: post.id },
      status: "PUBLISHED",
      deletedAt: null,
      categories: {
        some: {
          id: { in: categoryIds },
        },
      },
    },
    take: 4,
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      title: true,
      excerpt: true,
      slug: true,
      coverImage: true,
      publishedAt: true,
      author: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatar: true,
        },
      },
    },
  });

  return {
    status: 200,
    message: "Post retrieved successfully",
    data: {
      ...post,
      relatedPosts,
    },
  };
});
