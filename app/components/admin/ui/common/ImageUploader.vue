<script setup lang="ts">
interface Props {
  modelValue?: string | null;
  folder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  folder: "blog",
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string | null): void;
}>();

const { t } = useI18n();
const { uploadImage, loading, progress } = useImageUpload();

const previewUrl = computed(() => props.modelValue || null);
const isDragging = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

const handleFileSelect = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    await handleUpload(file);
  }
};

const handleDrop = async (event: DragEvent) => {
  isDragging.value = false;
  const file = event.dataTransfer?.files?.[0];
  if (file) {
    await handleUpload(file);
  }
};

const handleUpload = async (file: File) => {
  const result = await uploadImage(file, props.folder);
  if (result) {
    emit("update:modelValue", result.url);
  }
};

const handleRemove = () => {
  emit("update:modelValue", null);
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

const triggerFileInput = () => {
  fileInput.value?.click();
};
</script>

<template>
  <div class="space-y-2">
    <!-- Preview -->
    <div
      v-if="previewUrl"
      class="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      <img
        :src="previewUrl"
        alt="Preview"
        class="w-full h-48 object-cover"
      />
      <div class="absolute top-2 right-2 flex gap-2">
        <UButton
          icon="i-lucide-trash-2"
          color="error"
          variant="solid"
          size="sm"
          @click="handleRemove"
        />
      </div>
    </div>

    <!-- Upload area -->
    <div
      v-else
      class="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors"
      :class="[
        isDragging
          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
          : 'border-gray-300 dark:border-gray-600 hover:border-primary-400',
      ]"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <input
        ref="fileInput"
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        class="hidden"
        @change="handleFileSelect"
      />

      <div v-if="loading" class="space-y-2">
        <UIcon name="i-lucide-loader-2" class="w-8 h-8 mx-auto animate-spin text-primary-500" />
        <p class="text-sm text-gray-500">Uploading... {{ progress }}%</p>
        <UProgress :value="progress" />
      </div>

      <div v-else class="space-y-2">
        <UIcon name="i-lucide-upload-cloud" class="w-10 h-10 mx-auto text-gray-400" />
        <p class="text-sm text-gray-600 dark:text-gray-400">
          {{ t("label.drag_drop_image") || "Drag and drop an image, or click to browse" }}
        </p>
        <p class="text-xs text-gray-400">
          JPEG, PNG, GIF, WebP (max 5MB)
        </p>
      </div>
    </div>
  </div>
</template>
