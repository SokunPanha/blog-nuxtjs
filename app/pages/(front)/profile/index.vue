<script setup lang="ts">
definePageMeta({
  layout: "blog-layout",
});

const { t } = useI18n();
const localePath = useLocalePath();
const { user, fetch: fetchSession } = useBlogSession();
const toast = useToast();

// Redirect if not logged in
const { loggedIn } = useBlogSession();
onMounted(() => {
  if (!loggedIn.value) {
    navigateTo(localePath("/"));
  }
});

interface ProfileData {
  id: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  avatar: string | null;
  role: string;
  createdAt: string;
  accounts: { provider: string }[];
}

const { data, pending, refresh } = useFetch<{ data: ProfileData }>("/api/blog/v1/profile");
const profile = computed(() => data.value?.data ?? null);

// Form state
const form = reactive({
  firstName: "",
  lastName: "",
  username: "",
  avatar: "",
});

// Populate form when profile loads
watch(profile, (p) => {
  if (p) {
    form.firstName = p.firstName ?? "";
    form.lastName = p.lastName ?? "";
    form.username = p.username ?? "";
    form.avatar = p.avatar ?? "";
  }
}, { immediate: true });

const saving = ref(false);
const avatarUploading = ref(false);

async function saveProfile() {
  saving.value = true;
  try {
    await $fetch("/api/blog/v1/profile", {
      method: "PUT",
      body: {
        firstName: form.firstName || null,
        lastName: form.lastName || null,
        username: form.username,
        avatar: form.avatar || null,
      },
    });
    await refresh();
    await fetchSession();
    toast.add({ title: "Profile updated", color: "success" });
  } catch (err: any) {
    toast.add({ title: err.data?.message || "Failed to update profile", color: "error" });
  } finally {
    saving.value = false;
  }
}

async function uploadAvatar(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  avatarUploading.value = true;
  try {
    const formData = new FormData();
    formData.append("file", file);
    const result = await $fetch<{ data: { url: string } }>("/api/blog/v1/profile/avatar", {
      method: "POST",
      body: formData,
    });
    form.avatar = result.data.url;
    toast.add({ title: "Avatar uploaded", color: "success" });
  } catch (err: any) {
    toast.add({ title: err.data?.message || "Failed to upload avatar", color: "error" });
  } finally {
    avatarUploading.value = false;
    input.value = "";
  }
}

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

useHead({ title: "My Profile" });
</script>

<template>
  <main class="max-w-2xl mx-auto px-4 sm:px-6 py-12">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        {{ t("label.my_profile") || "My Profile" }}
      </h1>
      <p class="text-gray-500 mt-1">{{ t("message.profile_description") || "Manage your account information" }}</p>
    </div>

    <!-- Loading -->
    <div v-if="pending" class="animate-pulse space-y-4">
      <div class="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
      <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
      <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
      <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
    </div>

    <div v-else-if="profile" class="space-y-8">
      <!-- Avatar -->
      <div class="flex items-center gap-6">
        <div class="relative group">
          <UAvatar
            :src="form.avatar || undefined"
            :alt="profile.username"
            size="3xl"
            class="ring-2 ring-gray-200 dark:ring-gray-700"
          />
          <label
            class="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <UIcon v-if="!avatarUploading" name="i-lucide-camera" class="w-6 h-6 text-white" />
            <UIcon v-else name="i-lucide-loader" class="w-6 h-6 text-white animate-spin" />
            <input type="file" class="hidden" accept="image/*" @change="uploadAvatar" />
          </label>
        </div>
        <div>
          <p class="font-semibold text-lg text-gray-900 dark:text-white">{{ profile.username }}</p>
          <p class="text-sm text-gray-500">{{ profile.email }}</p>
          <div class="flex gap-2 mt-2">
            <UBadge color="primary" variant="subtle" size="xs">{{ profile.role }}</UBadge>
            <UBadge
              v-for="account in profile.accounts"
              :key="account.provider"
              color="neutral"
              variant="outline"
              size="xs"
            >
              {{ account.provider }}
            </UBadge>
          </div>
        </div>
      </div>

      <!-- Form -->
      <UCard>
        <template #header>
          <h2 class="font-semibold text-gray-900 dark:text-white">
            {{ t("label.personal_information") || "Personal Information" }}
          </h2>
        </template>

        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <UFormField :label="t('label.first_name') || 'First Name'">
              <UInput v-model="form.firstName" :placeholder="t('placeholder.first_name') || 'First name'" class="w-full" />
            </UFormField>
            <UFormField :label="t('label.last_name') || 'Last Name'">
              <UInput v-model="form.lastName" :placeholder="t('placeholder.last_name') || 'Last name'" class="w-full" />
            </UFormField>
          </div>

          <UFormField :label="t('label.username') || 'Username'">
            <UInput v-model="form.username" :placeholder="t('placeholder.username') || 'Username'" class="w-full" />
          </UFormField>

          <UFormField :label="t('label.email') || 'Email'">
            <UInput :model-value="profile.email" disabled class="w-full" />
            <template #hint>
              <span class="text-xs text-gray-400">{{ t("message.email_managed_by_oauth") || "Managed by your OAuth provider" }}</span>
            </template>
          </UFormField>
        </div>

        <template #footer>
          <div class="flex items-center justify-between">
            <p class="text-xs text-gray-400">
              {{ t("label.member_since") || "Member since" }} {{ formatDate(profile.createdAt) }}
            </p>
            <UButton :loading="saving" @click="saveProfile">
              {{ t("label.save_changes") || "Save Changes" }}
            </UButton>
          </div>
        </template>
      </UCard>
    </div>
  </main>
</template>
