import { prisma } from "~~/server/api/utils/db";

export default defineEventHandler(async () => {
  // Get published categories with post count
  const categories = await prisma.category.findMany({
    where: {
      status: "PUBLISHED",
    },
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
  const transformedCategories = categories.map((cat) => ({
    id: cat.id,
    name: { en: cat.nameEn, kh: cat.nameKh },
    description: { en: cat.descriptionEn, kh: cat.descriptionKh },
    slug: cat.slug,
    coverImage: cat.coverImage,
    postCount: cat._count.posts,
  }));

  return {
    status: 200,
    message: "Categories retrieved successfully",
    data: transformedCategories,
  };
});
