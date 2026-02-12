import { prisma } from "~~/server/api/utils/db";
import { PostRequestSchema } from "~~/shared/types/zod";
import { generateSlug, ensureUniqueSlug } from "~~/server/utils/slug";

export default defineEventHandler(async (event) => {
  // Auth is handled by server/middleware/admin-auth.ts
  // Admin user is available in event.context.adminUser
  const adminUser = event.context.adminUser;

  const body = await readBody(event);

  // Validate request body
  const result = PostRequestSchema.safeParse(body);
  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: "Validation failed",
      data: result.error.flatten(),
    });
  }

  const { title, excerpt, slug, coverImage, content, status, isFeatured, categoryIds, tagIds, relatedPostIds } =
    result.data;

  // Generate slug if not provided
  let finalSlug = slug || generateSlug(title);

  // Ensure slug is unique
  const existingSlugs = await prisma.post.findMany({
    select: { slug: true },
  });
  finalSlug = ensureUniqueSlug(
    finalSlug,
    existingSlugs.map((p) => p.slug)
  );

  // Create post
  // TODO: Add isFeatured: isFeatured || false after running: npx prisma db push
  const post = await prisma.post.create({
    data: {
      title,
      excerpt,
      slug: finalSlug,
      coverImage,
      content,
      status,
      // isFeatured: isFeatured || false, // Uncomment after migration
      publishedAt: status === "PUBLISHED" ? new Date() : null,
      authorId: adminUser.id,
      categories: categoryIds?.length
        ? { connect: categoryIds.map((id) => ({ id })) }
        : undefined,
      tags: tagIds?.length
        ? { connect: tagIds.map((id) => ({ id })) }
        : undefined,
      relatedPosts: relatedPostIds?.length
        ? { connect: relatedPostIds.map((id) => ({ id })) }
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
      relatedPosts: {
        select: {
          id: true,
          title: true,
          slug: true,
          coverImage: true,
        },
      },
    },
  });

  return {
    status: 201,
    message: "Post created successfully",
    data: post,
  };
});
