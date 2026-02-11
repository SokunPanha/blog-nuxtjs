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
      const {data} = await useFetch<{
        data: {
          latestPosts: any[];
          popularPosts: any[];
          featuredPosts: any[];
        };
      }>("/api/v1/home");
      const blogData = toValue(data)?.data
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
        latestPosts:blogData?.latestPosts.map(mapPost) || [],
        popularPosts: blogData?.popularPosts.map(mapPost) || [],
        featuredPosts: blogData?.featuredPosts.map(mapPost) || [],
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
