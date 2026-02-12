<script setup lang="ts">
import { useBlogSession } from "~/composables/blog/useBlogSession";

// Fetch blog session on layout mount
const { fetch: fetchSession } = useBlogSession();
await fetchSession();
</script>

<template>
  <NavigationBar />
    <main class="relative pt-3">
      <slot name="default"></slot>
    </main>
  <footer>
    <!-- <p>Footer</p> -->
  </footer>
</template>
