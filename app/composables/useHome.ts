import { ref } from "vue";
import type { BlogCardType } from "~~/shared/types";

export const useHome = () => {
  const loading = ref(false);
  const homeData = ref<{
    latestPosts: BlogCardType[];
    popularPosts: BlogCardType[];
    featuredPosts: BlogCardType[];
  }>({
    latestPosts: [],
    popularPosts: [],
    featuredPosts: [],
  });

  const fetchHomeData = async () => {
    try {
      loading.value = true;
      const { data } = await $fetch<{
        data: {
          latestPosts: any[];
          popularPosts: any[];
          featuredPosts: any[];
        };
      }>("/api/v1/home");

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

      homeData.value = {
        latestPosts: data.latestPosts.map(mapPost),
        popularPosts: data.popularPosts.map(mapPost),
        featuredPosts: data.featuredPosts.map(mapPost),
      };
    } catch (error) {
      console.error("Failed to fetch home data", error);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    homeData,
    fetchHomeData,
  };
};
