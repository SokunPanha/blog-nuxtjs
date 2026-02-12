import { useBlogSession } from "~/composables/blog/useBlogSession";

export const useBlogAuth = () => {
  const { loggedIn, user, clear, fetch } = useBlogSession();
  const route = useRoute();

  const setRedirectCookie = () => {
    // Store current path to redirect back after OAuth
    const redirectCookie = useCookie("auth-redirect", {
      maxAge: 60 * 5, // 5 minutes
      path: "/",
    });
    redirectCookie.value = route.fullPath;
  };

  const loginWithGithub = () => {
    setRedirectCookie();
    // Use location.replace to avoid adding history entry
    if (import.meta.client) {
      window.location.replace("/api/auth/github");
    }
  };

  const loginWithGoogle = () => {
    setRedirectCookie();
    // Use location.replace to avoid adding history entry
    if (import.meta.client) {
      window.location.replace("/api/auth/google");
    }
  };

  const logout = async () => {
    await $fetch("/api/blog/v1/auth/logout", { method: "POST" });
    clear();
  };


  return {
    loggedIn,
    user,
    loginWithGithub,
    loginWithGoogle,
    logout,
    fetch,
  };
};
