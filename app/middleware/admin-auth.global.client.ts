import { useAdminSession } from "~/composables/admin/useAdminSession";

export default defineNuxtRouteMiddleware(async (to) => {
  // Only check admin routes
  if (!to.path.startsWith("/admin")) {
    return;
  }

  // Allow access to login page
  if (to.path === "/admin/auth/login") {
    const { loggedIn, fetch } = useAdminSession();
    await fetch();
    // Redirect to admin if already logged in
    if (loggedIn.value) {
      return navigateTo("/admin");
    }
    return;
  }
  // Check admin session for protected routes
  const { loggedIn, fetch } = useAdminSession();
  await fetch();

  if (!loggedIn.value) {
    return navigateTo("/admin/auth/login");
  }

});
