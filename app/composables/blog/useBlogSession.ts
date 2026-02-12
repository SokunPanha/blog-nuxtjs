import type { BlogUser } from "~~/server/utils/blogSession";

interface BlogSessionState {
  user: BlogUser | null;
  loggedIn: boolean;
}

export const useBlogSession = () => {
  const sessionState = useState<BlogSessionState>("blog-session", () => ({
    user: null,
    loggedIn: false,
  }));

  const user = computed(() => sessionState.value.user);
  const loggedIn = computed(() => sessionState.value.loggedIn);

  const fetch = async () => {
    try {
      const data = await $fetch("/api/blog/v1/auth/session");
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

  // Auto-fetch session on first use (client-side only after hydration)
  if (import.meta.client && !sessionState.value.user) {
    fetch();
  }

  return {
    user,
    loggedIn,
    fetch,
    clear,
  };
};
