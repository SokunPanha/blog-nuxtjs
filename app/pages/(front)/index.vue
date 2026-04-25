<script setup lang="ts">
import { useHome } from "~/composables/blog/useHome";

definePageMeta({
  layout: "blog-layout",
});

const { homeData, loading, cotegoriesData } = useHome();
const { t } = useI18n();

useHead({
  title: t("label.blog") || "Blog",
  meta: [
    {
      name: "description",
      content: t("message.blog_description") || "Discover insights, tutorials, and stories from our team",
    },
  ],
})
</script>

<template>
  <div class="bg-white dark:bg-gray-950">
    <HomeHero />

    <div class="max-w-6xl mx-auto px-6">
      <div class="border-t border-gray-100 dark:border-gray-800/60" />
    </div>

    <HomeBrowseCategory :categories="cotegoriesData" />

    <div class="max-w-6xl mx-auto px-6">
      <div class="border-t border-gray-100 dark:border-gray-800/60" />
    </div>

    <!-- Skeleton -->
    <div v-if="loading" class="max-w-6xl mx-auto px-6 py-10 space-y-12">
      <div v-for="i in 3" :key="i" class="space-y-6">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-3">
            <USkeleton class="w-1 h-7 rounded-full" />
            <USkeleton class="h-7 w-44" />
          </div>
          <USkeleton class="h-5 w-20" />
        </div>
        <div class="flex gap-6 overflow-hidden">
          <USkeleton
            v-for="j in 3"
            :key="j"
            class="h-[320px] w-[300px] rounded-2xl shrink-0"
          />
        </div>
      </div>
    </div>

    <template v-else>
      <HomeBlogSection
        v-if="homeData.latestPosts.length > 0"
        :blogs="homeData.latestPosts"
        :section-title="t('label.latest_posts') || 'Latest Posts'"
        view-all-path="/blog?sort=latest"
      />

      <HomeBlogSection
        v-if="homeData.popularPosts.length > 0"
        :blogs="homeData.popularPosts"
        :section-title="t('label.popular_posts') || 'Popular Posts'"
        view-all-path="/blog?sort=popular"
      />

      <HomeBlogSection
        v-if="homeData.featuredPosts.length > 0"
        :blogs="homeData.featuredPosts"
        :section-title="t('label.featured_posts') || 'Featured Posts'"
        view-all-path="/blog?sort=featured"
      />
    </template>

    <div class="h-16" />
  </div>
</template>
