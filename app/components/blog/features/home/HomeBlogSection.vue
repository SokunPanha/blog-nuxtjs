<script setup lang="ts">
import type { BlogCardType } from "#shared/types";

interface Props {
  sectionTitle: string;
  viewAllPath: string;
  blogs: BlogCardType[];
}
defineProps<Props>();

const { el, entered, mounted, animClass } = useAnimateOnEnter(0.08)
</script>

<template>
  <section
    ref="el"
    class="py-10 bg-white dark:bg-gray-950 transition-all duration-700 ease-out"
    :class="animClass"
  >
    <div class="max-w-6xl mx-auto px-6">

      <div class="flex justify-between items-center mb-7">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <span class="w-1 h-7 rounded-full bg-primary-500 inline-block shrink-0" />
          {{ sectionTitle }}
        </h2>
        <NuxtLink
          :to="viewAllPath"
          class="text-sm font-semibold text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 flex items-center gap-1.5 transition-colors"
        >
          {{ $t("label.view_all") || "View All" }}
          <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>

      <div class="overflow-x-auto no-scrollbar -mx-6 px-6">
        <div class="flex gap-6 pb-2">
          <div
            v-for="(blog, i) in blogs"
            :key="blog.id"
            class="w-[300px] shrink-0 transition-all duration-600 ease-out"
            :class="mounted ? (entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6') : ''"
            :style="entered ? { transitionDelay: `${100 + i * 90}ms` } : {}"
          >
            <BlogCard :blog="blog" class="h-full" />
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
