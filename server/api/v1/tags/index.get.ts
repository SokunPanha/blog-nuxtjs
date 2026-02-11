import { prisma } from "~~/server/api/utils/db";

export default defineEventHandler(async () => {
  // Get all tags with post count
  const tags = await prisma.tag.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: {
          posts: {
            where: {
              status: "PUBLISHED",
              deletedAt: null,
            },
          },
        },
      },
    },
  });

  // Transform to include postCount
  const transformedTags = tags.map((tag) => ({
    id: tag.id,
    name: tag.name,
    slug: tag.slug,
    description: tag.description,
    coverImage: tag.coverImage,
    postCount: tag._count.posts,
  }));

  return {
    status: 200,
    message: "Tags retrieved successfully",
    data: transformedTags,
  };
});
