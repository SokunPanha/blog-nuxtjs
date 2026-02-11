export interface UploadResult {
  url: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
}

export const useImageUpload = () => {
  const toast = useToast();
  const loading = ref(false);
  const progress = ref(0);

  const uploadImage = async (
    file: File,
    folder: string = "blog"
  ): Promise<UploadResult | null> => {
    try {
      loading.value = true;
      progress.value = 0;

      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        toast.add({
          title: "Error",
          description: "Invalid file type. Allowed: JPEG, PNG, GIF, WebP",
          color: "error",
        });
        return null;
      }

      // Validate file size (5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.add({
          title: "Error",
          description: "File size exceeds 5MB limit",
          color: "error",
        });
        return null;
      }

      const formData = new FormData();
      formData.append("file", file);

      // Simulate progress (actual progress tracking would need XMLHttpRequest)
      const progressInterval = setInterval(() => {
        if (progress.value < 90) {
          progress.value += 10;
        }
      }, 100);

      const response = await $fetch<{
        status: number;
        message: string;
        data: UploadResult;
      }>(`/api/admin/v1/upload/image?folder=${folder}`, {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      progress.value = 100;

      toast.add({
        title: "Success",
        description: "Image uploaded successfully",
        color: "success",
      });

      return response.data;
    } catch (error: any) {
      toast.add({
        title: "Error",
        description: error.data?.message || "Failed to upload image",
        color: "error",
      });
      return null;
    } finally {
      loading.value = false;
      // Reset progress after a short delay
      setTimeout(() => {
        progress.value = 0;
      }, 500);
    }
  };

  return {
    loading,
    progress,
    uploadImage,
  };
};
