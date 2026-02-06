<script setup lang="ts">
const categories = [
    {
        id: 1,
        name: 'Tailwind CSS',
        icon: 'i-simple-icons-tailwindcss',
    },
    {
        id: 2,
        name: 'Nuxt.js',
        icon: 'i-simple-icons-nuxtdotjs',
    },
    {
        id: 3,
        name: 'Vue.js',
        icon: 'i-simple-icons-vuedotjs',
    },
    {
        id: 4,
        name: 'React.js',
        icon: 'i-simple-icons-react',
    },
    {
        id: 5,
        name: 'Node.js',
        icon: 'i-simple-icons-nodedotjs',
    },
    {
        id: 6,
        name: 'Express.js',
        icon: 'i-simple-icons-express',
    },
]
</script>
<template>
    <section class="bg-gray-100 dark:bg-gray-800 py-4">
       <div class="flex flex-col gap-4 max-w-4xl mx-auto px-4">
         <div class="flex justify-between items-center">
            <p class=" font-semibold ">Browse Category</p>
            <NuxtLink to="/">View All ></NuxtLink>
        </div>
        <div class=" flex flex-nowrap overflow-x-auto  no-scrollbar gap-4 py-3">
            <NuxtLink v-for="category in categories" :key="category.id" :to="`/`"  class="p-2  shadow-md w-[150px] max-w-[200px] shrink-0 block ">
                <div class="flex flex-col items-center  gap-2">
                    <Icon :name="category.icon" />
                    <p>{{ category.name }}</p>
                </div>
            </NuxtLink>
            
        </div>
       </div>
    </section>
</template>