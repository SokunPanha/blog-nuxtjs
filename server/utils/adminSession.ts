import type { H3Event } from "h3";
import { useSession } from "h3";

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface AdminSessionData {
  user: AdminUser;
}

const sessionConfig = {
  name: "admin-session",
  password: process.env.NUXT_SESSION_PASSWORD!,
  maxAge: 60 * 60 * 24, // 1 day
};

export async function getAdminSession(event: H3Event) {
  return useSession<AdminSessionData>(event, sessionConfig);
}

export async function setAdminSession(event: H3Event, data: AdminSessionData) {
  const session = await getAdminSession(event);
  await session.update(data);
}

export async function clearAdminSession(event: H3Event) {
  const session = await getAdminSession(event);
  await session.clear();
}

export async function requireAdminSession(event: H3Event): Promise<AdminUser> {
  const session = await getAdminSession(event);
  if (!session.data?.user) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }
  return session.data.user;
}
