<script setup lang="ts">
import { useHome } from "~/composables/blog/useHome";

definePageMeta({
  layout: "blog-layout",
});
const router = useRouter();
const { homeData, loading, cotegoriesData } = useHome();
const { t } = useI18n();
</script>

<template>
  <main>
    <HomeHero />
    <HomeBrowseCategory :categories="cotegoriesData" />

    <div v-if="loading" class="max-w-7xl mx-auto p-4 md:p-10 space-y-10">
      <div v-for="i in 3" :key="i" class="space-y-4">
        <div class="flex justify-between items-center">
          <USkeleton class="h-6 w-32" />
          <USkeleton class="h-5 w-20" />
        </div>
        <div class="flex gap-4 overflow-hidden">
          <USkeleton
            v-for="j in 3"
            :key="j"
            class="h-[250px] w-[250px] rounded-lg shrink-0"
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
  </main>
</template>
