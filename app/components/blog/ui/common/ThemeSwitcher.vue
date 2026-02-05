<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed({
  get: () => colorMode.value === "dark",
  set: (value) => {
    colorMode.preference = value ? "dark" : "light";
  },
});
</script>

<template>
  <UButton
    class="cursor-pointer"
    :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
    variant="ghost"
    color="neutral"
    @click="isDark = !isDark"
  />
</template>
