<template>
  <header
    class="w-full bg-black"
  >
  <div class="w-full flex items-center justify-start gap-[15px] lg:gap-[80px]  py-[15px] px-[22px] lg:px-[56px] h-[60px] max-w-[1288px] m-auto">
    <BurgerMenu class="lg:hidden" :routers="routers"></BurgerMenu>
    <router-link to="/">
      <img class="" alt="logo" src="@/assets/logo.svg" />
    </router-link>
    <nav class="hidden lg:block">
      <ul class="flex gap-[20px]">
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
          >
            {{ router.string }}
          </li>
        </router-link>
      </ul>
    </nav>
  </div>
  </header>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import BaseIcon from "../base/BaseIcon.vue";
import BurgerMenu from "@/components/layout/BurgerMenu.vue";

const routers = ref([
  { id: 0, route: "/main", string: "Главная" },
  { id: 1, route: "/blog", string: "Блог" },
]);
</script>
<style lang="sass" scoped>
</style>