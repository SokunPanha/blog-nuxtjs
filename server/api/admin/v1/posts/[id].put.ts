import { prisma } from "~~/server/api/utils/db";
import { PostUpdateSchema } from "~~/shared/types/zod";
import { generateSlug, ensureUniqueSlug } from "~~/server/utils/slug";

export default defineEventHandler(async (event) => {
  // Check authentication
  const session = await getUserSession(event);
  if (!session?.user) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }

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

  const { title, excerpt, slug, coverImage, content, status, categoryIds, tagIds } =
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
  } else if (title && title !== existingPost.title && !slug) {
    const newSlug = generateSlug(title);
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
      title,
      excerpt,
      slug: finalSlug,
      coverImage,
      content,
      status,
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
          name: true,
          slug: true,
        },
      },
      tags: {
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
    message: "Post updated successfully",
    data: post,
  };
});
