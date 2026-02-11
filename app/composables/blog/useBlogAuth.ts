export const useBlogAuth = () => {
  const { loggedIn, user, clear, fetch: refreshSession } = useUserSession();

  const loginWithGithub = () => {
    navigateTo("/api/auth/github", { external: true });
  };

  const loginWithGoogle = () => {
    navigateTo("/api/auth/google", { external: true });
  };

  const logout = async () => {
    await $fetch("/api/auth/logout", { method: "POST" });
    await clear();
    await refreshSession();
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