import { prisma } from "~~/server/api/utils/db";
import { CategoryRequestSchema } from "~~/shared/types/zod";
import { generateSlug, ensureUniqueSlug } from "~~/server/utils/slug";

export default defineEventHandler(async (event) => {
  // Auth is handled by server/middleware/admin-auth.ts
  const body = await readBody(event);

  // Validate request body
  const result = CategoryRequestSchema.safeParse(body);
  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: "Validation failed",
      data: result.error.flatten(),
    });
  }

  const { name, slug, description, coverImage, status } = result.data;

  // Generate slug if not provided
  let finalSlug = slug || generateSlug(name);

  // Ensure slug is unique
  const existingSlugs = await prisma.category.findMany({
    select: { slug: true },
  });
  finalSlug = ensureUniqueSlug(
    finalSlug,
    existingSlugs.map((c) => c.slug)
  );

  // Create category
  const category = await prisma.category.create({
    data: {
      name,
      slug: finalSlug,
      description,
      coverImage,
      status,
    },
  });

  return {
    status: 201,
    message: "Category created successfully",
    data: category,
  };
});
