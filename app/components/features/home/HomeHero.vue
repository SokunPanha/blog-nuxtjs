<template>
      <main class="grid py-10">
    <div
      class="flex max-w-4xl mx-auto flex-col md:flex-row md:justify-between items-center gap-4"
    >
      <section class=" ">
        <div class="md:p-0 p-10">
          <h1 class="text-4xl font-bold">{{ $t("welcome_to_my_blog") }}</h1>
          <p>{{ $t("welcome_to_my_blog_description") }}</p>
        </div>
      </section>
      <section class="">
        <NuxtImg
          class="md:w-[500px] w-[300px]"
          src="https://static.vecteezy.com/system/resources/previews/028/589/224/original/coding-3d-rendering-icon-illustration-free-png.png"
          alt=""
        />
      </section>
    </div>
  </main>
</template>