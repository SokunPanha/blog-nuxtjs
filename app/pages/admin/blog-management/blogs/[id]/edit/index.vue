<script setup lang="ts">
definePageMeta({
  layout: "admin-layout",
});

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { currentPost, fetchPost, updatePost, loading } = useAdminPosts();

const postId = route.params.id as string;
const fetchLoading = ref(true);

// Fetch post on mount
onMounted(async () => {
  try {
    await fetchPost(postId);
  } finally {
    fetchLoading.value = false;
  }
});

const handleSubmit = async (data: any) => {
  try {
    await updatePost(postId, data);
    router.push("/admin/blog-management/blogs");
  } catch (error) {
    // Error is handled in composable
  }
};

const handleCancel = () => {
  router.push("/admin/blog-management/blogs");
};

// Breadcrumbs
const breadcrumbs = computed(() => [
  { label: t("label.dashboard") || "Dashboard", to: "/admin" },
  { label: t("label.blogs") || "Blogs", to: "/admin/blog-management/blogs" },
  { label: currentPost.value?.title || t("label.edit") || "Edit" },
]);
</script>

<template>
  <div>
    <AdminPageHeader
      :title="t('label.edit_post') || 'Edit Post'"
      :breadcrumbs="breadcrumbs"
    />

    <div v-if="fetchLoading" class="flex justify-center py-12">
      <UIcon name="i-lucide-loader-2" class="w-8 h-8 animate-spin text-primary-500" />
    </div>

    <PostForm
      v-else-if="currentPost"
      :post="currentPost"
      :loading="loading"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />

    <UAlert
      v-else
      color="error"
      icon="i-lucide-alert-circle"
      :title="t('message.post_not_found') || 'Post not found'"
    />
  </div>
</template>
