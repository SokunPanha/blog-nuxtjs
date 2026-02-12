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

  // Check if category exists
  const existingCategory = await prisma.category.findUnique({
    where: { id },
    include: {
      _count: {
        select: { posts: true },
      },
    },
  });

  if (!existingCategory) {
    throw createError({
      statusCode: 404,
      message: "Category not found",
    });
  }

  // Check if category has posts
  if (existingCategory._count.posts > 0) {
    throw createError({
      statusCode: 400,
      message: `Cannot delete category with ${existingCategory._count.posts} associated posts. Remove posts first.`,
    });
  }

  // Delete category
  await prisma.category.delete({
    where: { id },
  });

  return {
    status: 200,
    message: "Category deleted successfully",
  };
});
