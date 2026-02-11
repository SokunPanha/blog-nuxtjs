<script setup lang="ts">
import { useAdminPosts } from "~/composables/admin/useAdminPosts";

definePageMeta({
  layout: "admin-layout",
});

const { t } = useI18n();
const router = useRouter();
const { createPost, loading } = useAdminPosts();

const handleSubmit = async (data: any) => {
  try {
    await createPost(data);
    router.push("/admin/blog-management/blogs");
  } catch (error) {
    // Error is handled in composable
  }
};

const handleCancel = () => {
  router.push("/admin/blog-management/blogs");
};

// Breadcrumbs
const breadcrumbs = [
  { label: t("label.dashboard") || "Dashboard", to: "/admin" },
  { label: t("label.blogs") || "Blogs", to: "/admin/blog-management/blogs" },
  { label: t("label.create") || "Create" },
];
</script>

<template>
  <div>
    <AdminPageHeader
      :title="t('label.create_post') || 'Create Post'"
      :breadcrumbs="breadcrumbs"
    />

    <PostForm
      :loading="loading"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </div>
</template>
