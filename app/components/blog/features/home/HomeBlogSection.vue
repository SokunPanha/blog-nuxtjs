<script setup lang="ts">
import type { BlogCardType } from "#shared/types";

interface Props {
  sectionTitle: string;
  viewAllPath: string;
  blogs: BlogCardType[];
}

const props = defineProps<Props>();
</script>

<template>
  <section class="">
    <main class="md:p-10 p-4 max-w-7xl mx-auto">
      <div>
        <div class="flex justify-between items-center mb-6">
          <h2
            class="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
          >
            {{ sectionTitle }}
          </h2>
          <NuxtLink
            :to="viewAllPath"
            class="text-sm font-medium text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 flex items-center gap-1 transition-colors"
          >
            {{ $t("label.view_all") || "View All" }}
            <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
          </NuxtLink>
        </div>

        <div class="w-full overflow-x-auto no-scrollbar pb-4">
          <div class="flex flex-nowrap gap-6">
            <BlogCard
              v-for="blog in blogs"
              :key="blog.id"
              :blog="blog"
              class="w-[300px] shrink-0"
            />
          </div>
        </div>
      </div>
    </main>
  </section>
</template>
