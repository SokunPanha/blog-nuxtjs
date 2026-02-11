<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { User } from "~~/app/composables/useAdminUsers";

definePageMeta({
  layout: "admin-layout",
});

const { t } = useI18n();
const { users, meta, loading, fetchUsers, updateUser, deleteUser } =
  useAdminUsers();

// State
const search = ref("");
const roleFilter = ref<string | undefined>(undefined);
const page = ref(1);
const limit = ref(10);

// Modal state
const formModalOpen = ref(false);
const deleteModalOpen = ref(false);
const selectedUser = ref<User | null>(null);
const formLoading = ref(false);
const deleteLoading = ref(false);

// Role options
const roleOptions = [
  { value: undefined, label: "All Roles" },
  { value: "ADMIN", label: "Admin" },
  { value: "AUTHOR", label: "Author" },
  { value: "USER", label: "User" },
];

// Table columns
const columns: TableColumn<User>[] = [
  {
    accessorKey: "user",
    header: t("tableColumn.user_username") || "User",
  },
  {
    accessorKey: "email",
    header: t("tableColumn.user_email") || "Email",
  },
  {
    accessorKey: "role",
    header: t("tableColumn.user_role") || "Role",
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

// Fetch users
const loadUsers = async () => {
  await fetchUsers({
    page: page.value,
    limit: limit.value,
    search: search.value || undefined,
    role: roleFilter.value || undefined,
  });
};

onMounted(loadUsers);

watch([search, roleFilter], () => {
  page.value = 1;
  loadUsers();
});

watch(page, loadUsers);

// Format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Get role badge color
const getRoleColor = (role: string) => {
  switch (role) {
    case "ADMIN":
      return "error";
    case "AUTHOR":
      return "primary";
    default:
      return "neutral";
  }
};

// Actions
const handleEdit = (user: User) => {
  selectedUser.value = user;
  formModalOpen.value = true;
};

const handleDeleteClick = (user: User) => {
  selectedUser.value = user;
  deleteModalOpen.value = true;
};

const handleFormSubmit = async (data: any) => {
  if (!selectedUser.value) return;

  try {
    formLoading.value = true;
    await updateUser(selectedUser.value.id, data);
    formModalOpen.value = false;
    await loadUsers();
  } finally {
    formLoading.value = false;
  }
};

const handleDeleteConfirm = async () => {
  if (!selectedUser.value) return;

  try {
    deleteLoading.value = true;
    await deleteUser(selectedUser.value.id);
    deleteModalOpen.value = false;
    selectedUser.value = null;
  } finally {
    deleteLoading.value = false;
  }
};

// Breadcrumbs
const breadcrumbs = [
  { label: t("label.dashboard") || "Dashboard", to: "/admin" },
  { label: t("label.users") || "Users" },
];
</script>

<template>
  <div>
    <AdminPageHeader
      :title="t('label.users') || 'Users'"
      :breadcrumbs="breadcrumbs"
    />

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
            v-model="roleFilter"
            :items="roleOptions"
            class="w-full sm:w-40"
          />
        </div>
      </template>

      <!-- Table -->
      <UTable :data="users" :columns="columns" :loading="loading">
        <template #user-cell="{ row }">
          <div class="flex items-center gap-3">
            <UAvatar
              :src="row.original.avatar || undefined"
              :alt="row.original.username"
              size="sm"
            />
            <div>
              <p class="font-medium">{{ row.original.username }}</p>
              <p class="text-sm text-gray-500">
                {{ row.original.firstName }} {{ row.original.lastName }}
              </p>
            </div>
          </div>
        </template>

        <template #email-cell="{ row }">
          {{ row.original.email }}
        </template>

        <template #role-cell="{ row }">
          <UBadge :color="getRoleColor(row.original.role)" variant="subtle">
            {{ row.original.role }}
          </UBadge>
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
    <UserFormModal
      v-model:open="formModalOpen"
      :user="selectedUser"
      :loading="formLoading"
      @submit="handleFormSubmit"
    />

    <!-- Delete confirmation modal -->
    <ConfirmDeleteModal
      v-model:open="deleteModalOpen"
      :loading="deleteLoading"
      :title="t('label.delete_user') || 'Delete User'"
      :message="t('message.confirm_delete_message', {name: selectedUser?.username}) || 'Are you sure you want to delete this item? This action cannot be undone.'"
      @confirm="handleDeleteConfirm"
    />
  </div>
</template>
