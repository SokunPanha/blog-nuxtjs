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

  const tag = await prisma.tag.findUnique({
    where: { id },
    include: {
      _count: {
        select: { posts: true },
      },
    },
  });

  if (!tag) {
    throw createError({
      statusCode: 404,
      message: "Tag not found",
    });
  }

  return {
    status: 200,
    message: "Tag retrieved successfully",
    data: {
      ...tag,
      postCount: tag._count.posts,
      _count: undefined,
    },
  };
});
