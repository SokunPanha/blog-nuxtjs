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

  // Check if post exists
  const existingPost = await prisma.post.findUnique({
    where: { id },
  });

  if (!existingPost) {
    throw createError({
      statusCode: 404,
      message: "Post not found",
    });
  }

  // Soft delete by setting deletedAt
  await prisma.post.update({
    where: { id },
    data: {
      deletedAt: new Date(),
      status: "ARCHIVED",
    },
  });

  return {
    status: 200,
    message: "Post deleted successfully",
  };
});
