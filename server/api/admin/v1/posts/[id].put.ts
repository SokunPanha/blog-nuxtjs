import { prisma } from "~~/server/api/utils/db";
import { PostUpdateSchema } from "~~/shared/types/zod";
import { generateSlug, ensureUniqueSlug } from "~~/server/utils/slug";

export default defineEventHandler(async (event) => {
  // Auth is handled by server/middleware/admin-auth.ts
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      message: "Post ID is required",
    });
  }

  // Check if post exists
  const existingPost = await prisma.post.findUnique({
    where: { id },
    include: {
      categories: { select: { id: true } },
      tags: { select: { id: true } },
    },
  });

  if (!existingPost) {
    throw createError({
      statusCode: 404,
      message: "Post not found",
    });
  }

  const body = await readBody(event);

  // Validate request body
  const result = PostUpdateSchema.safeParse(body);
  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: "Validation failed",
      data: result.error.flatten(),
    });
  }

  const { titleEn, titleKh, excerptEn, excerptKh, slug, coverImage, contentEn, contentKh, status, isFeatured, categoryIds, tagIds, relatedPostIds } =
    result.data;

  // Handle slug update
  let finalSlug = existingPost.slug;
  if (slug && slug !== existingPost.slug) {
    const existingSlugs = await prisma.post.findMany({
      where: { id: { not: id } },
      select: { slug: true },
    });
    finalSlug = ensureUniqueSlug(
      slug,
      existingSlugs.map((p) => p.slug)
    );
  } else if (titleEn && titleEn !== existingPost.titleEn && !slug) {
    const newSlug = generateSlug(titleEn);
    const existingSlugs = await prisma.post.findMany({
      where: { id: { not: id } },
      select: { slug: true },
    });
    finalSlug = ensureUniqueSlug(
      newSlug,
      existingSlugs.map((p) => p.slug)
    );
  }

  // Determine publishedAt
  let publishedAt = existingPost.publishedAt;
  if (status === "PUBLISHED" && existingPost.status !== "PUBLISHED") {
    publishedAt = new Date();
  } else if (status && status !== "PUBLISHED") {
    publishedAt = null;
  }

  // Update post
  const post = await prisma.post.update({
    where: { id },
    data: {
      titleEn,
      titleKh,
      excerptEn,
      excerptKh,
      slug: finalSlug,
      coverImage,
      contentEn,
      contentKh,
      status,
      isFeatured,
      publishedAt,
      categories: categoryIds !== undefined
        ? {
            set: [],
            connect: categoryIds.map((catId) => ({ id: catId })),
          }
        : undefined,
      tags: tagIds !== undefined
        ? {
            set: [],
            connect: tagIds.map((tagId) => ({ id: tagId })),
          }
        : undefined,
      relatedPosts: relatedPostIds !== undefined
        ? {
            set: [],
            connect: relatedPostIds.map((postId) => ({ id: postId })),
          }
        : undefined,
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
      relatedPosts: {
        select: {
          id: true,
          titleEn: true,
          titleKh: true,
          slug: true,
          coverImage: true,
        },
      },
    },
  });

  return {
    status: 200,
    message: "Post updated successfully",
    data: post,
  };
});
