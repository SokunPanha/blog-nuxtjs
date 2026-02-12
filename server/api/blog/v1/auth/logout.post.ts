import { clearBlogSession } from "~~/server/utils/blogSession";

export default defineEventHandler(async (event) => {
  await clearBlogSession(event);

  return {
    status: 200,
    message: "Logout successful",
  };
});
