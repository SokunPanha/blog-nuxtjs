import { ref } from "vue";
import type { TagRequestType, TagUpdateType } from "~~/shared/types/zod";

export interface Tag {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  coverImage: string | null;
  postCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface TagsResponse {
  status: number;
  message: string;
  data: Tag[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export const useAdminTags = () => {
  const toast = useToast();
  const loading = ref(false);
  const tags = ref<Tag[]>([]);
  const currentTag = ref<Tag | null>(null);
  const meta = ref<TagsResponse["meta"] | null>(null);

  const fetchTags = async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }) => {
    try {
      loading.value = true;
      const query = new URLSearchParams();
      if (params?.page) query.append("page", params.page.toString());
      if (params?.limit) query.append("limit", params.limit.toString());
      if (params?.search) query.append("search", params.search);

      const response = await $fetch<TagsResponse>(
        `/api/admin/v1/tags?${query.toString()}`
      );
      tags.value = response.data;
      meta.value = response.meta;
      return response;
    } catch (error: any) {
      toast.add({
        title: "Error",
        description: error.data?.message || "Failed to fetch tags",
        color: "error",
      });
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const fetchTag = async (id: string) => {
    try {
      loading.value = true;
      const response = await $fetch<{ status: number; message: string; data: Tag }>(
        `/api/admin/v1/tags/${id}`
      );
      currentTag.value = response.data;
      return response.data;
    } catch (error: any) {
      toast.add({
        title: "Error",
        description: error.data?.message || "Failed to fetch tag",
        color: "error",
      });
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const createTag = async (data: TagRequestType) => {
    try {
      loading.value = true;
      const response = await $fetch<{ status: number; message: string; data: Tag }>(
        "/api/admin/v1/tags",
        {
          method: "POST",
          body: data,
        }
      );
      toast.add({
        title: "Success",
        description: "Tag created successfully",
        color: "success",
      });
      return response.data;
    } catch (error: any) {
      toast.add({
        title: "Error",
        description: error.data?.message || "Failed to create tag",
        color: "error",
      });
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const updateTag = async (id: string, data: TagUpdateType) => {
    try {
      loading.value = true;
      const response = await $fetch<{ status: number; message: string; data: Tag }>(
        `/api/admin/v1/tags/${id}`,
        {
          method: "PUT",
          body: data,
        }
      );
      toast.add({
        title: "Success",
        description: "Tag updated successfully",
        color: "success",
      });
      return response.data;
    } catch (error: any) {
      toast.add({
        title: "Error",
        description: error.data?.message || "Failed to update tag",
        color: "error",
      });
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const deleteTag = async (id: string) => {
    try {
      loading.value = true;
      await $fetch(`/api/admin/v1/tags/${id}`, {
        method: "DELETE",
      });
      toast.add({
        title: "Success",
        description: "Tag deleted successfully",
        color: "success",
      });
      // Remove from local state
      tags.value = tags.value.filter((t) => t.id !== id);
    } catch (error: any) {
      toast.add({
        title: "Error",
        description: error.data?.message || "Failed to delete tag",
        color: "error",
      });
      throw error;
    } finally {
      loading.value = false;
    }
  };

  // Fetch all tags for select dropdowns (no pagination)
  const fetchAllTags = async () => {
    try {
      loading.value = true;
      const response = await $fetch<TagsResponse>("/api/admin/v1/tags?limit=100");
      return response.data;
    } catch (error: any) {
      toast.add({
        title: "Error",
        description: error.data?.message || "Failed to fetch tags",
        color: "error",
      });
      throw error;
    } finally {
      loading.value = false;
    }
  };

  return {
    tags,
    currentTag,
    meta,
    loading,
    fetchTags,
    fetchTag,
    fetchAllTags,
    createTag,
    updateTag,
    deleteTag,
  };
};
