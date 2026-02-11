import { prisma } from "~~/server/api/utils/db";
import { CategoryUpdateSchema } from "~~/shared/types/zod";
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
      message: "Category ID is required",
    });
  }

  // Check if category exists
  const existingCategory = await prisma.category.findUnique({
    where: { id },
  });

  if (!existingCategory) {
    throw createError({
      statusCode: 404,
      message: "Category not found",
    });
  }

  const body = await readBody(event);

  // Validate request body
  const result = CategoryUpdateSchema.safeParse(body);
  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: "Validation failed",
      data: result.error.flatten(),
    });
  }

  const { name, slug, description, coverImage, status } = result.data;

  // Handle slug update
  let finalSlug = existingCategory.slug;
  if (slug && slug !== existingCategory.slug) {
    const existingSlugs = await prisma.category.findMany({
      where: { id: { not: id } },
      select: { slug: true },
    });
    finalSlug = ensureUniqueSlug(
      slug,
      existingSlugs.map((c) => c.slug)
    );
  } else if (name && name !== existingCategory.name && !slug) {
    const newSlug = generateSlug(name);
    const existingSlugs = await prisma.category.findMany({
      where: { id: { not: id } },
      select: { slug: true },
    });
    finalSlug = ensureUniqueSlug(
      newSlug,
      existingSlugs.map((c) => c.slug)
    );
  }

  // Update category
  const category = await prisma.category.update({
    where: { id },
    data: {
      name,
      slug: finalSlug,
      description,
      coverImage,
      status,
    },
  });

  return {
    status: 200,
    message: "Category updated successfully",
    data: category,
  };
});
