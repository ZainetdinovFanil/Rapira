<template>
  <div class="textarea-input" @click="focusTextarea">
    <label
      class="textarea-input-label"
      :class="{ active: modelValue.length }"
      >{{ label }}</label
    >
    <textarea
      ref="textareaField"
      :placeholder="placeholder"
      class="textarea-input-field custom-scrollbar-none"
      :value="modelValue"
      @input="handleInput"
      :style="{ resize: resize, height: height }"
    ></textarea>
  </div>
</template>
  
<script lang="ts" setup>
import { ref, defineEmits, defineProps } from "vue";

const props = defineProps({
  placeholder: {
    type: String,
    default: "Введите текст",
  },
  resize: {
    type: String,
    default: "both",
  },
  height: {
    type: String,
    default: "auto",
  },
  modelValue: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const textareaField = ref<HTMLTextAreaElement | null>(null);

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  emit("update:modelValue", target.value);
};
const focusTextarea = () => {
  if (textareaField.value) {
    textareaField.value.focus();
  }
};

</script>
  
<style scoped lang="sass">
.textarea-input
  display: flex
  position: relative
  align-items: center
  width: 100%

  &-field
    border: none
    outline: none
    border-radius: 0px
    padding: 0
    width: 100%
    min-height: 20px
    max-height: 100%

    font-family: Inter
    font-size: 14px
    font-weight: 500
    line-height: 22px
    color: #181C32

    &::placeholder

      font-size: 12px
      line-height: 18px
    &-label
      font-family: Inter
      font-size: 12px
      font-weight: 400
      line-height: 18px
      color: #50b053
      position: absolute
      top: 2px
      opacity: 0
      left: 0
      transition: all 0.6s
    &.active
      top: -16px
      opacity: 1
</style>
  