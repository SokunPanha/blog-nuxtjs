<script setup lang="ts">
interface Props {
  status: string;
}

const props = defineProps<Props>();

const statusConfig = computed(() => {
  switch (props.status) {
    case "PUBLISHED":
      return {
        color: "success" as const,
        label: "Published",
        icon: "i-lucide-check-circle",
      };
    case "DRAFT":
      return {
        color: "warning" as const,
        label: "Draft",
        icon: "i-lucide-file-edit",
      };
    case "ARCHIVED":
      return {
        color: "neutral" as const,
        label: "Archived",
        icon: "i-lucide-archive",
      };
    default:
      return {
        color: "neutral" as const,
        label: props.status,
        icon: "i-lucide-circle",
      };
  }
});
</script>

<template>
  <UBadge :color="statusConfig.color" variant="subtle" class="gap-1">
    <UIcon :name="statusConfig.icon" class="w-3 h-3" />
    {{ statusConfig.label }}
  </UBadge>
</template>
