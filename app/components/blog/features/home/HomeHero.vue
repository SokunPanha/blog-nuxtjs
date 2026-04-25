<script setup lang="ts">
const isVisible = ref(false)
const sectionVisible = ref(false)

onMounted(() => {
  sectionVisible.value = true
  setTimeout(() => { isVisible.value = true }, 80)
})
</script>

<template>
  <section
    class="relative overflow-hidden bg-white dark:bg-gray-950 min-h-[560px] flex items-center transition-opacity duration-500 ease-out"
    :class="sectionVisible ? 'opacity-100' : 'opacity-0'"
  >
    <!-- Ambient blobs -->
    <div class="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
      <div class="absolute -top-24 left-1/3 w-[480px] h-[480px] bg-primary-400/10 dark:bg-primary-500/10 rounded-full blur-[120px]" />
      <div class="absolute bottom-0 right-1/4 w-[360px] h-[360px] bg-violet-400/10 dark:bg-violet-500/10 rounded-full blur-[100px]" />
    </div>

    <!-- Subtle dot grid -->
    <div
      class="absolute inset-0 opacity-40 dark:opacity-20"
      style="background-image: radial-gradient(circle, #d1d5db 1px, transparent 1px); background-size: 28px 28px; mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 50%, transparent 100%)"
      aria-hidden="true"
    />

    <div class="relative max-w-6xl mx-auto px-6 py-24 w-full">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        <!-- Left: Text -->
        <div class="flex flex-col gap-7">
          <div
            class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/60 border border-primary-200 dark:border-primary-800/60 text-primary-600 dark:text-primary-400 text-sm font-medium w-fit transition-all duration-600 ease-out"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            style="transition-delay: 0ms"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
            {{ $t("label.blog") || "Blog" }}
          </div>

          <h1
            class="text-5xl lg:text-[3.6rem] font-extrabold leading-[1.1] tracking-tight text-gray-900 dark:text-white transition-all duration-700 ease-out"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
            style="transition-delay: 80ms"
          >
            {{ $t("welcome_to_my_blog") }}
          </h1>

          <p
            class="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-md transition-all duration-700 ease-out"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
            style="transition-delay: 160ms"
          >
            {{ $t("welcome_to_my_blog_description") }}
          </p>

          <div
            class="flex flex-wrap items-center gap-3 pt-1 transition-all duration-700 ease-out"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
            style="transition-delay: 240ms"
          >
            <NuxtLink
              to="/blog"
              class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold shadow-sm hover:opacity-85 transition-opacity"
            >
              {{ $t("label.explore") || "Explore Articles" }}
              <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
            </NuxtLink>
            <NuxtLink
              to="/category"
              class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
            >
              {{ $t("label.browse_category") || "Browse Topics" }}
            </NuxtLink>
          </div>
        </div>

        <!-- Right: Illustration -->
        <div
          class="relative flex justify-center lg:justify-end transition-all duration-700 ease-out"
          :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'"
          style="transition-delay: 120ms"
        >
          <div class="relative">
            <div
              class="absolute inset-[-16px] rounded-full border border-dashed border-primary-200/70 dark:border-primary-800/50 animate-[spin_35s_linear_infinite]"
              aria-hidden="true"
            />
            <div
              class="absolute inset-[-32px] rounded-full border border-dashed border-violet-200/50 dark:border-violet-800/30 animate-[spin_50s_linear_infinite_reverse]"
              aria-hidden="true"
            />
            <NuxtImg
              format="webp"
              width="360"
              height="360"
              class="w-[260px] lg:w-[360px] relative z-10 drop-shadow-2xl"
              src="https://static.vecteezy.com/system/resources/previews/028/589/224/original/coding-3d-rendering-icon-illustration-free-png.png"
              alt=""
            />
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

