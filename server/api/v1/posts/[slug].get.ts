import { prisma } from "~~/server/api/utils/db";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: "Post slug is required",
    });
  }

  // Get the post
  const post = await prisma.post.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
      deletedAt: null,
    },
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
      // Include manually selected related posts
      relatedPosts: {
        where: {
          status: "PUBLISHED",
          deletedAt: null,
        },
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
        },
      },
    },
  });

  if (!post) {
    throw createError({
      statusCode: 404,
      message: "Post not found",
    });
  }

  // Use manually selected related posts if available
  let relatedPosts = post.relatedPosts || [];

  // If not enough manually selected posts, supplement with category-based posts
  if (relatedPosts.length < 4) {
    const manualIds = relatedPosts.map((p) => p.id);
    const categoryIds = post.categories.map((c) => c.id);

    const categoryBasedPosts = await prisma.post.findMany({
      where: {
        id: { notIn: [post.id, ...manualIds] },
        status: "PUBLISHED",
        deletedAt: null,
        categories: {
          some: {
            id: { in: categoryIds },
          },
        },
      },
      take: 4 - relatedPosts.length,
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
      },
    });

    relatedPosts = [...relatedPosts, ...categoryBasedPosts];
  }

  // Remove relatedPosts and bilingual fields from post object
  const { relatedPosts: _, titleEn, titleKh, excerptEn, excerptKh, contentEn, contentKh, ...postData } = post;

  const transformRelated = (r: any) => ({
    id: r.id,
    title: { en: r.titleEn, kh: r.titleKh },
    excerpt: { en: r.excerptEn, kh: r.excerptKh },
    slug: r.slug,
    coverImage: r.coverImage,
    publishedAt: r.publishedAt,
    author: r.author,
  });

  return {
    status: 200,
    message: "Post retrieved successfully",
    data: {
      ...postData,
      title: { en: titleEn, kh: titleKh },
      excerpt: { en: excerptEn, kh: excerptKh },
      content: { en: contentEn, kh: contentKh },
      categories: post.categories.map((c) => ({
        id: c.id,
        name: { en: c.nameEn, kh: c.nameKh },
        slug: c.slug,
      })),
      tags: post.tags.map((t) => ({
        id: t.id,
        name: { en: t.nameEn, kh: t.nameKh },
        slug: t.slug,
      })),
      relatedPosts: relatedPosts.map(transformRelated),
    },
  };
});
