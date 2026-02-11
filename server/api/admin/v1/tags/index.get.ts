import { prisma } from "~~/server/api/utils/db";
import {
  getPaginationParams,
  createPaginatedResponse,
} from "~~/server/utils/pagination";

export default defineEventHandler(async (event) => {
  // Check authentication
  const session = await getUserSession(event);
  if (!session?.user) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  const { page, limit, skip, search } = getPaginationParams(event);

  // Build where clause
  const where: any = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  // Get total count
  const total = await prisma.tag.count({ where });

  // Get tags with post count
  const tags = await prisma.tag.findMany({
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
  const transformedTags = tags.map((tag) => ({
    ...tag,
    postCount: tag._count.posts,
    _count: undefined,
  }));

  return {
    status: 200,
    message: "Tags retrieved successfully",
    ...createPaginatedResponse(transformedTags, total, page, limit),
  };
});
