<script setup lang="ts">
import { z } from "zod";
import type { Tag } from "~~/app/composables/useAdminTags";

interface Props {
  open: boolean;
  tag?: Tag | null;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
});

const emit = defineEmits<{
  (e: "update:open", value: boolean): void;
  (e: "submit", data: any): void;
}>();

const { t } = useI18n();

// Form state
const formState = reactive({
  name: "",
  description: "",
  coverImage: "",
});

// Validation schema
const schema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  description: z.string().max(500).optional(),
  coverImage: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

const isEdit = computed(() => !!props.tag);
const modalTitle = computed(() =>
  isEdit.value ? t("label.edit_tag") || "Edit Tag" : t("label.create_tag") || "Create Tag"
);

// Reset form when modal opens
watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      if (props.tag) {
        formState.name = props.tag.name;
        formState.description = props.tag.description || "";
        formState.coverImage = props.tag.coverImage || "";
      } else {
        formState.name = "";
        formState.description = "";
        formState.coverImage = "";
      }
    }
  }
);

const handleSubmit = () => {
  emit("submit", {
    ...formState,
    coverImage: formState.coverImage || null,
  });
};

const handleClose = () => {
  emit("update:open", false);
};
</script>

<template>
  <UModal :open="open" @update:open="emit('update:open', $event)">
    <template #header>
      {{ modalTitle }}
    </template>

    <template #body>
      <UForm :state="formState" :schema="schema" @submit="handleSubmit" class="space-y-4">
        <UFormField name="name" :label="t('label.name') || 'Name'" required>
          <UInput v-model="formState.name" />
        </UFormField>

        <UFormField name="description" :label="t('label.description') || 'Description'">
          <UTextarea v-model="formState.description" :rows="3" />
        </UFormField>

        <UFormField name="coverImage" :label="t('label.cover_image') || 'Cover Image'">
          <ImageUploader v-model="formState.coverImage" folder="tags" />
        </UFormField>
      </UForm>
    </template>

    <template #footer>
      <div class="flex justify-end gap-3">
        <UButton
          color="neutral"
          variant="outline"
          :disabled="loading"
          @click="handleClose"
        >
          {{ t("label.cancel") || "Cancel" }}
        </UButton>
        <UButton
          color="primary"
          :loading="loading"
          @click="handleSubmit"
        >
          {{ isEdit ? t("label.update") || "Update" : t("label.create") || "Create" }}
        </UButton>
      </div>
    </template>
  </UModal>
</template>
