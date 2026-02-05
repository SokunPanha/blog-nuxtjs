<script setup lang="ts">
interface NavItemsType {
  name: string;
  path: string;
}
interface OptionsType {
  horizontal?: boolean;
  keepNavItems?: boolean;
}
const props = defineProps<{
  navItems: NavItemsType[];
  options?: OptionsType;
}>();
const options = computed(() => {
  return {
    horizontal: false,
    keepNavItems: true,
    ...props.options,
  };
});

const navItemsStyle = computed(() => {
  return options.value.horizontal
    ? "flex flex-row gap-4 items-center "
    : "flex flex-col gap-2 items-center p-3 ";
});
</script>

<template>
  <ul  :class="navItemsStyle">
    <li
      v-if="options.keepNavItems"
      v-for="item in props.navItems"
      :key="item.name"
      :class="{
        'p-2 block w-full text-center cursor-pointer': !options.horizontal,
        'hidden sm:block': options.horizontal,
      }"
    >
      <NuxtLink :to="item.path">{{ $t(item.name) }}</NuxtLink>
    </li>
    <li>
      <slot name="appendRight"></slot>
    </li>
  </ul>
</template>
