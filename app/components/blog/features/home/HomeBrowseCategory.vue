<script setup lang="ts">
import type { CategoryType } from "~~/shared/types";

defineProps({
  categories: {
    type: Array<CategoryType>,
    default: () => [],
  },
});

const { locale } = useI18n();
const localePath = useLocalePath();
const scrollRef = ref<HTMLElement | null>(null);

const scroll = (dir: 'left' | 'right') => {
  scrollRef.value?.scrollBy({ left: dir === 'right' ? 300 : -300, behavior: 'smooth' });
};

const { el, entered, mounted, animClass } = useAnimateOnEnter(0.1)
</script>

<template>
  <section
    ref="el"
    class="py-12 bg-white dark:bg-gray-950 transition-all duration-700 ease-out"
    :class="animClass"
  >
    <div class="max-w-6xl mx-auto px-6">

      <div class="flex justify-between items-end mb-8">
        <div>
          <p class="text-xs font-bold uppercase tracking-widest text-primary-500 mb-1.5">
            {{ $t("label.topics") || "Topics" }}
          </p>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ $t("label.browse_category") }}
          </h2>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="scroll('left')"
            class="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Scroll left"
          >
            <UIcon name="i-lucide-chevron-left" class="w-4 h-4" />
          </button>
          <button
            @click="scroll('right')"
            class="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Scroll right"
          >
            <UIcon name="i-lucide-chevron-right" class="w-4 h-4" />
          </button>
          <NuxtLink
            :to="localePath('/category')"
            class="ml-1 text-sm font-semibold text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 flex items-center gap-1 transition-colors"
          >
            {{ $t("label.view_all") }}
            <UIcon name="i-lucide-arrow-right" class="w-3.5 h-3.5" />
          </NuxtLink>
        </div>
      </div>

      <div ref="scrollRef" class="flex gap-5 overflow-x-auto no-scrollbar pb-1">
        <NuxtLink
          v-for="(category, i) in categories"
          :key="category.id"
          :to="localePath(`/category/${category.slug}`)"
          class="group flex flex-col items-center gap-3 flex-shrink-0 w-[108px] transition-all duration-500 ease-out"
          :class="mounted ? (entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6') : ''"
          :style="entered ? { transitionDelay: `${i * 55}ms` } : {}"
        >
          <div class="w-[88px] h-[88px] rounded-2xl overflow-hidden ring-2 ring-transparent group-hover:ring-primary-400 dark:group-hover:ring-primary-500 transition-all duration-300 bg-gray-100 dark:bg-gray-800 shadow-sm">
            <NuxtImg
              format="webp"
              width="88"
              height="88"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              :src="category.coverImage || ''"
              alt=""
            />
          </div>
          <p class="text-xs font-semibold text-gray-600 dark:text-gray-400 text-center leading-tight group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
            {{ category.name[locale as 'en' | 'kh'] || category.name.en }}
          </p>
        </NuxtLink>
      </div>

    </div>
  </section>
</template>
