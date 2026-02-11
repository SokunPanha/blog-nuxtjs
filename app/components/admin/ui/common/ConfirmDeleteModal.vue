<script setup lang="ts">
interface Props {
  open: boolean;
  title?: string;
  message?: string;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: "Confirm Delete",
  message: "Are you sure you want to delete this item? This action cannot be undone.",
  loading: false,
});

const emit = defineEmits<{
  (e: "update:open", value: boolean): void;
  (e: "confirm"): void;
  (e: "cancel"): void;
}>();

const { t } = useI18n();

const handleCancel = () => {
  emit("update:open", false);
  emit("cancel");
};

const handleConfirm = () => {
  emit("confirm");
};
</script>

<template>
  <UModal :open="open" @update:open="emit('update:open', $event)">
    <template #header>
      <div class="flex items-center gap-2 text-red-600 dark:text-red-400">
        <UIcon name="i-lucide-alert-triangle" class="w-5 h-5" />
        <span>{{ title }}</span>
      </div>
    </template>

    <template #body>
      <p class="text-gray-600 dark:text-gray-300">
        {{ message }}
      </p>
    </template>

    <template #footer>
      <div class="flex justify-end gap-3">
        <UButton
          color="neutral"
          variant="outline"
          :disabled="loading"
          @click="handleCancel"
        >
          {{ t("label.cancel") }}
        </UButton>
        <UButton
          color="error"
          :loading="loading"
          @click="handleConfirm"
        >
          {{ t("label.delete") }}
        </UButton>
      </div>
    </template>
  </UModal>
</template>
