<script setup lang="ts">
import type { CategoryType } from "~~/shared/types";

const props = defineProps({
  categories: {
    type: Array<CategoryType>,
    default: () => [],
  },
});
</script>
<template>
  <section class="bg-gray-100 dark:bg-gray-800 py-4">
    <div class="flex flex-col gap-4 max-w-4xl mx-auto px-4">
      <div class="flex justify-between items-center">
        <p class="font-semibold">{{ $t("label.browse_category") }}</p>
        <NuxtLink to="/category">{{ $t("label.view_all") }}</NuxtLink>
      </div>
      <div class="flex flex-nowrap overflow-x-auto no-scrollbar min-h-[100px] gap-4 py-3">
        <NuxtLink
          v-for="category in categories"
          :key="category.id"
          :to="`/category/${category.slug}`"
          class="p-2 shadow-md w-[150px] max-w-[150px] shrink-0 block"
        >
          <div class="flex flex-col items-center h-2/3 overflow-hidden mb-1 gap-2">
            <NuxtImg format="webp" width="100" height="100" :src="category.coverImage || ''" alt="" />
          </div>
            <p class="text-center">{{ category.name }}</p>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
