import { ref } from "vue";
import { useToast } from "#imports";
import type { UserUpdateType } from "~~/shared/types/zod";

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  role: string;
  postCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface UsersResponse {
  status: number;
  message: string;
  data: User[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export const useAdminUsers = () => {
  const toast = useToast();
  const loading = ref(false);
  const users = ref<User[]>([]);
  const currentUser = ref<User | null>(null);
  const meta = ref<UsersResponse["meta"] | null>(null);

  const fetchUsers = async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
  }) => {
    try {
      loading.value = true;
      const query = new URLSearchParams();
      if (params?.page) query.append("page", params.page.toString());
      if (params?.limit) query.append("limit", params.limit.toString());
      if (params?.search) query.append("search", params.search);
      if (params?.role) query.append("role", params.role);

      const response = await $fetch<UsersResponse>(
        `/api/admin/v1/users?${query.toString()}`
      );
      users.value = response.data;
      meta.value = response.meta;
      return response;
    } catch (error: any) {
      toast.add({
        title: "Error",
        description: error.data?.message || "Failed to fetch users",
        color: "error",
      });
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const fetchUser = async (id: string) => {
    try {
      loading.value = true;
      const response = await $fetch<{ status: number; message: string; data: User }>(
        `/api/admin/v1/users/${id}`
      );
      currentUser.value = response.data;
      return response.data;
    } catch (error: any) {
      toast.add({
        title: "Error",
        description: error.data?.message || "Failed to fetch user",
        color: "error",
      });
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const updateUser = async (id: string, data: UserUpdateType) => {
    try {
      loading.value = true;
      const response = await $fetch<{ status: number; message: string; data: User }>(
        `/api/admin/v1/users/${id}`,
        {
          method: "PUT",
          body: data,
        }
      );
      toast.add({
        title: "Success",
        description: "User updated successfully",
        color: "success",
      });
      return response.data;
    } catch (error: any) {
      toast.add({
        title: "Error",
        description: error.data?.message || "Failed to update user",
        color: "error",
      });
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const deleteUser = async (id: string) => {
    try {
      loading.value = true;
      await $fetch(`/api/admin/v1/users/${id}`, {
        method: "DELETE",
      });
      toast.add({
        title: "Success",
        description: "User deleted successfully",
        color: "success",
      });
      // Remove from local state
      users.value = users.value.filter((u) => u.id !== id);
    } catch (error: any) {
      toast.add({
        title: "Error",
        description: error.data?.message || "Failed to delete user",
        color: "error",
      });
      throw error;
    } finally {
      loading.value = false;
    }
  };

  return {
    users,
    currentUser,
    meta,
    loading,
    fetchUsers,
    fetchUser,
    updateUser,
    deleteUser,
  };
};
