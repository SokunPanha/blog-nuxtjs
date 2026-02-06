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
  <NuxtLink :to="`/blog/${props.blog.id}`">
    <div
      :class="
        options.horizontal
          ? 'flex items-center gap-2'
          : ' hover:shadow-lg group cursor-pointer transition-all duration-300  rounded-lg h-[250px] max-w-[250px]  overflow-hidden shrink-0'
      "
    >
      <div
        :class="
          options.horizontal
            ? 'max-w-[200px] w-[200px] h-[100px] '
            : 'relative w-full aspect-video '
        "
        class="rounded-lg overflow-hidden"
      >
        <NuxtImg
          width="400"
          height="250"
          format="web"
          preload
          blur
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          class="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
          :src="props.blog.image"
        />
      </div>
      <div :class="options.horizontal ? 'w-[200px] h-[100px] ' : 'p-2'">
        <p class="font-semibold line-clamp-2">{{ props.blog.title }}</p>
        <div class="flex items-center justify-between mt-4">
          <div class="flex items-center gap-2">
            <UAvatar
              v-if="options.showAuthorAvatar"
              :src="props.blog.author.image"
            />
            <p class="text-sm">{{ props.blog.author.name }}</p>
          </div>
          <p class="text-sm text-gray-500">{{ props.blog.date }}</p>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
