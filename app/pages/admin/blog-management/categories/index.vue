<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { Category } from "~~/app/composables/useAdminCategories";

definePageMeta({
  layout: "admin-layout",
});

const { t } = useI18n();
const {
  categories,
  meta,
  loading,
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = useAdminCategories();

// State
const search = ref("");
const statusFilter = ref<string | undefined>(undefined);
const page = ref(1);
const limit = ref(10);

// Modal state
const formModalOpen = ref(false);
const deleteModalOpen = ref(false);
const selectedCategory = ref<Category | null>(null);
const formLoading = ref(false);
const deleteLoading = ref(false);

// Status options
const statusOptions = [
  { value: undefined, label: "All Status" },
  { value: "DRAFT", label: "Draft" },
  { value: "PUBLISHED", label: "Published" },
  { value: "ARCHIVED", label: "Archived" },
];

// Table columns
const columns: TableColumn<Category>[] = [
  {
    accessorKey: "name",
    header: t("tableColumn.category_name") || "Name",
  },
  {
    accessorKey: "slug",
    header: t("label.slug") || "Slug",
  },
  {
    accessorKey: "status",
    header: t("label.status") || "Status",
  },
  {
    accessorKey: "postCount",
    header: t("tableColumn.category_posts") || "Posts",
  },
  {
    accessorKey: "actions",
    header: t("label.actions") || "Actions",
  },
];

// Fetch categories
const loadCategories = async () => {
  await fetchCategories({
    page: page.value,
    limit: limit.value,
    search: search.value || undefined,
    status: statusFilter.value || undefined,
  });
};

onMounted(loadCategories);

watch([search, statusFilter], () => {
  page.value = 1;
  loadCategories();
});

watch(page, loadCategories);

// Actions
const handleCreate = () => {
  selectedCategory.value = null;
  formModalOpen.value = true;
};

const handleEdit = (category: Category) => {
  selectedCategory.value = category;
  formModalOpen.value = true;
};

const handleDeleteClick = (category: Category) => {
  selectedCategory.value = category;
  deleteModalOpen.value = true;
};

const handleFormSubmit = async (data: any) => {
  try {
    formLoading.value = true;
    if (selectedCategory.value) {
      await updateCategory(selectedCategory.value.id, data);
    } else {
      await createCategory(data);
    }
    formModalOpen.value = false;
    await loadCategories();
  } finally {
    formLoading.value = false;
  }
};

const handleDeleteConfirm = async () => {
  if (!selectedCategory.value) return;

  try {
    deleteLoading.value = true;
    await deleteCategory(selectedCategory.value.id);
    deleteModalOpen.value = false;
    selectedCategory.value = null;
  } finally {
    deleteLoading.value = false;
  }
};

// Breadcrumbs
const breadcrumbs = [
  { label: t("label.dashboard") || "Dashboard", to: "/admin" },
  { label: t("label.categories") || "Categories" },
];
</script>

<template>
  <div>
    <AdminPageHeader
      :title="t('label.categories') || 'Categories'"
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
          <USelect
            v-model="statusFilter"
            :items="statusOptions"
            class="w-full sm:w-40"
          />
        </div>
      </template>

      <!-- Table -->
      <UTable :data="categories" :columns="columns" :loading="loading">
        <template #name-cell="{ row }">
          <div class="flex items-center gap-3">
            <img
              v-if="row.original.coverImage"
              :src="row.original.coverImage"
              :alt="row.original.name"
              class="w-10 h-10 rounded object-cover"
            />
            <div
              v-else
              class="w-10 h-10 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
            >
              <UIcon name="i-lucide-folder" class="w-5 h-5 text-gray-400" />
            </div>
            <span class="font-medium">{{ row.original.name }}</span>
          </div>
        </template>

        <template #slug-cell="{ row }">
          <code class="text-sm text-gray-500">{{ row.original.slug }}</code>
        </template>

        <template #status-cell="{ row }">
          <StatusBadge :status="row.original.status" />
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
                :disabled="row.original.postCount > 0"
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
    <CategoryFormModal
      v-model:open="formModalOpen"
      :category="selectedCategory"
      :loading="formLoading"
      @submit="handleFormSubmit"
    />

    <!-- Delete confirmation modal -->
    <ConfirmDeleteModal
      v-model:open="deleteModalOpen"
      :loading="deleteLoading"
      :title="t('label.delete_category') || 'Delete Category'"
      :message="t('message.confirm_delete_message', {name: selectedCategory?.name}) || 'Are you sure you want to delete this item? This action cannot be undone.'"
      @confirm="handleDeleteConfirm"
    />
  </div>
</template>
