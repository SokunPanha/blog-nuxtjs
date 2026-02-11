import { uploadImage } from "~~/server/utils/cloudinary";

export default defineEventHandler(async (event) => {
  // Check authentication
  const session = await getUserSession(event);
  if (!session?.user) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  try {
    const formData = await readMultipartFormData(event);

    if (!formData || formData.length === 0) {
      throw createError({
        statusCode: 400,
        message: "No file uploaded",
      });
    }

    const file = formData.find((item) => item.name === "file");

    if (!file || !file.data) {
      throw createError({
        statusCode: 400,
        message: "No file found in request",
      });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!file.type || !allowedTypes.includes(file.type)) {
      throw createError({
        statusCode: 400,
        message: "Invalid file type. Allowed: JPEG, PNG, GIF, WebP",
      });
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.data.length > maxSize) {
      throw createError({
        statusCode: 400,
        message: "File size exceeds 5MB limit",
      });
    }

    // Get folder from query or default to "blog"
    const query = getQuery(event);
    const folder = (query.folder as string) || "blog";

    // Upload to Cloudinary
    const result = await uploadImage(file.data, folder, file.type);

    return {
      status: 200,
      message: "Image uploaded successfully",
      data: result,
    };
  } catch (error: any) {
    if (error.statusCode) {
      throw error;
    }

    console.error("Upload error:", error);
    throw createError({
      statusCode: 500,
      message: error.message || "Failed to upload image",
    });
  }
});
