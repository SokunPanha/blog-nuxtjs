<script setup lang="ts">
interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface Props {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
}

defineProps<Props>();
</script>

<template>
  <div class="mb-6">
    <UBreadcrumb
      v-if="breadcrumbs && breadcrumbs.length"
      :items="breadcrumbs"
      class="mb-2"
    />
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ title }}
      </h1>
      <div class="flex items-center gap-2">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>
