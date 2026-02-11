import { prisma } from "~~/server/api/utils/db";

export default defineEventHandler(async (event) => {
  // Check authentication
  const session = await getUserSession(event);
  if (!session?.user) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  // Check if user is admin
  if (session.user.role !== "ADMIN") {
    throw createError({
      statusCode: 403,
      message: "Forbidden: Admin access required",
    });
  }

  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      message: "User ID is required",
    });
  }

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      email: true,
      firstName: true,
      lastName: true,
      avatar: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: { posts: true },
      },
    },
  });

  if (!user) {
    throw createError({
      statusCode: 404,
      message: "User not found",
    });
  }

  return {
    status: 200,
    message: "User retrieved successfully",
    data: {
      ...user,
      postCount: user._count.posts,
      _count: undefined,
    },
  };
});
