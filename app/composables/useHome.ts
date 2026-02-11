import type { BlogCardType } from "~~/shared/types";

const mapPost = (post: any): BlogCardType => ({
  id: post.id,
  title: post.title,
  image: post.coverImage,
  slug: post.slug,
  author: {
    name: post.author.username,
    image: post.author.avatar || "",
  },
  date: new Date(post.publishedAt || Date.now()).toLocaleDateString(),
  excerpt: post.excerpt,
});

export const useHome = () => {
  const { data, status, refresh } = useFetch<{
    data: {
      latestPosts: any[];
      popularPosts: any[];
      featuredPosts: any[];
    };
  }>("/api/v1/home", {
    key: "home-data",
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  });

  const homeData = computed(() => {
    const blogData = data.value?.data;
    return {
      latestPosts: blogData?.latestPosts.map(mapPost) || [],
      popularPosts: blogData?.popularPosts.map(mapPost) || [],
      featuredPosts: blogData?.featuredPosts.map(mapPost) || [],
    };
  });

  const loading = computed(() => status.value === "pending");

  return {
    loading,
    homeData,
    refresh,
  };
};
