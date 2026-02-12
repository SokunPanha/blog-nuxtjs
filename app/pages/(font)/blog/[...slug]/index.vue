<script setup lang="ts">
import { useBreakpoints } from "@vueuse/core";
import { useBlogSession } from "~/composables/blog/useBlogSession";
import { parseMarkdown } from "@nuxtjs/mdc/runtime";

definePageMeta({
  layout: "blog-layout",
});

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const contentIsParsing = ref(false);

const slug = computed(() => {
  const params = route.params.slug;
  return Array.isArray(params) ? params.join("/") : params;
});

// Use session from composable - state is already fetched by layout
const { loggedIn, fetch } = useBlogSession();


// Track if we're on client to prevent hydration mismatch
const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});

// Only apply login-dependent styles after hydration
const isContentRestricted = computed(() => isMounted.value && !loggedIn.value);
// Fetch post by slug - no await for instant navigation, SSR still works
const { data, pending, error } = useFetch(() => `/api/v1/posts/${slug.value}`, {
  watch: [slug],
});

const post = computed(() => data.value?.data || null);
const relatedPosts = computed(() => data.value?.data?.relatedPosts || []);

// Parse markdown content reactively
const parsedContent = ref<Awaited<ReturnType<typeof parseMarkdown>> | null>(null);

watch(
  () => post.value?.content,
  async (content, _, onCleanup) => {
    if (!content) {
      parsedContent.value = null
      return
    }

    contentIsParsing.value = true

    let cancelled = false
    onCleanup(() => {
      cancelled = true
    })

    const result = await parseMarkdown(content)

    if (!cancelled) {
      parsedContent.value = result
      contentIsParsing.value = false
    }
  },
  { immediate: true }
)

const breakPoint = useBreakpoints(
  {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  },
  { ssrWidth: 1024 },
);

const isDesktop = breakPoint.greaterOrEqual("lg");

// Format date
const formatDate = (dateString: string | null) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// SEO
useHead({
  title: computed(() => post.value?.title || "Blog"),
});

useSeoMeta({
  title: computed(() => post.value?.title),
  description: computed(() => post.value?.excerpt || ""),
  ogImage: computed(() => post.value?.coverImage),
});
</script>

<template>
  <!-- Floating Home Button -->
  <NuxtLink
    v-if="!pending"
    to="/"
    class="fixed bottom-6 right-6 z-10 flex items-center justify-center w-12 h-12 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
  >
    <UIcon name="i-lucide-home" class="w-6 h-6" />
  </NuxtLink>

  <main>
    <!-- Loading state -->
    <div v-if="pending" class="max-w-4xl mx-auto p-10">
      <div class="animate-pulse">
        <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8" />
        <div class="h-64 bg-gray-200 dark:bg-gray-700 rounded mb-8" />
        <div class="space-y-3">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
        </div>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="max-w-4xl mx-auto p-10">
      <UAlert
        color="error"
        icon="i-lucide-alert-circle"
        :title="t('message.post_not_found') || 'Post not found'"
        :description="
          t('message.post_not_found_description') ||
          'The post you are looking for does not exist or has been removed.'
        "
      />
      <div class="mt-6">
        <UButton @click="router.push('/blog')">
          {{ t("label.back_to_blog") || "Back to Blog" }}
        </UButton>
      </div>
    </div>

    <!-- Post content -->
    <div
      v-else-if="post"
      :class="{ 'h-screen overflow-hidden': isContentRestricted }"
      class="max-w-7xl mx-auto p-10 flex lg:flex-row flex-col justify-between gap-20"
    >
      <section class="relative flex-1">
        <UButton
          class="absolute top-0 -left-9 bg-gray-300 text-black dark:text-white dark:bg-gray-700 cursor-pointer"
          leading-icon="line-md-chevron-left"
          @click="router.back()"
          type="button"
          variant="ghost"
        />

        <!-- Cover image -->
        <NuxtImg
          v-if="post.coverImage"
          :src="post.coverImage"
          :alt="post.title"
          class="w-full h-64 object-cover rounded-lg mb-8"
          format="webp"
        />

        <!-- Post header -->
        <div class="flex flex-col gap-2 mb-8">
          <div class="flex flex-row items-center justify-between gap-2">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
              {{ post.title }}
            </h1>
          </div>
          <p class="text-sm text-gray-500">
            {{ formatDate(post.publishedAt) }}
          </p>

          <!-- Author -->
          <div class="flex flex-row items-center gap-2">
            <UAvatar
              :src="post.author?.avatar || undefined"
              :alt="post.author?.username"
              size="sm"
            />
            <p class="text-sm text-gray-500">
              {{ post.author?.firstName }}
              {{ post.author?.lastName || post.author?.username }}
            </p>
          </div>

          <!-- Categories and Tags -->
          <div class="flex flex-wrap gap-2 mt-2">
            <UBadge
              v-for="cat in post.categories"
              :key="cat.id"
              color="primary"
              variant="subtle"
            >
              {{ cat.name }}
            </UBadge>
            <UBadge
              v-for="tag in post.tags"
              :key="tag.id"
              color="neutral"
              variant="outline"
            >
              #{{ tag.name }}
            </UBadge>
          </div>

          <div
            v-if="isContentRestricted"
            class="h-[50vh] z-[1000] bg-linear-to-b from-gray-50/40 via-gray-100 to-gray-50 dark:from-black/10 dark:via-black/100 dark:to-black flex p-10 items-end justify-center fixed bottom-0 left-0 right-0 w-full"
          >
            <OauthCard />
          </div>
        </div>

        <!-- Post content -->
        <article class="prose prose-lg dark:prose-invert max-w-none">
          <div v-if="contentIsParsing">
            <div class="animate-pulse">
              <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8" />
              <div class="h-64 bg-gray-200 dark:bg-gray-700 rounded mb-8" />
              <div class="space-y-3">
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
              </div>
            </div>
          </div>
          <MDCRenderer
            v-else-if="parsedContent?.body"
            :body="parsedContent.body"
            :data="parsedContent.data"
          />
        </article>
      </section>

      <!-- Related posts -->
      <section v-if="relatedPosts.length > 0" class="lg:w-80">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-5">
          {{ t("label.related_posts") || "Related Posts" }}
        </h2>
        <div
          class="lg:flex  lg:flex-col lg:gap-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 lg:grid-cols-1 gap-5"
        >
          <BlogCard
            v-for="related in relatedPosts"
            :key="related.id"
            :blog="{
              id: related.id,
              title: related.title,
              slug: related.slug,
              image: related.coverImage,
              author: {
                name: `${related.author?.firstName || ''} ${related.author?.lastName || related.author?.username || ''}`.trim(),
                image: related.author?.avatar || '',
              },
              date: related.publishedAt
                ? new Date(related.publishedAt).toLocaleDateString()
                : '',
            }"
            :options="{
              showAuthorAvatar: false,
              horizontal: isDesktop,
            }"
          />
        </div>
      </section>
    </div>
  </main>
</template>

<style>
.prose img {
  border-radius: 0.5rem;
}

.prose a {
  color: var(--color-primary-500);
}

.prose a:hover {
  color: var(--color-primary-600);
}

.prose code {
  background-color: rgb(243 244 246);
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
}

.dark .prose code {
  background-color: rgb(31 41 55);
}

.prose pre {
  background-color: rgb(17 24 39);
}

.dark .prose pre {
  background-color: rgb(31 41 55);
}
</style>
