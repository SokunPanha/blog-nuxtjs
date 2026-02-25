<script setup lang="ts">
definePageMeta({
  layout: "blog-layout",
});

const { t } = useI18n();

// Fetch categories
const { data, pending, error } = useFetch("/api/v1/categories");

const categories = computed(() => data.value?.data || []);
</script>

<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {{ t("label.categories") || "Categories" }}
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        {{
          t("message.categories_description") || "Browse our content by topic"
        }}
      </p>
    </div>

    <!-- Loading state -->
    <div
      v-if="pending"
      class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <div v-for="i in 8" :key="i" class="animate-pulse">
        <div class="bg-gray-200 dark:bg-gray-700 rounded-xl h-40 mb-4" />
        <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2" />
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
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
    <div v-else-if="categories.length === 0" class="text-center py-12">
      <UIcon
        name="i-lucide-folder"
        class="w-16 h-16 mx-auto text-gray-400 mb-4"
      />
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
        {{ t("message.no_categories") || "No categories found" }}
      </h3>
      <p class="text-gray-500">
        {{ t("message.check_back_later") || "Check back later" }}
      </p>
    </div>

    <!-- Categories grid -->
    <div
      v-else
      class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <CategoryCard
        v-for="category in categories"
        :key="category.id"
        :category="category"
      />
    </div>
  </main>
</template>
