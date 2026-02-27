<script setup lang="ts">
const { needRefresh, offlineReady, showInstallPrompt, cancelInstall, install } =
  usePwa();

const installPwa = async () => {
  await install();
};
</script>

<template>
  <UButton
    v-if="showInstallPrompt"
    icon="i-heroicons-arrow-down-tray"
    color="primary"
    variant="soft"
    size="sm"
    @click="installPwa"
  >
    Install App
  </UButton>
</template>
