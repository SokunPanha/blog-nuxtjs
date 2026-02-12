import { prisma } from "~~/server/api/utils/db";
import {
  getPaginationParams,
  createPaginatedResponse,
} from "~~/server/utils/pagination";

export default defineEventHandler(async (event) => {
  // Auth is handled by server/middleware/admin-auth.ts
  const { page, limit, skip, search, status } = getPaginationParams(event);

  // Build where clause
  const where: any = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  if (status) {
    where.status = status;
  }

  // Get total count
  const total = await prisma.category.count({ where });

  // Get categories with post count
  const categories = await prisma.category.findMany({
    where,
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { posts: true },
      },
    },
  });

  // Transform to include postCount
  const transformedCategories = categories.map((cat) => ({
    ...cat,
    postCount: cat._count.posts,
    _count: undefined,
  }));

  return {
    status: 200,
    message: "Categories retrieved successfully",
    ...createPaginatedResponse(transformedCategories, total, page, limit),
  };
});
