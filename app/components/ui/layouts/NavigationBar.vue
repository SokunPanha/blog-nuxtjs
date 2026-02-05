<script setup lang="ts">
const navItems = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "about",
    path: "/about",
  },
];
</script>

<template>
  <header class="sticky top-0 z-50 bg-white dark:bg-black">
    <nav class="flex justify-between items-center w-full p-3 shadow-xl">
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
        <NuxtLink to="/" >
          <NuxtImg
            width="30"
            height="30"
            src="https://tse2.mm.bing.net/th/id/OIP.EUcT3At_FySw_WBbukRvGgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
            alt=""
          />
        </NuxtLink>
      </div>

      <NavItems class="" :nav-items="navItems" :options="{ horizontal: true }">
        <template #appendRight>
          <div class="flex gap-2 items-center">
            <NuxtLink
              class="bg-black text-white dark:text-black dark:bg-white rounded-full px-2 py-1"
              to="/contact"
              >{{ $t("buy_me_a_coffee") }}</NuxtLink
            >
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </template>
      </NavItems>
    </nav>
  </header>
</template>
