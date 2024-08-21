
import { computed } from 'vue';

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

export function usePostDate(postDate: string) {
  const postDateComputed = computed(() => {
    console.log(postDate);
    
    if (!postDate) {
      return ''
    }
    const dateParts = postDate.split(" ")[0]?.split("-");
    const day = Number(dateParts[2]);
    const month = Number(dateParts[1]) - 1;
    return `${day} ${months[month]}`;
  });

  return {
    postDateComputed,
  };
}