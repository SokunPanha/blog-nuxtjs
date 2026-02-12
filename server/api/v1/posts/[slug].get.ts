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
      // Include manually selected related posts
      relatedPosts: {
        where: {
          status: "PUBLISHED",
          deletedAt: null,
        },
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
      },
    },
  });

  if (!post) {
    throw createError({
      statusCode: 404,
      message: "Post not found",
    });
  }

  // Use manually selected related posts if available
  let relatedPosts = post.relatedPosts || [];

  // If not enough manually selected posts, supplement with category-based posts
  if (relatedPosts.length < 4) {
    const manualIds = relatedPosts.map((p) => p.id);
    const categoryIds = post.categories.map((c) => c.id);

    const categoryBasedPosts = await prisma.post.findMany({
      where: {
        id: { notIn: [post.id, ...manualIds] },
        status: "PUBLISHED",
        deletedAt: null,
        categories: {
          some: {
            id: { in: categoryIds },
          },
        },
      },
      take: 4 - relatedPosts.length,
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

    relatedPosts = [...relatedPosts, ...categoryBasedPosts];
  }

  // Remove relatedPosts from post object to avoid duplication
  const { relatedPosts: _, ...postData } = post;

  return {
    status: 200,
    message: "Post retrieved successfully",
    data: {
      ...postData,
      relatedPosts,
    },
  };
});
