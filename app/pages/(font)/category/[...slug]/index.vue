<script setup lang="ts">
definePageMeta({
  layout: "blog-layout",
});

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const slug = computed(() => {
  const params = route.params.slug;
  return Array.isArray(params) ? params.join("/") : params;
});

// Pagination
const page = ref(Number(route.query.page) || 1);
const limit = ref(12);

// Fetch category with posts
const { data: categoryData, pending, error } =  useFetch(`/api/v1/categories/${slug.value}`, {
  query: computed(() => ({
    page: page.value,
    limit: limit.value,
  })),
  watch: [page],
});

const category = computed(() => toValue(categoryData)?.data?.category || null);
const posts = computed(() => toValue(categoryData)?.data?.data || []);
const meta = computed(() => toValue(categoryData)?.data?.meta || null);

// Update URL when page changes
watch(page, (newPage) => {
  navigateTo({
    path: `/category/${slug.value}`,
    query: newPage > 1 ? { page: newPage } : {},
  });
});

// SEO
useHead({
  title: computed(() => category.value?.name || "Category"),
});
</script>

<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Loading state -->
    <div v-if="pending" class="animate-pulse">
      <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4" />
      <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-12" />
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="i in 6" :key="i">
          <div class="bg-gray-200 dark:bg-gray-700 rounded-lg h-48 mb-4" />
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        </div>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="text-center py-12">
      <UAlert
        color="error"
        icon="i-lucide-alert-circle"
        :title="t('message.category_not_found') || 'Category not found'"
        :description="t('message.category_not_found_description') || 'The category you are looking for does not exist.'"
        class="mb-6"
      />
      <UButton @click="router.push('/category')">
        {{ t("label.back_to_categories") || "Back to Categories" }}
      </UButton>
    </div>

    <!-- Category content -->
    <template v-else-if="category">
      <!-- Header -->
      <div class="mb-12">
        <UButton
          variant="ghost"
          color="neutral"
          icon="i-lucide-arrow-left"
          class="mb-4"
          @click="router.push('/category')"
        >
          {{ t("label.all_categories") || "All Categories" }}
        </UButton>

        <!-- Category cover -->
        <div
          v-if="category.coverImage"
          class="relative h-48 rounded-xl overflow-hidden mb-6"
        >
          <NuxtImg
            :src="category.coverImage"
            :alt="category.name"
            class="w-full h-full object-cover"
            format="webp"
          />
          <div class="absolute inset-0 bg-black/40" />
          <div class="absolute inset-0 flex items-center justify-center">
            <h1 class="text-4xl font-bold text-white">
              {{ category.name }}
            </h1>
          </div>
        </div>

        <h1 v-else class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ category.name }}
        </h1>

        <p v-if="category.description" class="text-lg text-gray-600 dark:text-gray-400">
          {{ category.description }}
        </p>

        <p v-if="meta" class="text-sm text-gray-500 mt-2">
          {{ meta.total }} {{ meta.total === 1 ? "post" : "posts" }}
        </p>
      </div>

      <!-- Empty state -->
      <div
        v-if="posts.length === 0"
        class="text-center py-12"
      >
        <UIcon name="i-lucide-file-text" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {{ t("message.no_posts_in_category") || "No posts in this category" }}
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
    </template>
  </main>
</template>
