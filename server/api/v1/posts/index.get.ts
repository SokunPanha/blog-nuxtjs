import { prisma } from "~~/server/api/utils/db";
import {
  getPaginationParams,
  createPaginatedResponse,
} from "~~/server/utils/pagination";

export default defineEventHandler(async (event) => {
  const { page, limit, skip, search } = getPaginationParams(event);
  const query = getQuery(event);
  const categorySlug = query.category as string | undefined;
  const tagSlug = query.tag as string | undefined;

  // Build where clause - only published posts
  const where: any = {
    status: "PUBLISHED",
    deletedAt: null,
  };

  if (search) {
    where.OR = [
      { titleEn: { contains: search, mode: "insensitive" } },
      { titleKh: { contains: search, mode: "insensitive" } },
      { excerptEn: { contains: search, mode: "insensitive" } },
    ];
  }

  if (categorySlug) {
    where.categories = {
      some: {
        slug: categorySlug,
      },
    };
  }

  if (tagSlug) {
    where.tags = {
      some: {
        slug: tagSlug,
      },
    };
  }

  // Get total count
  const total = await prisma.post.count({ where });

  // Get posts with relations
  const posts = await prisma.post.findMany({
    where,
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
      createdAt: true,
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

  const transformed = posts.map((p) => ({
    id: p.id,
    title: { en: p.titleEn, kh: p.titleKh },
    excerpt: { en: p.excerptEn, kh: p.excerptKh },
    slug: p.slug,
    coverImage: p.coverImage,
    publishedAt: p.publishedAt,
    createdAt: p.createdAt,
    author: p.author,
    categories: p.categories.map((c) => ({
      id: c.id,
      name: { en: c.nameEn, kh: c.nameKh },
      slug: c.slug,
    })),
    tags: p.tags.map((t) => ({
      id: t.id,
      name: { en: t.nameEn, kh: t.nameKh },
      slug: t.slug,
    })),
  }));

  return {
    status: 200,
    message: "Posts retrieved successfully",
    ...createPaginatedResponse(transformed, total, page, limit),
  };
});
