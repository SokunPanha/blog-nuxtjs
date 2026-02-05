<script setup lang="ts">
const { locale, setLocale } = useI18n()
import { APP_LOCALES } from '#shared/constants'
const currentFlag = computed(() => APP_LOCALES.find((l: any) => l.code === locale.value)?.flag)
function toggleLocale() {
  setLocale(locale.value === 'en' ? 'kh' : 'en')
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