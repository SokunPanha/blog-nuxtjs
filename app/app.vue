<script setup lang="ts">
const NoneAdminLayoutPaht = ["/admin/auth/login"];
const route = useRoute();
const layoutName = computed(() => {
  if (route.path.startsWith('/admin') && !NoneAdminLayoutPaht.includes(route.path)) {
    return 'admin-layout'
  } else if (route.path.startsWith('/admin')) {
    return false
  } else if (route.path.startsWith('/blog')) {
    return false
  } else {
    return 'blog-layout'
  }
})
</script>

<template>
  <UApp :toaster="{ position: 'top-right' }">
    <NuxtLayout
      :name="layoutName"
    >
      <div class="relative min-h-screen">
        <NuxtPage />
      </div>
    </NuxtLayout>
  </UApp>
</template>
