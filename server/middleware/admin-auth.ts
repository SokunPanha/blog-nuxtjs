import { getAdminSession } from "~~/server/utils/adminSession";

export default defineEventHandler(async (event) => {
  const path = getRequestURL(event).pathname;

  // Only protect /api/admin/* routes (except auth endpoints)
  if (
    path.startsWith("/api/admin/") &&
    !path.startsWith("/api/admin/v1/auth/")
  ) {
    const session = await getAdminSession(event);

    if (!session.data?.user) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized",
      });
    }

    // Attach user to event context for easy access in handlers
    event.context.adminUser = session.data.user;
  }
});
