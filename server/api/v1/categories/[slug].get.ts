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
      title: true,
      excerpt: true,
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
          name: true,
          slug: true,
        },
      },
    },
  });

  return {
    status: 200,
    message: "Category retrieved successfully",
    data: {
      category: {
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        coverImage: category.coverImage,
      },
      ...createPaginatedResponse(posts, total, page, limit),
    },
  };
});
