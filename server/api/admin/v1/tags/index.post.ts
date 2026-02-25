import { prisma } from "~~/server/api/utils/db";
import { TagRequestSchema } from "~~/shared/types/zod";
import { generateSlug, ensureUniqueSlug } from "~~/server/utils/slug";

export default defineEventHandler(async (event) => {
  // Auth is handled by server/middleware/admin-auth.ts
  const body = await readBody(event);

  // Validate request body
  const result = TagRequestSchema.safeParse(body);
  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: "Validation failed",
      data: result.error.flatten(),
    });
  }

  const { nameEn, nameKh, slug, descriptionEn, descriptionKh, coverImage } = result.data;

  // Generate slug if not provided
  let finalSlug = slug || generateSlug(nameEn);

  // Ensure slug is unique
  const existingSlugs = await prisma.tag.findMany({
    select: { slug: true },
  });
  finalSlug = ensureUniqueSlug(
    finalSlug,
    existingSlugs.map((t) => t.slug)
  );

  // Create tag
  const tag = await prisma.tag.create({
    data: {
      nameEn,
      nameKh,
      slug: finalSlug,
      descriptionEn,
      descriptionKh,
      coverImage,
    },
  });

  return {
    status: 201,
    message: "Tag created successfully",
    data: tag,
  };
});
