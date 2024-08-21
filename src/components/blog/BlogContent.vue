<template>
  <div
    class="flex items-center justify-between flex-wrap gap-x-[20px] gap-y-[25px] md:gap-y-[25px] lg:gap-y-[40px] p-[15px] lg:p-[30px]"
  >
    <template v-if="posts.length">
      <BlogCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @openModal="openModal"
      ></BlogCard>
    </template>
    <template v-else>
      <BlogCleared></BlogCleared>
    </template>
    <BlogModal
      :postId="activePostId"
      :show-modal="showModal"
      @closeModal="closeModal"
    ></BlogModal>
  </div>
</template>
  
  <script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import BlogCard from "./BlogCard.vue";
import BlogCleared from "./BlogCleared.vue";
import BlogModal from "./BlogModal.vue";

const store = useStore();

const posts = ref(computed(() => store.state.posts));

onMounted(() => {
  postAction(); // запрос
});

const activePostId = ref(-1);
const showModal = ref(false);

const closeModal = () => {
  console.log(4);
  showModal.value = false;
};

const openModal = (id: number) => {
  showModal.value = true;
  activePostId.value = id;
};

const postAction = () => store.dispatch("postAction");
</script>
  