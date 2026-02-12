import { prisma } from "~~/server/api/utils/db";

export default defineEventHandler(async (event) => {
  // Auth is handled by server/middleware/admin-auth.ts
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      message: "Post ID is required",
    });
  }

  const post = await prisma.post.findUnique({
    where: { id },
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
      relatedPosts: {
        select: {
          id: true,
          title: true,
          slug: true,
          coverImage: true,
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

  return {
    status: 200,
    message: "Post retrieved successfully",
    data: post,
  };
});
