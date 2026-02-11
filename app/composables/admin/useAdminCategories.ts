import { ref } from "vue";
import { useToast } from "#imports";
import type { CategoryRequestType, CategoryUpdateType } from "~~/shared/types/zod";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  coverImage: string | null;
  status: string;
  postCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesResponse {
  status: number;
  message: string;
  data: Category[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export const useAdminCategories = () => {
  const toast = useToast();
  const loading = ref(false);
  const categories = ref<Category[]>([]);
  const currentCategory = ref<Category | null>(null);
  const meta = ref<CategoriesResponse["meta"] | null>(null);

  const fetchCategories = async (params?: {
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

      const response = await $fetch<CategoriesResponse>(
        `/api/admin/v1/categories?${query.toString()}`
      );
      categories.value = response.data;
      meta.value = response.meta;
      return response;
    } catch (error: any) {
      toast.add({
        title: "Error",
        description: error.data?.message || "Failed to fetch categories",
        color: "error",
      });
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const fetchCategory = async (id: string) => {
    try {
      loading.value = true;
      const response = await $fetch<{ status: number; message: string; data: Category }>(
        `/api/admin/v1/categories/${id}`
      );
      currentCategory.value = response.data;
      return response.data;
    } catch (error: any) {
      toast.add({
        title: "Error",
        description: error.data?.message || "Failed to fetch category",
        color: "error",
      });
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const createCategory = async (data: CategoryRequestType) => {
    try {
      loading.value = true;
      const response = await $fetch<{ status: number; message: string; data: Category }>(
        "/api/admin/v1/categories",
        {
          method: "POST",
          body: data,
        }
      );
      toast.add({
        title: "Success",
        description: "Category created successfully",
        color: "success",
      });
      return response.data;
    } catch (error: any) {
      toast.add({
        title: "Error",
        description: error.data?.message || "Failed to create category",
        color: "error",
      });
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const updateCategory = async (id: string, data: CategoryUpdateType) => {
    try {
      loading.value = true;
      const response = await $fetch<{ status: number; message: string; data: Category }>(
        `/api/admin/v1/categories/${id}`,
        {
          method: "PUT",
          body: data,
        }
      );
      toast.add({
        title: "Success",
        description: "Category updated successfully",
        color: "success",
      });
      return response.data;
    } catch (error: any) {
      toast.add({
        title: "Error",
        description: error.data?.message || "Failed to update category",
        color: "error",
      });
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      loading.value = true;
      await $fetch(`/api/admin/v1/categories/${id}`, {
        method: "DELETE",
      });
      toast.add({
        title: "Success",
        description: "Category deleted successfully",
        color: "success",
      });
      // Remove from local state
      categories.value = categories.value.filter((c) => c.id !== id);
    } catch (error: any) {
      toast.add({
        title: "Error",
        description: error.data?.message || "Failed to delete category",
        color: "error",
      });
      throw error;
    } finally {
      loading.value = false;
    }
  };

  // Fetch all categories for select dropdowns (no pagination)
  const fetchAllCategories = async () => {
    try {
      loading.value = true;
      const response = await $fetch<CategoriesResponse>(
        "/api/admin/v1/categories?limit=100"
      );
      return response.data;
    } catch (error: any) {
      toast.add({
        title: "Error",
        description: error.data?.message || "Failed to fetch categories",
        color: "error",
      });
      throw error;
    } finally {
      loading.value = false;
    }
  };

  return {
    categories,
    currentCategory,
    meta,
    loading,
    fetchCategories,
    fetchCategory,
    fetchAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
