<script setup lang="ts">
definePageMeta({
  layout: "blog-layout",
});

const { t } = useI18n();
const route = useRoute();

// Pagination state
const page = ref(Number(route.query.page) || 1);
const limit = ref(12);

// Fetch posts
const { data, pending, error } = useFetch("/api/v1/posts", {
  query: computed(() => ({
    page: page.value,
    limit: limit.value,
  })),
  watch: [page],
});

const posts = computed(() => data.value?.data || []);
const meta = computed(() => data.value?.meta || null);

// Update URL when page changes
watch(page, (newPage) => {
  navigateTo({
    path: "/blog",
    query: newPage > 1 ? { page: newPage } : {},
  });
});
</script>

<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {{ t("label.blog") || "Blog" }}
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        {{ t("message.blog_description") || "Discover insights, tutorials, and stories from our team" }}
      </p>
    </div>

    <!-- Loading state -->
    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="i in 6" :key="i" class="animate-pulse">
        <div class="bg-gray-200 dark:bg-gray-700 rounded-lg h-48 mb-4" />
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
      </div>
    </div>

    <!-- Error state -->
    <UAlert
      v-else-if="error"
      color="error"
      icon="i-lucide-alert-circle"
      :title="t('message.error') || 'Error'"
      :description="error.message"
    />

    <!-- Empty state -->
    <div
      v-else-if="posts.length === 0"
      class="text-center py-12"
    >
      <UIcon name="i-lucide-file-text" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
        {{ t("message.no_posts") || "No posts found" }}
      </h3>
      <p class="text-gray-500">
        {{ t("message.check_back_later") || "Check back later for new content" }}
      </p>
    </div>

    <!-- Posts grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <BlogCard
        v-for="post in posts"
        :key="post.id"
        :blog="{
          id: post.id,
          title: post.title,
          slug: post.slug,
          image: post.coverImage,
          author: {
            name: `${post.author?.firstName || ''} ${post.author?.lastName || post.author?.username || ''}`.trim(),
            image: post.author?.avatar || '',
          },
          date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '',
        }"
        :options="{ showAuthorAvatar: true }"
      />
    </div>

    <!-- Pagination -->
    <div v-if="meta && meta.totalPages > 1" class="mt-12 flex justify-center">
      <UPagination
        v-model="page"
        :total="meta.total"
        :items-per-page="limit"
      />
    </div>
  </main>
</template>
