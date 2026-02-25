import { requireBlogSession } from "~~/server/utils/blogSession";
import { uploadImage } from "~~/server/utils/cloudinary";

export default defineEventHandler(async (event) => {
  await requireBlogSession(event);

  const formData = await readMultipartFormData(event);

  if (!formData || formData.length === 0) {
    throw createError({ statusCode: 400, message: "No file uploaded" });
  }

  const file = formData.find((item) => item.name === "file");

  if (!file || !file.data) {
    throw createError({ statusCode: 400, message: "No file found in request" });
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (!file.type || !allowedTypes.includes(file.type)) {
    throw createError({ statusCode: 400, message: "Invalid file type. Allowed: JPEG, PNG, GIF, WebP" });
  }

  const maxSize = 2 * 1024 * 1024; // 2MB for avatars
  if (file.data.length > maxSize) {
    throw createError({ statusCode: 400, message: "File size exceeds 2MB limit" });
  }

  const result = await uploadImage(file.data, "avatars", file.type);

  return {
    status: 200,
    message: "Avatar uploaded successfully",
    data: result,
  };
});
