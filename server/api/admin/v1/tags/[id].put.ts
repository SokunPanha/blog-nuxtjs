import { prisma } from "~~/server/api/utils/db";
import { TagUpdateSchema } from "~~/shared/types/zod";
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
      message: "Tag ID is required",
    });
  }

  // Check if tag exists
  const existingTag = await prisma.tag.findUnique({
    where: { id },
  });

  if (!existingTag) {
    throw createError({
      statusCode: 404,
      message: "Tag not found",
    });
  }

  const body = await readBody(event);

  // Validate request body
  const result = TagUpdateSchema.safeParse(body);
  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: "Validation failed",
      data: result.error.flatten(),
    });
  }

  const { name, slug, description, coverImage } = result.data;

  // Handle slug update
  let finalSlug = existingTag.slug;
  if (slug && slug !== existingTag.slug) {
    const existingSlugs = await prisma.tag.findMany({
      where: { id: { not: id } },
      select: { slug: true },
    });
    finalSlug = ensureUniqueSlug(
      slug,
      existingSlugs.map((t) => t.slug)
    );
  } else if (name && name !== existingTag.name && !slug) {
    const newSlug = generateSlug(name);
    const existingSlugs = await prisma.tag.findMany({
      where: { id: { not: id } },
      select: { slug: true },
    });
    finalSlug = ensureUniqueSlug(
      newSlug,
      existingSlugs.map((t) => t.slug)
    );
  }

  // Update tag
  const tag = await prisma.tag.update({
    where: { id },
    data: {
      name,
      slug: finalSlug,
      description,
      coverImage,
    },
  });

  return {
    status: 200,
    message: "Tag updated successfully",
    data: tag,
  };
});
