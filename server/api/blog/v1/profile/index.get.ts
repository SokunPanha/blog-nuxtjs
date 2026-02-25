import { requireBlogSession } from "~~/server/utils/blogSession";
import { prisma } from "~~/server/api/utils/db";

export default defineEventHandler(async (event) => {
  const sessionUser = await requireBlogSession(event);

  const user = await prisma.user.findUnique({
    where: { id: sessionUser.id },
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      email: true,
      avatar: true,
      role: true,
      createdAt: true,
      accounts: {
        select: {
          provider: true,
        },
      },
    },
  });

  if (!user) {
    throw createError({ statusCode: 404, message: "User not found" });
  }

  return {
    status: 200,
    message: "Profile retrieved successfully",
    data: user,
  };
});
