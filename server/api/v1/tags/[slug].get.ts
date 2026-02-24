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
      message: "Tag slug is required",
    });
  }

  // Get the tag
  const tag = await prisma.tag.findFirst({
    where: { slug },
  });

  if (!tag) {
    throw createError({
      statusCode: 404,
      message: "Tag not found",
    });
  }

  // Get total posts count
  const total = await prisma.post.count({
    where: {
      status: "PUBLISHED",
      deletedAt: null,
      tags: {
        some: { id: tag.id },
      },
    },
  });

  // Get posts with this tag
  const posts = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
      deletedAt: null,
      tags: {
        some: { id: tag.id },
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

  const transformedPosts = posts.map((p) => ({
    id: p.id,
    title: { en: p.titleEn, kh: p.titleKh },
    excerpt: { en: p.excerptEn, kh: p.excerptKh },
    slug: p.slug,
    coverImage: p.coverImage,
    publishedAt: p.publishedAt,
    author: p.author,
    tags: p.tags.map((t) => ({
      id: t.id,
      name: { en: t.nameEn, kh: t.nameKh },
      slug: t.slug,
    })),
  }));

  return {
    status: 200,
    message: "Tag retrieved successfully",
    data: {
      tag: {
        id: tag.id,
        name: { en: tag.nameEn, kh: tag.nameKh },
        description: { en: tag.descriptionEn, kh: tag.descriptionKh },
        slug: tag.slug,
        coverImage: tag.coverImage,
      },
      ...createPaginatedResponse(transformedPosts, total, page, limit),
    },
  };
});
