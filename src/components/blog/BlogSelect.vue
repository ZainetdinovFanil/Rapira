<template>
  <div
    :class="selected ? 'bg-darkBlue' : ''"
    class="flex items-center justify-start gap-[6px] py-[6px] px-[14px] rounded-[20px] cursor-pointer"
  >
    <div
      :class="selected ? 'text-white' : 'text-mainBlue'"
      class="family-inter leading-[14px] md:leading-[16px] text-[14px] md:text-[16px]"
    >
      {{ text }}
    </div>
    <div class="flex items-center justify-center">
      <img
        v-if="selected"
        class="w-[16px] lg:w-[20px] h-[16px] lg:h-[20px]"
        alt="search"
        src="@/assets/blueCheckbox.svg"
      />
      <img
        v-else
        class="w-[16px] lg:w-[20px] h-[16px] lg:h-[20px]"
        alt="search"
        src="@/assets/whitePlus.svg"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
const props = defineProps({
  selected: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: "",
  },
});
</script>
