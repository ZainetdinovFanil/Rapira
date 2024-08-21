<template>
  <div class="relative">
    <BaseBurger v-model="checked"></BaseBurger>
    <div
      :class="checked ? 'h-[75px]  p-1' : 'h-[0px] px-1 py-0'"
      class="z-[1] rounded-sm duration-300 absolute b-[-35px] l-[-3px] bg-black overflow-hidden top-[70px] left-[-23px]"
    >
      <nav>
        <ul>
          <router-link
            :to="router.route"
            v-for="router in routers"
            :key="router.id"
          >
            <li
              class="h-8 flex items-center text-customGray py-[8px] px-[14px]"
              :class="{
                'bg-[rgba(255,255,255,0.1)] rounded-[5px] text-darkBlue':
                  router.route == $route.path,
              }"
              @click="checked = false"
            >
              {{ router.string }}
            </li>
          </router-link>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps } from "vue";
import BaseBurger from "@/components/base/BaseBurger.vue";
const props = defineProps({
  routers: {
    type: Array,
    default: () => [],
  },
});
const checked = ref(false);
</script>