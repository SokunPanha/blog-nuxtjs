<script setup lang="ts">
const isVisible = ref(false)

onMounted(() => {
  isVisible.value = true
})
</script>

<template>
  <main class="grid bg-gray-100 dark:bg-gray-800 py-10 overflow-hidden min-h-[600px]">
    <div
      class="flex max-w-4xl mx-auto flex-col md:flex-row md:justify-between items-center gap-4"
    >
      <Transition name="slide-left" appear>
        <section v-if="isVisible">
          <div class="md:p-0 p-10">
            <h1 class="text-4xl font-bold">{{ $t("welcome_to_my_blog") }}</h1>
            <p>{{ $t("welcome_to_my_blog_description") }}</p>
          </div>
        </section>
      </Transition>
      <Transition name="slide-right" appear>
        <section v-if="isVisible">
          <NuxtImg
            format="webp"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            width="400"
            height="400"
            class="md:w-[500px] w-[300px]"
            src="https://static.vecteezy.com/system/resources/previews/028/589/224/original/coding-3d-rendering-icon-illustration-free-png.png"
            alt=""
          />
        </section>
      </Transition>
    </div>
  </main>
</template>

<style scoped>
.slide-left-enter-active,
.slide-right-enter-active {
  transition: all 0.6s ease-out;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(-40px);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(40px);
}
</style>
