import { ref } from "vue";
import { useToast, useUserSession, navigateTo } from "#imports";

export const useAuth = () => {
  const toast = useToast();
  const { fetch: refreshSession } = useUserSession();
  const loading = ref(false);
  const login = async (username: string, password: string) => {
    try {
      loading.value = true;
      console.log("Login attempt");
      await $fetch("/api/admin/v1/auth/login", {
        method: "POST",
        body: {
          username,
          password,
        },
      });
      // Refresh session state so middleware sees loggedIn = true
      await refreshSession();
      toast.add({
        title: "Success",
        description: "Login successful",
        color: "success",
      });
      await navigateTo("/admin");
    } catch (error: any) {
      toast.add({
        title: "Error",
        description: error.data.message || "Something went wrong",
        color: "error",
      });
    } finally {
      loading.value = false;
    }
  };

  const logOut = async () => {
    try {
      loading.value = true;
      await $fetch("/api/admin/v1/auth/logout", {
        method: "POST",
      });
      // Refresh session state so middleware sees loggedIn = false
      await refreshSession();
      toast.add({
        title: "Success",
        description: "Logout successful",
        color: "success",
      });
      await navigateTo("/admin/auth/login");
    } catch (error: any) {
      toast.add({
        title: "Error",
        description: error.data.message || "Something went wrong",
        color: "error",
      });
    } finally {
      loading.value = false;
    }
  };
  return {
    login,
    logOut,
    loading,
  };
};
