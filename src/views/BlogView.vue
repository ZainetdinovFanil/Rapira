<template>
  <div class="pb-[30px]">
    <div>
      <blog-filter class="mb-[10px] lg:mb-[20px]"></blog-filter>
      <BlogContent></BlogContent>
    </div>
  </div>
</template>
<script lang="ts" setup>
import BlogFilter from "@/components/blog/BlogFilter.vue";
import BlogContent from "@/components/blog/BlogContent.vue";
</script>
