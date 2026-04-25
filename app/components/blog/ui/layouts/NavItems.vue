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

const options = computed(() => ({
  horizontal: false,
  keepNavItems: true,
  ...props.options,
}));

const route = useRoute();
</script>

<template>
  <ul :class="options.horizontal ? 'flex flex-row gap-1 items-center' : 'flex flex-col gap-1 p-4'">
    <template v-if="options.keepNavItems">
      <li
        v-for="item in props.navItems"
        :key="item.name"
        :class="options.horizontal ? 'hidden sm:block' : 'w-full'"
      >
        <NuxtLink
          :to="item.path"
          :class="[
            'text-sm font-medium transition-colors duration-150 px-3 py-1.5 rounded-lg block',
            route.path === item.path
              ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50',
            !options.horizontal ? 'text-center' : '',
          ]"
        >
          {{ $t(item.name) }}
        </NuxtLink>
      </li>
    </template>
    <li>
      <slot name="appendRight" />
    </li>
  </ul>
</template>
