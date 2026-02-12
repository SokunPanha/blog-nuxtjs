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
 <Transition name="slide-down" appear>
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
          class="font-bold  flex items-center gap-2 text-xl  "
          to="/"
        >
         <UAvatar size="xl" src="/images/logo.jpg" alt="Logo" />
         <h1>Dev Hub</h1>
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
 </Transition>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
}

.slide-down-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
