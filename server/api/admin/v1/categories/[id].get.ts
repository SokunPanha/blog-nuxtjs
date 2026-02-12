import { prisma } from "~~/server/api/utils/db";

export default defineEventHandler(async (event) => {
  // Auth is handled by server/middleware/admin-auth.ts
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      message: "Category ID is required",
    });
  }

  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      _count: {
        select: { posts: true },
      },
    },
  });

  if (!category) {
    throw createError({
      statusCode: 404,
      message: "Category not found",
    });
  }

  return {
    status: 200,
    message: "Category retrieved successfully",
    data: {
      ...category,
      postCount: category._count.posts,
      _count: undefined,
    },
  };
});
