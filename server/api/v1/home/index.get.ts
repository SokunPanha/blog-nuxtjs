import { prisma } from "~~/server/api/utils/db";

export default defineEventHandler(async () => {
  // Get latest posts
  const latestPosts = await prisma.post.findMany({
    where: { status: "PUBLISHED", deletedAt: null },
    take: 3,
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      coverImage: true,
      excerpt: true,
      publishedAt: true,
      author: { select: { username: true, avatar: true } },
    },
  });

  // Get popular posts (by view count or comment count - simulated for now)
  const popularPosts = await prisma.post.findMany({
    where: { status: "PUBLISHED", deletedAt: null },
    take: 3,
    orderBy: { createdAt: "desc" }, // Should be views/likes
    select: {
      id: true,
      title: true,
      slug: true,
      coverImage: true,
      excerpt: true,
      publishedAt: true,
      author: { select: { username: true, avatar: true } },
    },
  });

  // Get featured posts (by view count or comment count - simulated for now)
  const featuredPosts = await prisma.post.findMany({
    where: { status: "PUBLISHED", deletedAt: null },
    take: 3,
    orderBy: { createdAt: "asc" }, // Should be featured flag
    select: {
      id: true,
      title: true,
      slug: true,
      coverImage: true,
      excerpt: true,
      publishedAt: true,
      author: { select: { username: true, avatar: true } },
    },
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
