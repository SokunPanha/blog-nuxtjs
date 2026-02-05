<script setup lang="ts">
import { homeBlogSectionData } from "#shared/constants/mockData";
definePageMeta({
  layout: "blog-layout",
});


</script>

<template>
  <HomeHero />
  <HomeBrowseCategory />
  <HomeBlogSection
    v-for="section in homeBlogSectionData"
    :blogs="section.blogs"
    :section-title="section.title"
    :view-all-path="section.viewAllPath"
  />
  
</template>
