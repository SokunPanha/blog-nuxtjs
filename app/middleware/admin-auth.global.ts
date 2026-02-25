import { useAdminSession } from "~/composables/admin/useAdminSession";

export default defineNuxtRouteMiddleware(async (to) => {
  // Only check admin routes
  if (!to.path.startsWith("/admin")) {
    return;
  }

  const { loggedIn, fetch, pending } = useAdminSession();

  // On server or first client load, always fetch
  // On subsequent client navigations, skip fetch if session already loaded
  if (import.meta.server || pending.value) {
    await fetch();
  }

  // Allow access to login page
  if (to.path === "/admin/auth/login") {
    if (loggedIn.value) {
      return navigateTo("/admin");
    }
    return;
  }

  // Check admin session for protected routes
  if (!loggedIn.value) {
    return navigateTo("/admin/auth/login");
  }
});
