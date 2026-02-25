<script setup lang="ts">
import { APP_LOCALES } from '#shared/constants'
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const currentFlag = computed(() => APP_LOCALES.find((l: any) => l.code === locale.value)?.flag)
function toggleLocale() {
  const next = locale.value === 'en' ? 'kh' : 'en'
  navigateTo(switchLocalePath(next))
}
</script>

<template>
  <UButton
  class="cursor-pointer"
    variant="ghost"
    color="neutral"
    @click="toggleLocale"
  >
    <span class="text-lg leading-none">{{ currentFlag }}</span>
  </UButton>
</template>