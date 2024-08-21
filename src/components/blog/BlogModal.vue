<template>
  <BaseModal :show-modal="showModal" :radius="8" @closeModal="closeModal">
    <div
      class="flex flex-col justify-start p-[15px] w-screen md:w-auto font-inter max-w-[630px]"
    >
      <div class="flex items-start justify-between">
        <h3
          class="leading-[20px] text-[20px] md:leading-[24px] md:text-[24px] font-semibold text-start mb-[10px] max-h-[56px] text-ellipsis-multiline"
        >
          {{ getPost.title }}
        </h3>
        <img
          class="cursor-pointer w-[20px] h-[20px]"
          alt="close"
          src="@/assets/close.svg"
          @click="closeModal"
        />
      </div>
      <div
        class="flex items-center gap-[10px] mb-[15px] text-mainGray leading-[12px] text-[12px] md:leading-[14px] md:text-[14px] font-medium"
      >
        <div>
          <p>{{ postDate }}</p>
        </div>
        <p>•</p>
        <div class="flex items-center gap-[4px]">
          <img class="w-[14px] h-[14px]" alt="clock" src="@/assets/clock.svg" />
          <p>{{ getPost.read_time }} мин</p>
        </div>
        <p>•</p>
        <div class="flex items-center gap-[4px]">
          <img
            class="w-[20px] h-[20px]"
            alt="message"
            src="@/assets/message.svg"
          />
          <p>{{ postComments }}</p>
        </div>
      </div>
      <div class="content_modal overflow-y-auto custom-scrollbar-thin">
        <img
          class="rounded-[12px] w-full mb-[15px] object-cover object-center cursor-pointer"
          alt="card-image"
          :src="getPost.image"
        />

        <div class="mb-[10px]">
          <p class="leading-[25px] text-[16px] font-medium text-start">
            {{ getPost.description }}
          </p>
        </div>
        <div class="flex items-center mb-[15px]">
          <span
            class="py-[4px] px-[16px] text-mainBlue leading-[14px] text-[14px] font-medium"
            v-for="tag in getPost.tags"
            :key="tag.id"
            >{{ tag.text }}</span
          >
        </div>
        <div>
          <p
            class="mb-[10px] text-start text-darkGray font-semibold leading-[16px] text-[16px]"
          >
            Комментариев
            <span class="font-medium text-mainGray">{{
              getPost?.comments.length
            }}</span>
          </p>
          <div>
            <div v-if="canComment">
              <div
                :class="
                  comment.length > 250 ? 'border-errorRed' : 'border-darkBlue'
                "
                class="flex items-start justify-between rounded-[6px] border-[1px] py-[10px] px-[15px] mb-[6px]"
              >
                <BaseTextarea
                  v-model="comment"
                  :placeholder="'Текст комментария'"
                  :resize="'none'"
                  :height="'111px'"
                >
                </BaseTextarea>
                <img
                  class="cursor-pointer w-[20px] h-[20px]"
                  alt="close"
                  src="@/assets/close.svg"
                  @click="comment = ''"
                />
              </div>
              <p
                class="text-start text-mainGray leading-[12px] text-[12px] mb-[10px]"
              >
                <span :class="comment.length > 250 ? 'text-errorRed' : null">{{
                  comment.length
                }}</span>
                из 250 символов
              </p>
              <div
                class="flex items-start gap-[10px] justify-end text-inter leading-[14px] text-[13px]"
              >
                <BaseButton
                  class="rounded-[6px] text-darkBlue font-bold"
                  :padding="'12px 14px'"
                  :border-radius="'6px'"
                  @click="clearTextarea"
                  >Отмена</BaseButton
                >
                <BaseButton
                  :class="
                    comment.length > 250
                      ? 'text-whiteGray cursor-auto'
                      : 'bg-darkBlue text-white'
                  "
                  class="rounded-[6px] font-semibold"
                  :padding="'12px 14px'"
                  :border-radius="'6px'"
                  @click="addComment"
                  >Опубликовать</BaseButton
                >
              </div>
            </div>
            <p
              v-else
              class="p-[15px] text-start text-whiteGray leading-[22px] text-[14px] cursor-pointer"
              @click="canComment = true"
            >
              Введите комментарий
            </p>
          </div>
          <template v-if="getPost?.comments">
            <BlogComment
              v-for="comment in getPost.comments"
              :key="comment.id"
              :comment="comment"
            ></BlogComment
          ></template>
        </div>
      </div>
    </div>
  </BaseModal>
</template>
  
<script lang="ts" setup>
import BaseModal from "../base/BaseModal.vue";
import BaseTextarea from "@/components/base/BaseTextarea.vue";
import BlogComment from "./BlogComment.vue";
import BaseButton from "../base/BaseButton.vue";
import { defineProps, defineEmits, computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
  postId: {
    type: Number,
    default: -1,
  },
});

const emit = defineEmits(["closeModal"]);

const months: string[] = [
  "Янв",
  "Фев",
  "Мар",
  "Апр",
  "Мая",
  "Июн",
  "Июл",
  "Авг",
  "Сен",
  "Окт",
  "Ноя",
  "Дек",
];
const comment = ref("");
const canComment = ref(false);
const postDate = computed(() => {
  const dateParts = getPost.value.date.split(" ")[0]?.split("-");
  const day = Number(dateParts[2]);
  const month = Number(dateParts[1]) - 1;
  return `${day} ${months[month]}`;
});

const postComments = ref(
  computed(() => {
    const commentsCount = getPost.value?.comments.length ?? 0;
    const lastDigit = commentsCount % 10;
    const lastTwoDigits = commentsCount % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
      return `${commentsCount} комментарий`;
    } else if (
      [2, 3, 4].includes(lastDigit) &&
      ![12, 13, 14].includes(lastTwoDigits)
    ) {
      return `${commentsCount} комментария`;
    } else {
      return `${commentsCount} комментариев`;
    }
  })
);

function closeModal() {
  console.log(3);
  emit("closeModal");
}
function clearTextarea() {
  comment.value = "";
  canComment.value = false;
}
function addComment() {
  addCommentAction()
  clearTextarea()
}
const addCommentAction = () => store.dispatch("addCommentAction",{comment:comment.value,post: getPost.value});

const getPost = computed(() => store.getters.getPost(props.postId));
</script>
<style scoped lang="sass">
.content_modal
  max-height: calc(90vh - 125px)
  overflow-y: auto
</style>
  