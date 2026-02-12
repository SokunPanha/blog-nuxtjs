import { prisma } from "~~/server/api/utils/db";
import { UserUpdateSchema } from "~~/shared/types/zod";

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

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!existingUser) {
    throw createError({
      statusCode: 404,
      message: "User not found",
    });
  }

  const body = await readBody(event);

  // Validate request body
  const result = UserUpdateSchema.safeParse(body);
  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: "Validation failed",
      data: result.error.flatten(),
    });
  }

  const { firstName, lastName, avatar, role, email } = result.data;

  // Check email uniqueness if updating
  if (email && email !== existingUser.email) {
    const emailExists = await prisma.user.findUnique({
      where: { email },
    });
    if (emailExists) {
      throw createError({
        statusCode: 400,
        message: "Email already in use",
      });
    }
  }

  // Update user
  const user = await prisma.user.update({
    where: { id },
    data: {
      firstName,
      lastName,
      avatar,
      role,
      email,
    },
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
    },
  });

  return {
    status: 200,
    message: "User updated successfully",
    data: user,
  };
});
