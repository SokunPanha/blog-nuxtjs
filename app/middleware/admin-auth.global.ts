export default defineNuxtRouteMiddleware(async (to, from) => {
  const { loggedIn } = useUserSession();
  if (!loggedIn.value && to.path.startsWith("/admin")) {
    if (to.path != "/admin/auth/login") {
      return navigateTo("/admin/auth/login");
    } else {
      return;
    }
  }

  if (loggedIn.value && to.path === "/admin/auth/login") {
    return navigateTo("/admin");
  }
});
