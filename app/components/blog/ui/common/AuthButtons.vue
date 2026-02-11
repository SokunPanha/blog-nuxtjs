<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";

const { loggedIn, user, loginWithGithub, loginWithGoogle, logout } =
  useBlogAuth();
const { t } = useI18n();

const isSignInOpen = ref(false);

const userMenuItems = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: t("label.logout") || "Logout",
      icon: "i-lucide-log-out",
      onSelect: logout,
    },
  ],
]);
</script>

<template>
  <div class="flex items-center">
    <template v-if="loggedIn">
      <UDropdownMenu :items="userMenuItems" class="cursor-pointer">
        <UButton color="neutral" variant="ghost" class="gap-2">
          <UAvatar
            :src="user?.avatar || undefined"
            :alt="user?.username"
            size="sm"
          />
          <span class="hidden sm:inline text-sm font-medium">
            {{ user?.username }}
          </span>
          <UIcon name="i-lucide-chevron-down" class="w-4 h-4" />
        </UButton>
      </UDropdownMenu>
    </template>

    <template v-else>
      <UButton
        color="neutral"
        variant="ghost"
        icon="i-lucide-log-in"
        @click="isSignInOpen = true"
      >
        {{ t("label.sign_in") || "Sign In" }}
      </UButton>

      <UModal v-model:open="isSignInOpen">
        <template #content>
          <div class="p-6 flex flex-col items-center gap-6">
            <div class="text-center">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                {{ t("label.sign_in_with") || "Sign in with" }}
              </h2>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {{ t("message.choose_provider") || "Choose your preferred sign in method" }}
              </p>
            </div>

            <div class="flex flex-col gap-3 w-full max-w-xs">
              <UButton
                color="neutral"
                variant="outline"
                size="lg"
                icon="i-simple-icons-google"
                class="justify-center"
                @click="loginWithGoogle"
              >
                Google
              </UButton>
              <UButton
                color="neutral"
                variant="outline"
                size="lg"
                icon="i-simple-icons-github"
                class="justify-center"
                @click="loginWithGithub"
              >
                GitHub
              </UButton>
            </div>
          </div>
        </template>
      </UModal>
    </template>
  </div>
</template>