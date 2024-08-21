<template>
  <div>
    <div
      class="px-0 lg:px-[45px] pt-[12px] pb-[10px] md:py-[20px] flex items-center justify-between"
    >
      <div class="flex items-center gap-[40px]">
        <h1 class="font-bold leading-8 text-[24px] lg:text-[32px] font-gilroy">
          Блог
        </h1>
        <BaseSearch class="hidden md:flex" v-model="searchText" @enterClick="postAction"></BaseSearch>
      </div>
      <div
        class="flex items-center justify-end gap-[10px] cursor-pointer"
        @click="showFilterToggle()"
      >
        <div :class="showFilter ? 'hidden' : 'block'">
          <p
            v-if="canTagsClear"
            @click.stop="resetTags"
            class="font-medium leading-[14px] md:leading-[16px] text-[14px] md:text-[16px] font-inter text-mainBlue"
          >
            Очистить
          </p>
          <p
            v-else
            class="font-medium leading-[14px] md:leading-[16px] text-[14px] md:text-[16px] font-inter text-filterGray"
          >
            Скрыть
          </p>
        </div>
        <div class="flex items-center justify-end gap-[4px]">
          <p
            class="font-medium leading-[14px] md:leading-[16px] text-[14px] md:text-[16px] font-inter text-filterGray"
          >
            Фильтр
          </p>
          <img
            :class="showFilter ? 'rotate-0' : 'rotate-180'"
            class="transition duration-500 w-[16px] h-[16px]"
            alt="arrow"
            src="@/assets/arrow.svg"
          />
        </div>
      </div>
    </div>
    <BaseSearch
      class="mb-[12px] flex md:hidden"
      v-model="searchText"
    ></BaseSearch>
    <div
      :class="
        showFilter
          ? 'max-h-[0px] py-0'
          : 'max-h-[4000px] py-[12px] lg:py-[20px]'
      "
      class="transition-all duration-200 flex items-center justify-start gap-[8px] flex-wrap overflow-hidden px-0 lg:px-[45px]"
    >
      <BlogSelect
        v-for="filterItem in filterItems"
        :key="filterItem.id"
        :text="filterItem.text"
        :selected="filterItem.selected"
        @click="toggleTag(filterItem)"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import BaseSearch from "../base/BaseSearch.vue";
import BlogSelect from "./BlogSelect.vue";
const store = useStore();
const canTagsClear = ref(
  computed(() => store.getters.canTagsClear)
);
onMounted(() => {
    tagsAction();
});

const filterItems = ref(computed(() => store.state.tags));

const tagsAction = () => store.dispatch("tagsAction");
const postAction = () => store.dispatch("postAction",searchText.value);

const toggleTag = (id: object) => {
  store.commit("toggleTag", id);
  postAction() //запрос после выбор тега
};
const resetTags = () => { //нужно ли сбрасывать поле ввода?
  store.commit("resetTags");
  postAction() //запрос после сброса тегов
};

const showFilter = ref(false);
const searchText = ref("");

const showFilterToggle = () => {
  showFilter.value = !showFilter.value;
}
</script>