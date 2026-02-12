<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
import { useBlogAuth } from "~/composables/blog/useBlogAuth";

const { t } = useI18n();

const isSignInOpen = ref(false);
const { fetch, loggedIn, user, logout } = useBlogAuth();


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
    <ClientOnly>
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
            <OauthCard />
          </template>
        </UModal>
      </template>

      <template #fallback>
        <USkeleton class="h-8 w-20" />
      </template>
    </ClientOnly>
  </div>
</template>
