import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with environment variables
const config = useRuntimeConfig();

cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
});

export interface UploadResult {
  url: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
}

/**
 * Upload an image to Cloudinary
 */
export async function uploadImage(
  file: Buffer | string,
  folder: string = "blog",
  mimeType: string = "image/png",
): Promise<UploadResult> {
  const result = await cloudinary.uploader.upload(
    typeof file === "string"
      ? file
      : `data:${mimeType};base64,${file.toString("base64")}`,
    {
      folder,
      resource_type: "image",
      transformation: [{ quality: "auto:good" }, { fetch_format: "auto" }],
    },
  );

  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
    format: result.format,
  };
}

/**
 * Delete an image from Cloudinary
 */
export async function deleteImage(publicId: string): Promise<boolean> {
  const result = await cloudinary.uploader.destroy(publicId);
  return result.result === "ok";
}

/**
 * Get optimized image URL with transformations
 */
export function getOptimizedUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    crop?: string;
  } = {},
): string {
  return cloudinary.url(publicId, {
    secure: true,
    transformation: [
      {
        width: options.width,
        height: options.height,
        crop: options.crop || "fill",
        quality: "auto",
        fetch_format: "auto",
      },
    ],
  });
}

export { cloudinary };
