<template>
  <div class="string-input" @click="focusInput">
    <label
      class="string-input-label"
      :class="modelValue.length ? 'active' : ''"
      >{{ computedLabel }}</label
    >
    <input
      ref="inputField"
      type="text"
      :readonly="readonly"
      :value="modelValue"
      @input="handleInput"
      @keyup.enter="$emit('enterClick')"
      :placeholder="placeholder"
      class="string-input-field"
      :style="'font-size:' + fontSize + 'px; line-height:' + lineHeight + 'px;'"
    />
    <!--  <div v-if="error" class="string-input-error">{{ error }}</div> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  placeholder: {
    type: String,
    default: "Введите текст",
  },
  modelValue: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  fontSize: {
    type: Number,
    default: 13,
    required: false,
  },
  lineHeight: {
    type: Number,
    default: 14,
    required: false,
  },
  /*   error: {
    type: String,
    default: "",
  }, */
});

const emit = defineEmits(["update:modelValue", "enterClick"]);

const computedLabel = computed(() => {
  return props.label;
});

const inputField = ref<HTMLInputElement | null>(null);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
const focusInput = () => {
  if (inputField.value) {
    inputField.value.focus();
  }
};
</script>
<style scoped lang="sass">
.string-input
  display: flex
  align-items: center
  width: 100%
  position: relative

  &-field
    border: none
    outline: none
    border-radius: 0px
    padding: 0
    width: 100%
    height: 40px
    cursor: pointer
    font-family: Inter
    font-weight: 500
    &::placeholder
      color: #7E8299

    &-label
      font-family: Roboto
      font-size: 12px
      font-weight: 400
      line-height: 18px
      color: #50b053
      position: absolute
      top: 12px
      opacity: 0
      left: 0
      transition: all 0.6s
      &.active
        top: -3px
        opacity: 1

    &-error
      font-family: Roboto
      font-size: 12px
      font-weight: 400
      line-height: 18px
      color: red
      position: absolute
      top: 28px
      left: 0
      height: 18px
      overflow: hidden
      text-overflow: ellipsis
      white-space: nowrap
      width: 100%
</style>
