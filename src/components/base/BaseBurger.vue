<template>
  <div>
    <input
      type="checkbox"
      id="burger-checkbox"
      class="burger-checkbox"
      :checked="modelValue"
      @change="changeValue"
    />
    <label class="burger" for="burger-checkbox"></label>
  </div>
</template>
  
<script lang="ts" setup>
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const changeValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.checked);
};
</script>
  
<style lang="sass" scoped>
.burger-checkbox
  position: absolute
  visibility: hidden

.burger
  transform: rotate(180deg)
  cursor: pointer
  display: block
  position: relative
  border: none
  background: transparent
  width: 40px
  height: 26px
  margin: 30px auto

.burger::before,
.burger::after
  content: ''
  left: 0
  position: absolute
  display: block
  width: 100%
  height: 4px
  border-radius: 10px
  background: #fff
  opacity: 0.3

.burger::before
  top: 0
  box-shadow: 0 11px 0 #fff
  transition: box-shadow .3s .15s, top .3s .15s, transform .3s

.burger::after
  bottom: 0
  opacity: 1
  transition: bottom .3s .15s, transform .3s

.burger-checkbox:checked + .burger::before
  opacity: 1
  top: 11px
  transform: rotate(45deg)
  box-shadow: 0 6px 0 rgba(0,0,0,0)
  transition: box-shadow .15s, top .3s, transform .3s .15s

.burger-checkbox:checked + .burger::after
  bottom: 11px
  transform: rotate(-45deg)
  transition: bottom .3s, transform .3s .15s
</style>
  