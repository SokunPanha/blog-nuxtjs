import { requireBlogSession, setBlogSession } from "~~/server/utils/blogSession";
import { prisma } from "~~/server/api/utils/db";

export default defineEventHandler(async (event) => {
  const sessionUser = await requireBlogSession(event);
  const body = await readBody(event);

  const { firstName, lastName, username, avatar } = body;

  // Validate username if changed
  if (username && username !== sessionUser.username) {
    const existing = await prisma.user.findUnique({ where: { username } });
    if (existing) {
      throw createError({ statusCode: 409, message: "Username already taken" });
    }
  }

  const updated = await prisma.user.update({
    where: { id: sessionUser.id },
    data: {
      ...(firstName !== undefined && { firstName }),
      ...(lastName !== undefined && { lastName }),
      ...(username && { username }),
      ...(avatar !== undefined && { avatar }),
    },
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      email: true,
      avatar: true,
      role: true,
    },
  });

  // Refresh session with updated user data
  await setBlogSession(event, { user: updated });

  return {
    status: 200,
    message: "Profile updated successfully",
    data: updated,
  };
});
