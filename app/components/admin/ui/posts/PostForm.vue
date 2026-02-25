<script setup lang="ts">
import { z } from "zod";
import type { Post } from "~/composables/admin/useAdminPosts";
import type { Category } from "~/composables/admin/useAdminCategories";
import type { Tag } from "~/composables/admin/useAdminTags";

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
const { fetchPosts } = useAdminPosts();

// Form state
const formState = reactive({
  titleEn: props.post?.titleEn || "",
  titleKh: props.post?.titleKh || "",
  excerptEn: props.post?.excerptEn || "",
  excerptKh: props.post?.excerptKh || "",
  coverImage: props.post?.coverImage || "",
  contentEn: props.post?.contentEn || "",
  contentKh: props.post?.contentKh || "",
  status: (props.post?.status || "DRAFT") as PostStatus,
  isFeatured: props.post?.isFeatured || false,
  categoryIds: props.post?.categories?.map((c) => c.id) || ([] as string[]),
  tagIds: props.post?.tags?.map((t) => t.id) || ([] as string[]),
  relatedPostIds: props.post?.relatedPosts?.map((p) => p.id) || ([] as string[]),
});

// Validation schema
const schema = z.object({
  titleEn: z.string().min(1, "English title is required").max(255),
  titleKh: z.string().max(255).optional(),
  excerptEn: z.string().max(500).optional(),
  excerptKh: z.string().max(500).optional(),
  coverImage: z.string().url("Must be a valid URL"),
  contentEn: z.string().min(1, "English content is required"),
  contentKh: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  isFeatured: z.boolean().optional(),
  categoryIds: z.array(z.string()).optional(),
  tagIds: z.array(z.string()).optional(),
  relatedPostIds: z.array(z.string()).optional(),
});

// Options
const statusOptions = [
  { value: "DRAFT", label: "Draft" },
  { value: "PUBLISHED", label: "Published" },
  { value: "ARCHIVED", label: "Archived" },
];

const categories = ref<Category[]>([]);
const tags = ref<Tag[]>([]);
const allPosts = ref<Post[]>([]);

// Fetch categories, tags, and posts
onMounted(async () => {
  try {
    const [cats, tagsData, postsData] = await Promise.all([
      fetchAllCategories(),
      fetchAllTags(),
      fetchPosts({ limit: 100 }),
    ]);
    categories.value = cats;
    tags.value = tagsData;
    allPosts.value = postsData.data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
});

const categoryOptions = computed(() =>
  categories.value.map((c) => ({ value: c.id, label: c.nameEn })),
);

const tagOptions = computed(() =>
  tags.value.map((t) => ({ value: t.id, label: t.nameEn })),
);

// Filter out current post from related posts options
const relatedPostOptions = computed(() =>
  allPosts.value
    .filter((p) => p.id !== props.post?.id)
    .map((p) => ({ value: p.id, label: p.titleEn })),
);

const handleSubmit = () => {
  emit("submit", { ...formState });
};

// Watch for post changes (edit mode)
watch(
  () => props.post,
  (newPost) => {
    if (newPost) {
      formState.titleEn = newPost.titleEn;
      formState.titleKh = newPost.titleKh || "";
      formState.excerptEn = newPost.excerptEn || "";
      formState.excerptKh = newPost.excerptKh || "";
      formState.coverImage = newPost.coverImage;
      formState.contentEn = newPost.contentEn;
      formState.contentKh = newPost.contentKh || "";
      formState.status = newPost.status as PostStatus;
      formState.isFeatured = newPost.isFeatured || false;
      formState.categoryIds = newPost.categories?.map((c) => c.id) || [];
      formState.tagIds = newPost.tags?.map((t) => t.id) || [];
      formState.relatedPostIds = newPost.relatedPosts?.map((p) => p.id) || [];
    }
  },
  { deep: true },
);
</script>

<template>
  <UForm :state="formState" :schema="schema" @submit="handleSubmit">
    <div class="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <!-- Main content -->
      <div class="lg:col-span-2 space-y-6">
        <UCard>
          <template #header>
            <h3 class="font-semibold">{{ t("label.content") || "Content" }}</h3>
          </template>

          <UTabs
            :items="[{ label: 'English (EN)', value: 'en', slot: 'en' }, { label: 'ភាសាខ្មែរ (KH)', value: 'kh', slot: 'kh' }]"
            class="w-full"
          >
            <template #en>
              <div class="space-y-4 pt-4">
                <UFormField name="titleEn" :label="t('label.title') || 'Title (EN)'" required>
                  <UInput class="w-full" v-model="formState.titleEn" size="lg" />
                </UFormField>
                <UFormField name="excerptEn" :label="t('label.excerpt') || 'Excerpt (EN)'">
                  <UTextarea class="w-full" v-model="formState.excerptEn" :rows="3" />
                </UFormField>
                <UFormField name="contentEn" :label="t('label.content') || 'Content (EN)'" required>
                  <EditorTipTap v-model="formState.contentEn" class="min-h-[400px]" />
                </UFormField>
              </div>
            </template>

            <template #kh>
              <div class="space-y-4 pt-4">
                <UFormField name="titleKh" :label="t('label.title') || 'ចំណងជើង (KH)'">
                  <UInput class="w-full" v-model="formState.titleKh" size="lg" />
                </UFormField>
                <UFormField name="excerptKh" :label="t('label.excerpt') || 'សង្ខេប (KH)'">
                  <UTextarea class="w-full" v-model="formState.excerptKh" :rows="3" />
                </UFormField>
                <UFormField name="contentKh" :label="t('label.content') || 'មាតិកា (KH)'">
                  <EditorTipTap v-model="formState.contentKh" class="min-h-[400px]" />
                </UFormField>
              </div>
            </template>
          </UTabs>
        </UCard>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
       

        <UCard>
          <template #header>
            <h3 class="font-semibold">
              {{ t("label.cover_image") || "Cover Image" }}
            </h3>
          </template>

          <UFormField name="coverImage">
            <ImageUploader v-model="formState.coverImage" folder="posts" />
          </UFormField>
        </UCard>

        <UCard>
          <template #header>
            <h3 class="font-semibold">
              {{ t("label.categories") || "Categories" }}
            </h3>
          </template>

          <UFormField name="categoryIds">
            <USelectMenu
              class="w-full"
              v-model="formState.categoryIds"
              :items="categoryOptions"
              multiple
              value-key="value"
              :placeholder="
                t('placeholder.select_categories') || 'Select categories'
              "
            />
          </UFormField>
        </UCard>

        <UCard>
          <template #header>
            <h3 class="font-semibold">{{ t("label.tags") || "Tags" }}</h3>
          </template>

          <UFormField name="tagIds">
            <USelectMenu
              class="w-full"
              v-model="formState.tagIds"
              :items="tagOptions"
              multiple
              value-key="value"
              :placeholder="t('placeholder.select_tags') || 'Select tags'"
            />
          </UFormField>
        </UCard>

        <UCard>
          <template #header>
            <h3 class="font-semibold">
              {{ t("label.related_posts") || "Related Posts" }}
            </h3>
          </template>

          <UFormField name="relatedPostIds">
            <USelectMenu
              v-model="formState.relatedPostIds"
              :items="relatedPostOptions"
              multiple
              value-key="value"
              class="w-full"
              :placeholder="
                t('placeholder.select_related_posts') || 'Select related posts (optional)'
              "
            />
          </UFormField>
         
        </UCard>
         <UCard>
          <template #header>
            <h3 class="font-semibold">{{ t("label.publish") || "Publish" }}</h3>
          </template>

          <div class="space-y-4">
            <UFormField name="status" :label="t('label.status') || 'Status'">
              <USelect
                v-model="formState.status"
                :items="statusOptions"
                value-key="value"
              />
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
                {{
                  post
                    ? t("label.update") || "Update"
                    : t("label.create") || "Create"
                }}
              </UButton>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </UForm>
</template>
