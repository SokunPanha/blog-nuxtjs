import { prisma } from "~~/server/api/utils/db";
import {
  getPaginationParams,
  createPaginatedResponse,
} from "~~/server/utils/pagination";

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

  const { page, limit, skip, search } = getPaginationParams(event);
  const query = getQuery(event);
  const role = query.role as string | undefined;

  // Build where clause
  const where: any = {};

  if (search) {
    where.OR = [
      { username: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { firstName: { contains: search, mode: "insensitive" } },
      { lastName: { contains: search, mode: "insensitive" } },
    ];
  }

  if (role) {
    where.role = role;
  }

  // Get total count
  const total = await prisma.user.count({ where });

  // Get users (exclude password)
  const users = await prisma.user.findMany({
    where,
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
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

  // Transform to include postCount
  const transformedUsers = users.map((user) => ({
    ...user,
    postCount: user._count.posts,
    _count: undefined,
  }));

  return {
    status: 200,
    message: "Users retrieved successfully",
    ...createPaginatedResponse(transformedUsers, total, page, limit),
  };
});
