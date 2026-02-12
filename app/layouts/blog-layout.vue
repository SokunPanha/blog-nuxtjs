<script setup lang="ts">
import { useBlogSession } from "~/composables/blog/useBlogSession";

// Fetch blog session on layout mount
const { fetch: fetchSession } = useBlogSession();
await fetchSession();
</script>

<template>
  <NavigationBar />
  <Transition name="fade-up" appear>
    <main class="relative pt-3">
      <slot name="default"></slot>
    </main>
  </Transition>
  <footer>
    <!-- <p>Footer</p> -->
  </footer>
</template>

<style scoped>
.fade-up-enter-active,
.fade-up-leave-active {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
}

.fade-up-enter-from {
  transform: translateY(20px);
  opacity: 0;
}

.fade-up-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
