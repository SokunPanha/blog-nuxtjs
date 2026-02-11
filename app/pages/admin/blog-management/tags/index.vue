<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { Tag } from "~~/app/composables/useAdminTags";

definePageMeta({
  layout: "admin-layout",
});

const { t } = useI18n();
const { tags, meta, loading, fetchTags, createTag, updateTag, deleteTag } =
  useAdminTags();

// State
const search = ref("");
const page = ref(1);
const limit = ref(10);

// Modal state
const formModalOpen = ref(false);
const deleteModalOpen = ref(false);
const selectedTag = ref<Tag | null>(null);
const formLoading = ref(false);
const deleteLoading = ref(false);

// Table columns
const columns: TableColumn<Tag>[] = [
  {
    accessorKey: "name",
    header: t("tableColumn.tag_name") || "Name",
  },
  {
    accessorKey: "slug",
    header: t("label.slug") || "Slug",
  },
  {
    accessorKey: "postCount",
    header: t("label.posts") || "Posts",
  },
  {
    accessorKey: "actions",
    header: t("label.actions") || "Actions",
  },
];

// Fetch tags
const loadTags = async () => {
  await fetchTags({
    page: page.value,
    limit: limit.value,
    search: search.value || undefined,
  });
};

onMounted(loadTags);

watch(search, () => {
  page.value = 1;
  loadTags();
});

watch(page, loadTags);

// Actions
const handleCreate = () => {
  selectedTag.value = null;
  formModalOpen.value = true;
};

const handleEdit = (tag: Tag) => {
  selectedTag.value = tag;
  formModalOpen.value = true;
};

const handleDeleteClick = (tag: Tag) => {
  selectedTag.value = tag;
  deleteModalOpen.value = true;
};

const handleFormSubmit = async (data: any) => {
  try {
    formLoading.value = true;
    if (selectedTag.value) {
      await updateTag(selectedTag.value.id, data);
    } else {
      await createTag(data);
    }
    formModalOpen.value = false;
    await loadTags();
  } finally {
    formLoading.value = false;
  }
};

const handleDeleteConfirm = async () => {
  if (!selectedTag.value) return;

  try {
    deleteLoading.value = true;
    await deleteTag(selectedTag.value.id);
    deleteModalOpen.value = false;
    selectedTag.value = null;
  } finally {
    deleteLoading.value = false;
  }
};

// Breadcrumbs
const breadcrumbs = [
  { label: t("label.dashboard") || "Dashboard", to: "/admin" },
  { label: t("label.tags") || "Tags" },
];
</script>

<template>
  <div>
    <AdminPageHeader
      :title="t('label.tags') || 'Tags'"
      :breadcrumbs="breadcrumbs"
    >
      <template #actions>
        <UButton icon="i-lucide-plus" color="primary" @click="handleCreate">
          {{ t("label.create") || "Create" }}
        </UButton>
      </template>
    </AdminPageHeader>

    <UCard>
      <!-- Filters -->
      <template #header>
        <div class="flex flex-col sm:flex-row gap-4">
          <UInput
            v-model="search"
            icon="i-lucide-search"
            :placeholder="t('placeholder.search') || 'Search...'"
            class="w-full sm:w-64"
          />
        </div>
      </template>

      <!-- Table -->
      <UTable :data="tags" :columns="columns" :loading="loading">
        <template #name-cell="{ row }">
          <div class="flex items-center gap-3">
            <img
              v-if="row.original.coverImage"
              :src="row.original.coverImage"
              :alt="row.original.name"
              class="w-8 h-8 rounded object-cover"
            />
            <div
              v-else
              class="w-8 h-8 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
            >
              <UIcon name="i-lucide-tag" class="w-4 h-4 text-gray-400" />
            </div>
            <span class="font-medium">{{ row.original.name }}</span>
          </div>
        </template>

        <template #slug-cell="{ row }">
          <code class="text-sm text-gray-500">{{ row.original.slug }}</code>
        </template>

        <template #postCount-cell="{ row }">
          <UBadge color="neutral" variant="subtle">
            {{ row.original.postCount }}
            {{ row.original.postCount === 1 ? "post" : "posts" }}
          </UBadge>
        </template>

        <template #actions-cell="{ row }">
          <div class="flex items-center gap-1">
            <UTooltip :text="t('label.edit') || 'Edit'">
              <UButton
                icon="i-lucide-edit"
                color="neutral"
                variant="ghost"
                size="sm"
                @click="handleEdit(row.original)"
              />
            </UTooltip>
            <UTooltip :text="t('label.delete') || 'Delete'">
              <UButton
                icon="i-lucide-trash-2"
                color="error"
                variant="ghost"
                size="sm"
                @click="handleDeleteClick(row.original)"
              />
            </UTooltip>
          </div>
        </template>
      </UTable>

      <!-- Pagination -->
      <template v-if="meta && meta.totalPages > 1" #footer>
        <div class="flex justify-between items-center">
          <p class="text-sm text-gray-500">
            Showing {{ (page - 1) * limit + 1 }} to
            {{ Math.min(page * limit, meta.total) }} of {{ meta.total }} results
          </p>
          <UPagination
            v-model="page"
            :total="meta.total"
            :items-per-page="limit"
          />
        </div>
      </template>
    </UCard>

    <!-- Form modal -->
    <TagFormModal
      v-model:open="formModalOpen"
      :tag="selectedTag"
      :loading="formLoading"
      @submit="handleFormSubmit"
    />

    <!-- Delete confirmation modal -->
    <ConfirmDeleteModal
      v-model:open="deleteModalOpen"
      :loading="deleteLoading"
      :title="t('label.delete_tag') || 'Delete Tag'"
      :message="`Are you sure you want to delete '${selectedTag?.name}'? This action cannot be undone.`"
      @confirm="handleDeleteConfirm"
    />
  </div>
</template>
