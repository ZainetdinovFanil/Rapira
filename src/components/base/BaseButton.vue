<template>
  <button
    class="button"
    :style="'padding:' + padding + ';border-radius:' + borderRadius"
  >
    <slot v-if="loader"></slot>
    <span v-else class="loader"></span>
  </button>
</template>
  
<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  padding: {
    type: String,
    default: "0px",
  },
  borderRadius: {
    type: String,
    default: "0px",
  },
  loader: {
    type: Boolean,
    default: true,
  },
});
</script>
  
<style scoped lang="sass">
.button
  border-width: 0
  position: relative
  display: flex
  align-items: center
  justify-content: center
  .loader
    width: 20px
    height: 20px
    border-radius: 50%
    display: inline-block
    border-top: 3px solid #FFF
    border-right: 3px solid transparent
    box-sizing: border-box
    animation: rotation 1s linear infinite

    @keyframes rotation
      0%
        transform: rotate(0deg)

      100%
        transform: rotate(360deg)
</style>
  