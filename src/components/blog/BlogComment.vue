<template>
  <div class="flex items-start p-[12px] gap-[12px]">
    <img
      class="rounded-[50%] h-[38px] w-[38px] object-cover object-center"
      alt="card-image"
      :src="comment.image"
      v-if="comment.image"
    />
    <div v-else class="h-[38px] w-[38px]"></div>
    <div class="text-start font-inter flex flex-col gap-[6px]">
        <p class="font-semibold leading-[16px] text-[16px] text-blackGray">{{comment.author}}</p>
        <p class="font-medium leading-[20px] text-[14px] text-">{{comment.text}}</p>
        <p class="font-medium leading-[12px] text-[12px] text-">{{postDate}}</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps,computed } from "vue";
const props = defineProps({
  comment: {
    type: Object,
    default: () => ({
      id: -1,
      image:'',
      author: "",
      date: "2024-04-09 14:54:00",
      text: "",
    }),
  },
});
const months: string[] = [
  "Янв",
  "Фев",
  "Мар",
  "Апр",
  "Мая",
  "Июн",
  "Июл",
  "Авг",
  "Сен",
  "Окт",
  "Ноя",
  "Дек",
];
const postDate = computed(() => {
  const dateString = props.comment.date;
  const [datePart, timePart] = dateString.split(' ');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hours, minutes, seconds] = timePart.split(':').map(Number);

  const date = new Date(year, month - 1, day, hours, minutes, seconds);

  const formattedDay = date.getDate().toString().padStart(2, '0');
  const formattedMonth = (date.getMonth() + 1).toString().padStart(2, '0');
  const formattedYear = date.getFullYear();
  const formattedHours = date.getHours().toString().padStart(2, '0');
  const formattedMinutes = date.getMinutes().toString().padStart(2, '0');

  return `${formattedDay}.${formattedMonth}.${formattedYear} в ${formattedHours}:${formattedMinutes}`;

});
</script>
