<script setup lang="ts">
const navItems = [
  {
    name: "home",
    path: "/",
  },
  // {
  //   name: "about",
  //   path: "/about",
  // },
];
</script>

<template>
  <header class="sticky top-0 z-50 bg-white dark:bg-black w-full shadow-xl">
    <nav class="flex justify-between items-center w-full p-3 max-w-7xl mx-auto">
      <div class="flex items-center gap-2">
        <UDrawer direction="bottom" class="sm:hidden">
          <UButton color="neutral" variant="ghost" icon="i-lucide-menu" />
          <template #content>
            <NavItems
              :nav-items="navItems"
              :options="{
                horizontal: false,
              }"
            />
          </template>
        </UDrawer>
        <NuxtLink
          class="font-bold text-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent"
          to="/"
        >
          Dev Hub
        </NuxtLink>
      </div>

      <NavItems class="" :nav-items="navItems" :options="{ horizontal: true }">
        <template #appendRight>
          <div class="flex gap-2 items-center">
            <!-- <NuxtLink
              class="bg-black text-white dark:text-black dark:bg-white rounded-full px-2 py-1"
              to="/contact"
              >{{ $t("buy_me_a_coffee") }}</NuxtLink
            > -->
            <LanguageSwitcher />
            <UColorModeButton />
            <AuthButtons />
          </div>
        </template>
      </NavItems>
    </nav>
  </header>
</template>
