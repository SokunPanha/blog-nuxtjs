<script setup lang="ts">
const localePath = useLocalePath();
const navItems = [
  { name: "home", path: "/" },
  // { name: "about", path: "/about" },
];

const scrolled = ref(false)

onMounted(() => {
  const onScroll = () => { scrolled.value = window.scrollY > 8 }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full transition-all duration-300"
    :class="scrolled
      ? 'bg-white/85 dark:bg-gray-950/85 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-800/70'
      : 'bg-white dark:bg-gray-950 border-b border-transparent'"
  >
    <nav class="flex justify-between items-center w-full px-6 py-3 max-w-6xl mx-auto">

      <!-- Logo + mobile menu -->
      <div class="flex items-center gap-2">
        <UDrawer direction="bottom" class="sm:hidden">
          <UButton color="neutral" variant="ghost" icon="i-lucide-menu" size="sm" />
          <template #content>
            <NavItems :nav-items="navItems" :options="{ horizontal: false }" />
          </template>
        </UDrawer>

        <NuxtLink :to="localePath('/')" class="flex items-center gap-2.5 group">
          <UAvatar
            size="sm"
            src="/images/logo.jpg"
            alt="Logo"
            class="ring-2 ring-primary-100 dark:ring-primary-900/60 group-hover:ring-primary-300 dark:group-hover:ring-primary-600 transition-all duration-200"
          />
          <span class="font-bold text-lg tracking-tight text-gray-900 dark:text-white">Dev Hub</span>
        </NuxtLink>
      </div>

      <!-- Nav links + actions -->
      <NavItems :nav-items="navItems" :options="{ horizontal: true }">
        <template #appendRight>
          <div class="flex items-center gap-1">
            <LanguageSwitcher />
            <UColorModeButton />
            <div class="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1.5" aria-hidden="true" />
            <AuthButtons />
          </div>
        </template>
      </NavItems>

    </nav>
  </header>
</template>
