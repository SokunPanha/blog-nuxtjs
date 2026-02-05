<script setup lang="ts">
import type {BlogCardType} from '#shared/types'

interface Props {
    sectionTitle: string;
    viewAllPath: string 
    blogs: BlogCardType[];
    
}

const props = defineProps<Props>();

</script>

<template>
    <section class="">
      <main class="md:p-10 p-4 max-w-7xl mx-auto">
          <div>
            <div class="flex justify-between items-center">
                <p class=" font-semibold ">{{ props.sectionTitle }}</p>
                <NuxtLink :to="props.viewAllPath">View All ></NuxtLink>
            </div>

          <div class="w-full overflow-x-auto no-scrollbar py-5">
              <div class="flex flex-nowrap gap-4 ">
                <BlogCard v-for="blog in blogs" :key="blog.id" :blog="blog" />
            </div>
          </div>
        </div>
      </main>
    </section>
</template>