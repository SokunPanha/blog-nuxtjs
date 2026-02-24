import { prisma } from "~~/server/api/utils/db";

export default defineEventHandler(async () => {
  // Get all tags with post count
  const tags = await prisma.tag.findMany({
    orderBy: { nameEn: "asc" },
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

  // Transform to include postCount and localized objects
  const transformedTags = tags.map((tag) => ({
    id: tag.id,
    name: { en: tag.nameEn, kh: tag.nameKh },
    description: { en: tag.descriptionEn, kh: tag.descriptionKh },
    slug: tag.slug,
    coverImage: tag.coverImage,
    postCount: tag._count.posts,
  }));

  return {
    status: 200,
    message: "Tags retrieved successfully",
    data: transformedTags,
  };
});
