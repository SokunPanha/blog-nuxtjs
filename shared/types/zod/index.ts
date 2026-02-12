import { z } from "zod";

// User creation schema
export const UserRequestSchema = z.object({
  username: z.string().min(3).max(255),
  password: z.string().min(6).max(255),
  role: z.enum(["ADMIN", "USER", "AUTHOR"]),
  email: z.email(),
  firstName: z.string().min(3).max(255),
  lastName: z.string().min(3).max(255),
});
export type UserRequestType = z.infer<typeof UserRequestSchema>;

// User update schema (all fields optional)
export const UserUpdateSchema = z.object({
  firstName: z.string().min(1).max(255).optional(),
  lastName: z.string().min(1).max(255).optional(),
  avatar: z.string().url().optional().nullable(),
  role: z.enum(["ADMIN", "USER", "AUTHOR"]).optional(),
  email: z.email().optional(),
});
export type UserUpdateType = z.infer<typeof UserUpdateSchema>;

// Post schemas
export const PostStatusEnum = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);
export type PostStatus = z.infer<typeof PostStatusEnum>;

export const PostRequestSchema = z.object({
  title: z.string().min(1).max(255),
  excerpt: z.string().max(500).optional().nullable(),
  slug: z.string().max(255).optional(),
  coverImage: z.string().url(),
  content: z.string().min(1),
  status: PostStatusEnum.default("DRAFT"),
  isFeatured: z.boolean().default(false),
  categoryIds: z.array(z.string()).optional(),
  tagIds: z.array(z.string()).optional(),
  relatedPostIds: z.array(z.string()).optional(),
});
export type PostRequestType = z.infer<typeof PostRequestSchema>;

export const PostUpdateSchema = PostRequestSchema.partial();
export type PostUpdateType = z.infer<typeof PostUpdateSchema>;

// Category schemas
export const CategoryRequestSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().max(100).optional(),
  description: z.string().max(500).optional().nullable(),
  coverImage: z.string().url().optional().nullable(),
  status: PostStatusEnum.default("DRAFT"),
});
export type CategoryRequestType = z.infer<typeof CategoryRequestSchema>;

export const CategoryUpdateSchema = CategoryRequestSchema.partial();
export type CategoryUpdateType = z.infer<typeof CategoryUpdateSchema>;

// Tag schemas
export const TagRequestSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().max(100).optional(),
  description: z.string().max(500).optional().nullable(),
  coverImage: z.string().url().optional().nullable(),
});
export type TagRequestType = z.infer<typeof TagRequestSchema>;

export const TagUpdateSchema = TagRequestSchema.partial();
export type TagUpdateType = z.infer<typeof TagUpdateSchema>;

// Pagination query schema
export const PaginationQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
  status: PostStatusEnum.optional(),
});
export type PaginationQueryType = z.infer<typeof PaginationQuerySchema>;