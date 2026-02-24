import { prisma } from "~~/server/api/utils/db";
import {
  getPaginationParams,
  createPaginatedResponse,
} from "~~/server/utils/pagination";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  const { page, limit, skip } = getPaginationParams(event);

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: "Category slug is required",
    });
  }

  // Get the category
  const category = await prisma.category.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
    },
  });

  if (!category) {
    throw createError({
      statusCode: 404,
      message: "Category not found",
    });
  }

  // Get total posts count
  const total = await prisma.post.count({
    where: {
      status: "PUBLISHED",
      deletedAt: null,
      categories: {
        some: { id: category.id },
      },
    },
  });

  // Get posts in this category
  const posts = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
      deletedAt: null,
      categories: {
        some: { id: category.id },
      },
    },
    skip,
    take: limit,
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      titleEn: true,
      titleKh: true,
      excerptEn: true,
      excerptKh: true,
      slug: true,
      coverImage: true,
      publishedAt: true,
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
    },
  });

  const transformedPosts = posts.map((p) => ({
    id: p.id,
    title: { en: p.titleEn, kh: p.titleKh },
    excerpt: { en: p.excerptEn, kh: p.excerptKh },
    slug: p.slug,
    coverImage: p.coverImage,
    publishedAt: p.publishedAt,
    author: p.author,
    categories: p.categories.map((c) => ({
      id: c.id,
      name: { en: c.nameEn, kh: c.nameKh },
      slug: c.slug,
    })),
  }));

  return {
    status: 200,
    message: "Category retrieved successfully",
    data: {
      category: {
        id: category.id,
        name: { en: category.nameEn, kh: category.nameKh },
        description: { en: category.descriptionEn, kh: category.descriptionKh },
        slug: category.slug,
        coverImage: category.coverImage,
      },
      ...createPaginatedResponse(transformedPosts, total, page, limit),
    },
  };
});
