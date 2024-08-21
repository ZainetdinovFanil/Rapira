<template>
  <div class="flex gap-[10px] items-center md:w-[400px] px-[10px]">
    <img class="w-[14px] h-[14px]" alt="search" src="@/assets/search.svg" />
    <BaseInput
      v-model="searchText"
      :placeholder="'Поиск'"
      @enterClick="$emit('enterClick')"
    ></BaseInput>
  </div>
</template>
  
<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch } from "vue";
import BaseInput from "./BaseInput.vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue", "enterClick"]);

const searchText = ref(props.modelValue);

watch(searchText, (newValue) => {
  emit("update:modelValue", newValue);
});
watch(
  () => props.modelValue,
  (newValue) => {
    //проверка пропса
    searchText.value = newValue;
  }
);
</script>
  