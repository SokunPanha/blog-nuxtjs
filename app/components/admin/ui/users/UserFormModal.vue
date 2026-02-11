<script setup lang="ts">
import { z } from "zod";
import type { User } from "~~/app/composables/useAdminUsers";

type UserRole = "ADMIN" | "USER" | "AUTHOR";

interface Props {
  open: boolean;
  user?: User | null;
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
  firstName: "",
  lastName: "",
  email: "",
  avatar: "",
  role: "USER" as UserRole,
});

// Validation schema
const schema = z.object({
  firstName: z.string().min(1, "First name is required").max(255),
  lastName: z.string().min(1, "Last name is required").max(255),
  email: z.string().email("Must be a valid email"),
  avatar: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  role: z.enum(["ADMIN", "USER", "AUTHOR"]),
});

const roleOptions = [
  { value: "USER", label: "User" },
  { value: "AUTHOR", label: "Author" },
  { value: "ADMIN", label: "Admin" },
];

// Reset form when modal opens
watch(
  () => props.open,
  (isOpen) => {
    if (isOpen && props.user) {
      formState.firstName = props.user.firstName || "";
      formState.lastName = props.user.lastName || "";
      formState.email = props.user.email;
      formState.avatar = props.user.avatar || "";
      formState.role = props.user.role as UserRole;
    }
  }
);

const handleSubmit = () => {
  emit("submit", {
    ...formState,
    avatar: formState.avatar || null,
  });
};

const handleClose = () => {
  emit("update:open", false);
};
</script>

<template>
  <UModal :open="open" @update:open="emit('update:open', $event)">
    <template #header>
      {{ t("label.edit_user") || "Edit User" }}
    </template>

    <template #body>
      <UForm :state="formState" :schema="schema" @submit="handleSubmit" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <UFormField name="firstName" :label="t('label.first_name') || 'First Name'" required>
            <UInput v-model="formState.firstName" />
          </UFormField>

          <UFormField name="lastName" :label="t('label.last_name') || 'Last Name'" required>
            <UInput v-model="formState.lastName" />
          </UFormField>
        </div>

        <UFormField name="email" :label="t('label.email') || 'Email'" required>
          <UInput v-model="formState.email" type="email" />
        </UFormField>

        <UFormField name="avatar" :label="t('label.avatar') || 'Avatar'">
          <ImageUploader v-model="formState.avatar" folder="avatars" />
        </UFormField>

        <UFormField name="role" :label="t('label.role') || 'Role'">
          <USelect v-model="formState.role" :items="roleOptions" />
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
          {{ t("label.update") || "Update" }}
        </UButton>
      </div>
    </template>
  </UModal>
</template>
