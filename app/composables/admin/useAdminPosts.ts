import { ref } from "vue";
import { useToast } from "#imports";
import type { PostRequestType, PostUpdateType } from "~~/shared/types/zod";

export interface Post {
  id: string;
  title: string;
  excerpt: string | null;
  slug: string;
  coverImage: string;
  content: string;
  status: string;
  isFeatured: boolean;
  viewCount: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
    avatar: string | null;
  };
  categories: Array<{ id: string; name: string; slug: string }>;
  tags: Array<{ id: string; name: string; slug: string }>;
}

export interface PostsResponse {
  status: number;
  message: string;
  data: Post[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export const useAdminPosts = () => {
  const toast = useToast();
  const loading = ref(false);
  const posts = ref<Post[]>([]);
  const currentPost = ref<Post | null>(null);
  const meta = ref<PostsResponse["meta"] | null>(null);

  const fetchPosts = async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }) => {
    try {
      loading.value = true;
      const query = new URLSearchParams();
      if (params?.page) query.append("page", params.page.toString());
      if (params?.limit) query.append("limit", params.limit.toString());
      if (params?.search) query.append("search", params.search);
      if (params?.status) query.append("status", params.status);

      const response = await $fetch<PostsResponse>(
        `/api/admin/v1/posts?${query.toString()}`
      );
      posts.value = response.data;
      meta.value = response.meta;
      return response;
    } catch (error: any) {
      toast.add({
        title: "Error",
        description: error.data?.message || "Failed to fetch posts",
        color: "error",
      });
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const fetchPost = async (id: string) => {
    try {
      loading.value = true;
      const response = await $fetch<{ status: number; message: string; data: Post }>(
        `/api/admin/v1/posts/${id}`
      );
      currentPost.value = response.data;
      return response.data;
    } catch (error: any) {
      toast.add({
        title: "Error",
        description: error.data?.message || "Failed to fetch post",
        color: "error",
      });
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const createPost = async (data: PostRequestType) => {
    try {
      loading.value = true;
      const response = await $fetch<{ status: number; message: string; data: Post }>(
        "/api/admin/v1/posts",
        {
          method: "POST",
          body: data,
        }
      );
      toast.add({
        title: "Success",
        description: "Post created successfully",
        color: "success",
      });
      return response.data;
    } catch (error: any) {
      toast.add({
        title: "Error",
        description: error.data?.message || "Failed to create post",
        color: "error",
      });
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const updatePost = async (id: string, data: PostUpdateType) => {
    try {
      loading.value = true;
      const response = await $fetch<{ status: number; message: string; data: Post }>(
        `/api/admin/v1/posts/${id}`,
        {
          method: "PUT",
          body: data,
        }
      );
      toast.add({
        title: "Success",
        description: "Post updated successfully",
        color: "success",
      });
      return response.data;
    } catch (error: any) {
      toast.add({
        title: "Error",
        description: error.data?.message || "Failed to update post",
        color: "error",
      });
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const deletePost = async (id: string) => {
    try {
      loading.value = true;
      await $fetch(`/api/admin/v1/posts/${id}`, {
        method: "DELETE",
      });
      toast.add({
        title: "Success",
        description: "Post deleted successfully",
        color: "success",
      });
      // Remove from local state
      posts.value = posts.value.filter((p) => p.id !== id);
    } catch (error: any) {
      toast.add({
        title: "Error",
        description: error.data?.message || "Failed to delete post",
        color: "error",
      });
      throw error;
    } finally {
      loading.value = false;
    }
  };

  return {
    posts,
    currentPost,
    meta,
    loading,
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost,
  };
};
