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
      { titleEn: { contains: search, mode: "insensitive" } },
      { titleKh: { contains: search, mode: "insensitive" } },
      { excerptEn: { contains: search, mode: "insensitive" } },
    ];
  }

  if (status) {
    where.status = status;
  }

  // Get total count
  const total = await prisma.post.count({ where });

  // Get posts with relations
  const posts = await prisma.post.findMany({
    where,
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatar: true,
        },
      },
      categories: {
        select: {
          id: true,
          nameEn: true,
          nameKh: true,
          slug: true,
        },
      },
      tags: {
        select: {
          id: true,
          nameEn: true,
          nameKh: true,
          slug: true,
        },
      },
    },
  });

  return {
    status: 200,
    message: "Posts retrieved successfully",
    ...createPaginatedResponse(posts, total, page, limit),
  };
});
