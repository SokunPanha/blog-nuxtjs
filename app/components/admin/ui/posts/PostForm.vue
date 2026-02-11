<script setup lang="ts">
import { z } from "zod";
import type { Post } from "~~/app/composables/useAdminPosts";
import type { Category } from "~~/app/composables/useAdminCategories";
import type { Tag } from "~~/app/composables/useAdminTags";

type PostStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

interface Props {
  post?: Post | null;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
});

const emit = defineEmits<{
  (e: "submit", data: any): void;
  (e: "cancel"): void;
}>();

const { t } = useI18n();
const { fetchAllCategories } = useAdminCategories();
const { fetchAllTags } = useAdminTags();

// Form state
const formState = reactive({
  title: props.post?.title || "",
  excerpt: props.post?.excerpt || "",
  coverImage: props.post?.coverImage || "",
  content: props.post?.content || "",
  status: (props.post?.status || "DRAFT") as PostStatus,
  isFeatured: props.post?.isFeatured || false,
  categoryIds: props.post?.categories?.map((c) => c.id) || [] as string[],
  tagIds: props.post?.tags?.map((t) => t.id) || [] as string[],
});

// Validation schema
const schema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  excerpt: z.string().max(500).optional(),
  coverImage: z.string().url("Must be a valid URL"),
  content: z.string().min(1, "Content is required"),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  isFeatured: z.boolean().optional(),
  categoryIds: z.array(z.string()).optional(),
  tagIds: z.array(z.string()).optional(),
});

// Options
const statusOptions = [
  { value: "DRAFT", label: "Draft" },
  { value: "PUBLISHED", label: "Published" },
  { value: "ARCHIVED", label: "Archived" },
];

const categories = ref<Category[]>([]);
const tags = ref<Tag[]>([]);

// Fetch categories and tags
onMounted(async () => {
  try {
    categories.value = await fetchAllCategories();
    tags.value = await fetchAllTags();
  } catch (error) {
    console.error("Failed to fetch categories/tags:", error);
  }
});

const categoryOptions = computed(() =>
  categories.value.map((c) => ({ value: c.id, label: c.name }))
);

const tagOptions = computed(() =>
  tags.value.map((t) => ({ value: t.id, label: t.name }))
);

const handleSubmit = () => {
  emit("submit", { ...formState });
};

// Watch for post changes (edit mode)
watch(
  () => props.post,
  (newPost) => {
    if (newPost) {
      formState.title = newPost.title;
      formState.excerpt = newPost.excerpt || "";
      formState.coverImage = newPost.coverImage;
      formState.content = newPost.content;
      formState.status = newPost.status as PostStatus;
      formState.isFeatured = newPost.isFeatured || false;
      formState.categoryIds = newPost.categories?.map((c) => c.id) || [];
      formState.tagIds = newPost.tags?.map((t) => t.id) || [];
    }
  },
  { deep: true }
);
</script>

<template>
  <UForm :state="formState" :schema="schema" @submit="handleSubmit">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main content -->
      <div class="lg:col-span-2 space-y-6">
        <UCard>
          <template #header>
            <h3 class="font-semibold">{{ t("label.content") || "Content" }}</h3>
          </template>

          <div class="space-y-4">
            <UFormField name="title" :label="t('label.title') || 'Title'" required>
              <UInput v-model="formState.title" size="lg" />
            </UFormField>

            <UFormField name="excerpt" :label="t('label.excerpt') || 'Excerpt'">
              <UTextarea v-model="formState.excerpt" :rows="3" />
            </UFormField>

            <UFormField name="content" :label="t('label.content') || 'Content'" required>
              <EditorTipTap v-model="formState.content" class="min-h-[400px]" />
            </UFormField>
          </div>
        </UCard>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <UCard>
          <template #header>
            <h3 class="font-semibold">{{ t("label.publish") || "Publish" }}</h3>
          </template>

          <div class="space-y-4">
            <UFormField name="status" :label="t('label.status') || 'Status'">
              <USelect v-model="formState.status" :items="statusOptions" value-key="value" />
            </UFormField>

            <UFormField name="isFeatured">
              <UCheckbox
                v-model="formState.isFeatured"
                :label="t('label.featured_post') || 'Featured Post'"
              />
            </UFormField>

            <div class="flex gap-2 pt-4">
              <UButton
                type="button"
                color="neutral"
                variant="outline"
                class="flex-1"
                :disabled="loading"
                @click="emit('cancel')"
              >
                {{ t("label.cancel") || "Cancel" }}
              </UButton>
              <UButton
                type="submit"
                color="primary"
                class="flex-1"
                :loading="loading"
              >
                {{ post ? t("label.update") || "Update" : t("label.create") || "Create" }}
              </UButton>
            </div>
          </div>
        </UCard>

        <UCard>
          <template #header>
            <h3 class="font-semibold">{{ t("label.cover_image") || "Cover Image" }}</h3>
          </template>

          <UFormField name="coverImage">
            <ImageUploader v-model="formState.coverImage" folder="posts" />
          </UFormField>
        </UCard>

        <UCard>
          <template #header>
            <h3 class="font-semibold">{{ t("label.categories") || "Categories" }}</h3>
          </template>

          <UFormField name="categoryIds">
            <USelectMenu
              v-model="formState.categoryIds"
              :items="categoryOptions"
              multiple
              value-key="value"
              :placeholder="t('placeholder.select_categories') || 'Select categories'"
            />
          </UFormField>
        </UCard>

        <UCard>
          <template #header>
            <h3 class="font-semibold">{{ t("label.tags") || "Tags" }}</h3>
          </template>

          <UFormField name="tagIds">
            <USelectMenu
              v-model="formState.tagIds"
              :items="tagOptions"
              multiple
              value-key="value"
              :placeholder="t('placeholder.select_tags') || 'Select tags'"
            />
          </UFormField>
        </UCard>
      </div>
    </div>
  </UForm>
</template>
