<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { Post } from "~/composables/admin/useAdminPosts";

definePageMeta({
  layout: "admin-layout",
});

const { t } = useI18n();
const router = useRouter();
const { posts, meta, loading, fetchPosts, deletePost } = useAdminPosts();

// State
const search = ref("");
const statusFilter = ref<string | undefined>(undefined);
const page = ref(1);
const limit = ref(10);

// Delete modal
const deleteModalOpen = ref(false);
const postToDelete = ref<Post | null>(null);
const deleteLoading = ref(false);

// Status options
const statusOptions = [
  { value: undefined, label: "All Status" },
  { value: "DRAFT", label: "Draft" },
  { value: "PUBLISHED", label: "Published" },
  { value: "ARCHIVED", label: "Archived" },
];

// Table columns
const columns: TableColumn<Post>[] = [
  {
    accessorKey: "title",
    header: t("tableColumn.post_title") || "Title",
  },
  {
    accessorKey: "author",
    header: t("tableColumn.post_author") || "Author",
  },
  {
    accessorKey: "categories",
    header: t("tableColumn.post_category") || "Categories",
  },
  {
    accessorKey: "status",
    header: t("tableColumn.post_status") || "Status",
  },
  {
    accessorKey: "createdAt",
    header: t("label.created_at") || "Created At",
  },
  {
    accessorKey: "actions",
    header: t("label.actions") || "Actions",
  },
];

// Fetch posts on mount and when filters change
const loadPosts = async () => {
  await fetchPosts({
    page: page.value,
    limit: limit.value,
    search: search.value || undefined,
    status: statusFilter.value || undefined,
  });
};

onMounted(loadPosts);

watch([search, statusFilter], () => {
  page.value = 1;
  loadPosts();
});

watch(page, loadPosts);

// Format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Actions
const handleCreate = () => {
  router.push("/admin/blog-management/blogs/create");
};

const handleEdit = (post: Post) => {
  router.push(`/admin/blog-management/blogs/${post.id}/edit`);
};

const handleDeleteClick = (post: Post) => {
  postToDelete.value = post;
  deleteModalOpen.value = true;
};

const handleDeleteConfirm = async () => {
  if (!postToDelete.value) return;

  try {
    deleteLoading.value = true;
    await deletePost(postToDelete.value.id);
    deleteModalOpen.value = false;
    postToDelete.value = null;
  } finally {
    deleteLoading.value = false;
  }
};

// Breadcrumbs
const breadcrumbs = [
  { label: t("label.dashboard") || "Dashboard", to: "/admin" },
  { label: t("label.blogs") || "Blogs" },
];
</script>

<template>
  <div>
    <AdminPageHeader
      :title="t('label.blogs') || 'Blogs'"
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
      <UTable :data="posts" :columns="columns" :loading="loading">
        <template #title-cell="{ row }">
          <div class="flex items-center gap-3">
            <img
              v-if="row.original.coverImage"
              :src="row.original.coverImage"
              :alt="row.original.title"
              class="w-12 h-12 rounded object-cover"
            />
            <div>
              <p class="font-medium">{{ row.original.title }}</p>
              <p class="text-sm text-gray-500 truncate max-w-xs">
                {{ row.original.excerpt || "No excerpt" }}
              </p>
            </div>
          </div>
        </template>

        <template #author-cell="{ row }">
          <div class="flex items-center gap-2">
            <UAvatar
              :src="row.original.author?.avatar || undefined"
              :alt="row.original.author?.username"
              size="xs"
            />
            <span>{{ row.original.author?.username }}</span>
          </div>
        </template>

        <template #categories-cell="{ row }">
          <div class="flex flex-wrap gap-1">
            <UBadge
              v-for="cat in row.original.categories?.slice(0, 2)"
              :key="cat.id"
              color="primary"
              variant="subtle"
              size="xs"
            >
              {{ cat.name }}
            </UBadge>
            <UBadge
              v-if="row.original.categories?.length > 2"
              color="neutral"
              variant="subtle"
              size="xs"
            >
              +{{ row.original.categories.length - 2 }}
            </UBadge>
          </div>
        </template>

        <template #status-cell="{ row }">
          <StatusBadge :status="row.original.status" />
        </template>

        <template #createdAt-cell="{ row }">
          {{ formatDate(row.original.createdAt) }}
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

    <!-- Delete confirmation modal -->
    <ConfirmDeleteModal
      v-model:open="deleteModalOpen"
      :loading="deleteLoading"
      :title="t('label.delete_post') || 'Delete Post'"
      :message="
        t('message.confirm_delete_message', { name: postToDelete?.title }) ||
        'Are you sure you want to delete this item? This action cannot be undone.'
      "
      @confirm="handleDeleteConfirm"
    />
  </div>
</template>
