import { prisma } from "~~/server/api/utils/db";

export default defineEventHandler(async (event) => {
  // Auth is handled by server/middleware/admin-auth.ts
  const adminUser = event.context.adminUser;

  // Check if user is admin
  if (adminUser.role !== "ADMIN") {
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

  // Prevent self-deletion
  if (id === adminUser.id) {
    throw createError({
      statusCode: 400,
      message: "Cannot delete your own account",
    });
  }

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { id },
    include: {
      _count: {
        select: { posts: true },
      },
    },
  });

  if (!existingUser) {
    throw createError({
      statusCode: 404,
      message: "User not found",
    });
  }

  // Check if user has posts
  if (existingUser._count.posts > 0) {
    throw createError({
      statusCode: 400,
      message: `Cannot delete user with ${existingUser._count.posts} associated posts. Reassign posts first.`,
    });
  }

  // Delete user
  await prisma.user.delete({
    where: { id },
  });

  return {
    status: 200,
    message: "User deleted successfully",
  };
});
