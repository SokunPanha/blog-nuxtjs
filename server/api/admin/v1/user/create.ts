import { prisma } from "#server/api/utils/db";
import { UserRequestSchema } from "#shared/types/zod";
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const validatedBody = UserRequestSchema.safeParse(body);
    if (!validatedBody.success) {
      throw createError({
        statusCode: 400,
        message: validatedBody.error.issues
          .map((issue) => issue.message)
          .join(", "),
      });
    }
    const existingUser = await prisma.user.findUnique({
      where: {
        username: validatedBody.data.username,
      },
    });
    if (existingUser) {
      throw createError({
        statusCode: 400,
        message: "User already exist",
      });
    }
    const user = await prisma.user.create({
      data: validatedBody.data,
    });

    return {
      status: 200,
      message: "User created successfully",
      data: user,
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || "Internal server error",
    });
  }
});
