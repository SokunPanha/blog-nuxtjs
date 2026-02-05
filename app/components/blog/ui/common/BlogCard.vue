<script setup lang="ts">
import type {BlogCardType} from '#shared/types'


interface Props {
  blog: BlogCardType;
}

const props = defineProps<Props>();

</script>
<template>
<NuxtLink :to="`/blogs/${props.blog.id}`">
  <div class=" hover:shadow-lg group cursor-pointer transition-all duration-300  rounded-lg h-[250px] w-[250px] overflow-hidden shrink-0">
    <div class="relative w-full h-1/2 rounded-lg overflow-hidden">
      <NuxtImg loading="lazy" class="w-full  h-full  object-cover group-hover:scale-110 transition-all duration-300" :src="props.blog.image" />
    </div>
    <div class="p-2">
      <p class="font-semibold line-clamp-2">{{ props.blog.title }}</p>
      <div class="flex items-center justify-between mt-4">
        <div class="flex items-center gap-2">
          <NuxtImg loading="lazy" class="w-7 h-7 rounded-full" :src="props.blog.author.image" />
          <p class="text-sm">{{ props.blog.author.name }}</p>
        </div>
        <p class="text-sm text-gray-500">{{ props.blog.date }}</p>
      </div>
    </div>
  </div>
</NuxtLink>
</template>
