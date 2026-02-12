import { prisma } from "~~/server/api/utils/db";

export default defineEventHandler(async (event) => {
  // Auth is handled by server/middleware/admin-auth.ts
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      message: "Tag ID is required",
    });
  }

  // Check if tag exists
  const existingTag = await prisma.tag.findUnique({
    where: { id },
  });

  if (!existingTag) {
    throw createError({
      statusCode: 404,
      message: "Tag not found",
    });
  }

  // Delete tag (will automatically disconnect from posts)
  await prisma.tag.delete({
    where: { id },
  });

  return {
    status: 200,
    message: "Tag deleted successfully",
  };
});
