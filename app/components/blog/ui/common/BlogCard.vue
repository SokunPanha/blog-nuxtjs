<script setup lang="ts">
import type { BlogCardType } from "#shared/types";

interface Props {
  blog: BlogCardType;
  options?: {
    horizontal?: boolean;
    showAuthorAvatar?: boolean;
  };
}

const props = defineProps<Props>();
const options = computed(() => ({
  horizontal: false,
  showAuthorAvatar: true,
  ...props.options,
}));

const imageLoaded = ref(false);
</script>
<template>
  <NuxtLink :to="`/blog/${props.blog.slug}`" class="block group h-full">
    <UCard
      class="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-800/50 hover:-translate-y-1"
      :ui="{
        header: 'p-0',
        body: 'p-0',
        footer: 'p-4',
      }"
    >
      <!-- Image Slot -->
      <template #header>
        <div class="relative aspect-video overflow-hidden">
          <NuxtImg
            v-if="props.blog.image"
            :src="props.blog.image"
            :alt="props.blog.title"
            width="400"
            height="225"
            format="webp"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div
            v-else
            class="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400"
          >
            <UIcon name="i-lucide-image" class="w-12 h-12" />
          </div>

          <!-- Date Badge -->
          <div class="absolute top-3 right-3">
            <UBadge
              color="neutral"
              variant="solid"
              size="xs"
              class="font-medium shadow-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
            >
              {{ props.blog.date }}
            </UBadge>
          </div>
        </div>
      </template>

      <!-- Content -->
      <div class="p-4 flex-1 flex flex-col gap-3">
        <!-- Optional Categories if available in type -->
        <!-- <div class="flex gap-2">
            <UBadge color="primary" variant="subtle" size="xs">Tech</UBadge>
         </div> -->

        <h3
          class="text-lg font-bold leading-tight line-clamp-2 text-gray-900 dark:text-gray-100 group-hover:text-primary-500 transition-colors"
        >
          {{ props.blog.title }}
        </h3>

        <p
          v-if="props.blog.excerpt"
          class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2"
        >
          {{ props.blog.excerpt }}
        </p>
      </div>

      <!-- Footer / Author -->
      <template #footer>
        <div
          class="flex items-center gap-3 pt-2 border-t border-gray-100 dark:border-gray-800"
        >
          <UAvatar
            :src="props.blog.author.image"
            :alt="props.blog.author.name"
            size="xs"
            imgClass="object-cover"
          />
          <div class="flex flex-col">
            <span class="text-xs font-medium text-gray-900 dark:text-gray-200">
              {{ props.blog.author.name }}
            </span>
            <span class="text-[10px] text-gray-500">Author</span>
          </div>
        </div>
      </template>
    </UCard>
  </NuxtLink>
</template>
