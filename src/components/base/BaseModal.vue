<template>
  <div
    v-if="showModal || isAnimating"
    :class="['modal-shadow', { 'fade-out': !showModal }]"
    @click.self="closeModal"
  >
    <div
      class="modal max-h-screen md: max-h-[90vh]"
      :class="{ 'fade-in': showModal }"
      :style="'border-radius:' + radius + 'px'"
      @animationend="handleAnimationEnd"
    >
      <slot></slot>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import { ref, watch, defineProps, defineEmits, withDefaults } from "vue";

interface Props {
  radius: number;
  showModal: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  radius: 8,
  showModal: false,
});

const emit = defineEmits<{
  (e: "closeModal"): void;
}>();

const isAnimating = ref(false);

const disableScroll = () => {
  const scrollbarWidth = window.innerWidth - document.body.clientWidth;
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${scrollbarWidth}px`;
};
const enableScroll = () => {
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
};
const closeModal = () => {
  emit("closeModal");
};
const handleAnimationEnd = () => {
  if (!props.showModal) {
    isAnimating.value = false;
  }
};

watch(
  () => props.showModal,
  (newVal: boolean) => {
    if (newVal) {
      disableScroll();
    } else {
      enableScroll();
    }
    if (!newVal) {
      isAnimating.value = true;
    }
  }
);
</script>

  

<style scoped lang="sass">
.modal-shadow
  z-index: 10
  position: fixed
  top: 0
  left: 0
  min-height: 100%
  width: 100%
  background: rgba(0, 0, 0, 0.20)
  opacity: 0
  animation: fadeInBackground 0.3s forwards

.modal-shadow.fade-out
  animation: fadeOutBackground 0.3s forwards

.modal
  background: #fff
  max-width: 100%
  position: fixed
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  opacity: 0
  overflow: hidden

.modal.fade-in
  animation: fadeIn 0.3s forwards

@keyframes fadeIn
  0%
    opacity: 0
    transform: translate(-50%, -50%) scale(0.5)
  100%
    opacity: 1
    transform: translate(-50%, -50%) scale(1)

@keyframes fadeOut
  0%
    opacity: 1
    transform: translate(-50%, -50%) scale(1)
  100%
    opacity: 0
    transform: translate(-50%, -50%) scale(0.5)

@keyframes fadeInBackground
  0%
    opacity: 0
  100%
    opacity: 1

@keyframes fadeOutBackground
  0%
    opacity: 1
  100%
    opacity: 0

.modal-shadow.fade-out .modal
  animation: fadeOut 0.3s forwards
</style>