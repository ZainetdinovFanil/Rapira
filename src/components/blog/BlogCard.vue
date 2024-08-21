<template>
  <div
    class="flex-1 flex flex-col justify-start h-auto md:h-[412px] lg:h-[442px] min-w-full md:min-w-[calc(50%-20px)] md:max-w-[calc(50%-20px)] lg:min-w-[calc(33.333%-20px)] lg:max-w-[calc(33.333%-20px)]"
  >
    <img
      class="rounded-[12px] h-[200px] lg:h-[250px] mb-[10px] object-cover object-center cursor-pointer"
      alt="card-image"
      :src="post.image"
      @click="openModal(post.id)"
    />
    <div
      class="flex items-center gap-[10px] mb-[10px] text-mainGray leading-[14px] text-[14px] font-inter font-medium"
    >
      <div>
        <p>{{ postDateComputed }}</p>
      </div>
      <p>•</p>
      <div class="flex items-center gap-[4px]">
        <img class="w-[14px] h-[14px]" alt="clock" src="@/assets/clock.svg" />
        <p>{{ post.read_time }} мин</p>
      </div>
      <p>•</p>
      <div class="flex items-center gap-[4px]">
        <img
          class="w-[20px] h-[20px]"
          alt="message"
          src="@/assets/message.svg"
        />
        <p>{{ postComments }}</p>
      </div>
    </div>
    <div class="mb-[10px]">
      <h3
        class="leading-[28px] text-[22px] font-inter font-semibold text-start mb-[10px] max-h-[56px] text-ellipsis-multiline"
      >
      {{ post.title }}
      </h3>
      <p
        class="leading-[25px] text-[16px] font-inter font-medium text-start text-ellipsis-multiline"
      >
        {{ post.short_description }}
      </p>
    </div>
    <div class="flex items-center">
      <span
        class="py-[4px] px-[16px] text-mainBlue leading-[14px] text-[14px] font-inter font-medium"
        v-for="tag in post.tags"
        :key="tag.id"
        >{{ tag.text }}</span
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, computed, defineEmits } from "vue";
import { Post } from "@/types/types";
import { usePostDate } from '@/mixins/usePostDate';
const emit = defineEmits<{
  (e: "openModal", id: number): void;
}>();
const props = defineProps<{
  post: Post;
}>();
const postComments = ref(
  computed(() => {
    const commentsCount =  props.post.comments.length
    const lastDigit = commentsCount % 10;
    const lastTwoDigits = commentsCount % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
      return `${commentsCount} комментарий`;
    } else if (
      [2, 3, 4].includes(lastDigit) &&
      ![12, 13, 14].includes(lastTwoDigits)
    ) {
      return `${commentsCount} комментария`;
    } else {
      return `${commentsCount} комментариев`;
    }
  })
);
const openModal = (id: number) => {
  emit("openModal", id);
};
const { postDateComputed } = usePostDate(props.post.date);
</script>