<script setup lang="ts">
import {
  mockBlogData,
  mockRelatedBlogData,
} from "~~/shared/constants/mockData";
const route = useRoute();
const router = useRouter();
interface Author {
  name: string;
  image: string;
}

interface Blog {
  id: number;
  title: string;
  author: Author;
  date: string;
  htmlContent: string;
}
const blog: Blog | undefined = unref(
  computed(() => {
    return mockBlogData.find((blog) => blog.id === Number(route.params.id));
  }),
);
const isDesktop = useMediaQuery("lg");
</script>

<template>
  <main class="">
    <div class="max-w-7xl mx-auto p-10 flex lg:flex-row flex-col gap-20">
      <section class="relative">
        <UButton
          class="absolute top-0 -left-9 bg-gray-300 text-black dark:text-white dark:bg-gray-700 cursor-pointer"
          leading-icon="line-md-chevron-left"
          @click="router.back()"
          type="button"
          variant="ghost"
        />
        <div class="flex flex-col gap-2">
          <div class="flex flex-row items-center justify-between gap-2">
            <h2 class="text-2xl font-bold">{{ blog?.title }}</h2>
            <p class="text-sm text-gray-500">{{ blog?.date }}</p>
          </div>
          <div class="flex flex-row items-center gap-2">
            <UAvatar :src="blog?.author.image" />
            <p class="text-sm text-gray-500">{{ blog?.author.name }}</p>
          </div>
        </div>
        <div class="mt-5" v-html="blog?.htmlContent"></div>
      </section>

      <section >
        <h1 class="text-2xl font-bold">Related Blogs</h1>
        <main class="mt-5 lg:flex lg:flex-col lg:gap-5 grid sm:grid-cols-3 grid-cols-2 md:grid-cols-4 gap-5">
          <BlogCard
            v-for="blog in mockRelatedBlogData"
            :key="blog.id"
            :blog="blog"
            :options="{
              showAuthorAvatar: false,
              horizontal: isDesktop ? true : false,
            }"
          />
        </main>
      </section>
    </div>
  </main>
</template>
