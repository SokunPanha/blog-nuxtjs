import type { H3Event } from "h3";
import { useSession } from "h3";

export interface BlogUser {
  id: string;
  username: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface BlogSessionData {
  user: BlogUser;
}

const sessionConfig = {
  name: "blog-session",
  password: process.env.NUXT_SESSION_PASSWORD!,
  maxAge: 60 * 60 * 24 * 7, // 7 days
};

export async function getBlogSession(event: H3Event) {
  return useSession<BlogSessionData>(event, sessionConfig);
}

export async function setBlogSession(event: H3Event, data: BlogSessionData) {
  const session = await getBlogSession(event);
  await session.update(data);
}

export async function clearBlogSession(event: H3Event) {
  const session = await getBlogSession(event);
  await session.clear();
}

export async function requireBlogSession(event: H3Event): Promise<BlogUser> {
  const session = await getBlogSession(event);
  if (!session.data?.user) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }
  return session.data.user;
}
