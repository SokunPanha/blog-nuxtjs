import { getBlogSession } from "~~/server/utils/blogSession";

export default defineEventHandler(async (event) => {
  const session = await getBlogSession(event);

  return {
    user: session.data?.user || null,
    loggedIn: !!session.data?.user,
  };
});
