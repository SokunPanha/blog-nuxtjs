<script setup lang="ts">
interface Props {
  category: {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    coverImage?: string | null;
    postCount: number;
  };
}

defineProps<Props>();
</script>

<template>
  <NuxtLink
    :to="`/category/${category.slug}`"
    class="group block overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300"
  >
    <!-- Cover image -->
    <div class="relative h-40 overflow-hidden">
      <NuxtImg
        v-if="category.coverImage"
        :src="category.coverImage"
        :alt="category.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        format="webp"
      />
      <div
        v-else
        class="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center"
      >
        <UIcon name="i-lucide-folder" class="w-12 h-12 text-white opacity-50" />
      </div>

      <!-- Post count badge -->
      <div class="absolute top-3 right-3">
        <UBadge color="neutral" variant="solid" class="bg-black/50 text-white">
          {{ category.postCount }} {{ category.postCount === 1 ? "post" : "posts" }}
        </UBadge>
      </div>
    </div>

    <!-- Content -->
    <div class="p-4">
      <h3 class="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
        {{ category.name }}
      </h3>
      <p
        v-if="category.description"
        class="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2"
      >
        {{ category.description }}
      </p>
    </div>
  </NuxtLink>
</template>
