import type { AdminUser } from "~~/server/utils/adminSession";

interface AdminSessionState {
  user: AdminUser | null;
  loggedIn: boolean;
}

export const useAdminSession = () => {
  const sessionState = useState<AdminSessionState>("admin-session", () => ({
    user: null,
    loggedIn: false,
  }));

  const user = computed(() => sessionState.value.user);
  const loggedIn = computed(() => sessionState.value.loggedIn);

  const fetch = async () => {
    try {
      const data = await $fetch("/api/admin/v1/auth/session");
      sessionState.value = {
        user: data.user,
        loggedIn: data.loggedIn,
      };
    } catch {
      sessionState.value = {
        user: null,
        loggedIn: false,
      };
    }
  };

  const clear = () => {
    sessionState.value = {
      user: null,
      loggedIn: false,
    };
  };

  return {
    user,
    loggedIn,
    fetch,
    clear,
  };
};
