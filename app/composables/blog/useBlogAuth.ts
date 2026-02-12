import { useBlogSession } from "~/composables/blog/useBlogSession";

export const useBlogAuth = () => {
  const { loggedIn, user, clear, fetch: refreshSession } = useBlogSession();
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
    navigateTo("/api/auth/github", { external: true });
  };

  const loginWithGoogle = () => {
    setRedirectCookie();
    navigateTo("/api/auth/google", { external: true });
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
    refreshSession,
  };
};
