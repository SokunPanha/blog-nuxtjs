import { clearAdminSession } from "~~/server/utils/adminSession";

export default defineEventHandler(async (event) => {
  // Clear admin session
  await clearAdminSession(event);

  // Clear JWT cookies
  deleteCookie(event, "access_token");
  deleteCookie(event, "refresh_token");

  return {
    status: 200,
    message: "Logout successful",
  };
});