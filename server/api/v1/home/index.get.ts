import { prisma } from "~~/server/api/utils/db";

export default defineEventHandler(async () => {
  const baseSelect = {
    id: true,
    title: true,
    slug: true,
    coverImage: true,
    excerpt: true,
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
  };

  const baseWhere = {
    status: "PUBLISHED",
    deletedAt: null,
  };

  // Get latest posts (ordered by publishedAt desc)
  const latestPosts = await prisma.post.findMany({
    where: baseWhere,
    take: 6,
    orderBy: { publishedAt: "desc" },
    select: baseSelect,
  });

  // Get popular posts (ordered by createdAt for now - will use viewCount after migration)
  // TODO: Change to orderBy: { viewCount: "desc" } after running: npx prisma db push
  const popularPosts = await prisma.post.findMany({
    where: baseWhere,
    take: 6,
    orderBy: { createdAt: "desc" },
    select: baseSelect,
  });

  // Get featured posts (using latest posts for now - will filter by isFeatured after migration)
  // TODO: Add isFeatured: true filter after running: npx prisma db push
  const featuredPosts = await prisma.post.findMany({
    where: baseWhere,
    take: 6,
    orderBy: { createdAt: "asc" },
    select: baseSelect,
  });

  return {
    status: 200,
    message: "Home data retrieved successfully",
    data: {
      latestPosts,
      popularPosts,
      featuredPosts,
    },
  };
});
