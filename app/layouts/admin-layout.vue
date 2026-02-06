<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
import { useAuth } from "~/compossables/useAuth";

const { logOut } = useAuth();
const { user } = useUserSession();

const isSidebarOpen = ref(false);
const isSidebarCollapsed = ref(false);

const navigation = [
  {
    label: "Dashboard",
    icon: "i-lucide-layout-dashboard",
    to: "/admin",
  },
  {
    label: "Posts",
    icon: "i-lucide-file-text",
    to: "/admin/posts",
  },
  {
    label: "Categories",
    icon: "i-lucide-folder",
    to: "/admin/categories",
  },
  {
    label: "Users",
    icon: "i-lucide-users",
    to: "/admin/users",
  },
  {
    label: "Settings",
    icon: "i-lucide-settings",
    to: "/admin/settings",
  },
];

const userMenuItems: DropdownMenuItem[][] = [
  [
    {
      label: "Profile",
      icon: "i-lucide-user",
      to: "/admin/profile",
    },
    {
      label: "Settings",
      icon: "i-lucide-settings",
      to: "/admin/settings",
    },
  ],
  [
    {
      label: "Logout",
      icon: "i-lucide-log-out",
      onSelect: logOut,
    },
  ],
];
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Mobile sidebar overlay -->
    <USlideover v-model:open="isSidebarOpen" side="left" class="lg:hidden">
      <template #content>
        <div class="flex flex-col h-full bg-white dark:bg-gray-800">
          <!-- Mobile sidebar header -->
          <div
            class="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700"
          >
            <span class="text-xl font-bold text-gray-900 dark:text-white">
              Admin
            </span>
            <UButton
              icon="i-lucide-x"
              color="neutral"
              variant="ghost"
              @click="isSidebarOpen = false"
            />
          </div>

          <!-- Mobile navigation -->
          <nav class="flex-1 px-2 py-4 overflow-y-auto">
            <UNavigationMenu
              :items="navigation"
              orientation="vertical"
              @click="isSidebarOpen = false"
            />
          </nav>
        </div>
      </template>
    </USlideover>

    <!-- Desktop sidebar -->
    <aside
      class="fixed inset-y-0 left-0 z-30 hidden bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 lg:flex lg:flex-col transition-all duration-300"
      :class="isSidebarCollapsed ? 'w-16' : 'w-64'"
    >
      <!-- Sidebar header -->
      <div
        class="flex items-center h-16 border-b border-gray-200 dark:border-gray-700"
        :class="isSidebarCollapsed ? 'justify-center px-2' : 'px-6'"
      >
        <NuxtLink
          v-if="!isSidebarCollapsed"
          to="/admin"
          class="text-xl font-bold text-gray-900 dark:text-white"
        >
          Admin Panel
        </NuxtLink>
        <UIcon
          v-else
          name="i-lucide-layout-dashboard"
          class="w-6 h-6 text-gray-900 dark:text-white"
        />
      </div>

      <!-- Desktop navigation -->
      <nav class="flex-1 px-3 py-4 overflow-y-auto">
        <UNavigationMenu
          :collapsed="isSidebarCollapsed"
          :items="navigation"
          orientation="vertical"
        />
      </nav>

      <!-- Collapse toggle button -->
      <div class="p-3 border-t border-gray-200 dark:border-gray-700">
        <UButton
          :icon="
            isSidebarCollapsed
              ? 'i-lucide-chevrons-right'
              : 'i-lucide-chevrons-left'
          "
          color="neutral"
          variant="ghost"
          block
          @click="isSidebarCollapsed = !isSidebarCollapsed"
        />
      </div>
    </aside>

    <!-- Main content area -->
    <div
      class="transition-all duration-300"
      :class="isSidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'"
    >
      <!-- Top header -->
      <header
        class="sticky top-0 z-20 flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 sm:px-6"
      >
        <!-- Mobile menu button -->
        <UButton
          icon="i-lucide-menu"
          color="neutral"
          variant="ghost"
          class="lg:hidden"
          @click="isSidebarOpen = true"
        />

        <!-- Spacer for desktop -->
        <div class="hidden lg:block" />

        <!-- Right side actions -->
        <div class="flex items-center">
          <!-- Theme toggle -->
          <UColorModeButton />
          <LanguageSwitcher />

          <!-- User dropdown -->
          <UDropdownMenu :items="userMenuItems" class="cursor-pointer">
            <UButton color="neutral" variant="ghost" class="gap-2">
              <UAvatar
                :src="user?.avatar"
                :alt="user?.username"
                size="sm"
                icon="i-lucide-user"
              />
              <span class="hidden sm:inline text-sm font-medium">
                {{ user?.username || "User" }}
              </span>
              <UIcon name="i-lucide-chevron-down" class="w-4 h-4" />
            </UButton>
          </UDropdownMenu>
        </div>
      </header>

      <!-- Page content -->
      <main class="p-4 sm:p-6 lg:p-8">
        <slot />
      </main>
    </div>
  </div>
</template>
