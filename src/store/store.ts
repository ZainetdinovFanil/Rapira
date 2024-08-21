// src/store.ts
import { createStore } from 'vuex';

interface tag {
  id: number,
  text: string,
  selected: boolean
}
interface post{
  id: number,
  image: string,
  date: string,
  read_time: number,
  comments: object[],
  title: string,
  short_description: string,
  description: string,
  tags: {id:number, text: string}[]
}

interface State {
  tags: tag[],
  posts: post[]
}

const store = createStore<State>({
  state: {
    tags:[],
    posts:[]
  },
  getters: {
    getTags(state) {
      return state.tags;
    },
    getTagsActive(state){
      return state.tags.filter(el=>el.selected);
    },
    canTagsClear(state){
      const hasSelected = state.tags.some(el => {
        return el.selected;
      }); //если хоть один selected true, иначе вернет false
      return hasSelected;
    },
    getPost: (state) => (id: number) => {
      return state.posts.find(post => post.id === id);
    },
  },
  mutations: {
    setTags(state,data) {
      state.tags = data;
    },
    setPosts(state,data) {
      state.posts = data;
    },
    resetTags(state){
      state.tags.forEach(el=>{el.selected = false})
    },
    toggleTag(state,tag: tag){
     /*  tag.selected= !tag.selected; //ссылка на объект в store */
      const index = state.tags.findIndex(t => t.id === tag.id);
      if (index !== -1) {
        state.tags[index].selected = !state.tags[index].selected;
      }
    },
    addCommentHelper(state,data:{post:post,comment:string}){
      const index = state.posts.findIndex(post=> post.id === data.post.id);
      if (index !== -1) {
        state.posts[index].comments.unshift({id:data.post.comments[data.post.comments.length-1],text:data.comment,image: 'https://нашчат.рф/img/42.jpg?1619891588',author:'Аноним',date: new Date().toLocaleString('en-CA', { timeZoneName: 'short' }).replace(',', '')})
      }
    }
  },
  actions: {
    tagsAction({commit}){ //запрос 
      commit('setTags',[
        { id: 0, text: "Город", selected: false },
        { id: 1, text: "Природа", selected: false },
        { id: 2, text: "Люди", selected: false },
        { id: 3, text: "Животные", selected: false },
        { id: 4, text: "Еда", selected: false },
        { id: 5, text: "Напитки", selected: false },
        { id: 6, text: "Архитектура", selected: false },
        { id: 7, text: "Искусство", selected: false },
      ])
    },
    postAction({commit,getters},searchText: string){ // должен быть запрос а не эта логика 
      const posts = [
        { 
          id: 5 ,
          image: 'https://i.pinimg.com/736x/6e/0d/55/6e0d553afe2843c3d30f56a96fe34310.jpg',
          date: '2023-04-01 14:30:00',
          read_time: 4,
          comments: [],
          title: 'Семейные узы в дикой природе',
          short_description:'Наблюдая за этими сценами, наши фотографы чувствуют тепло и единство.',
          description: 'Каждое утро, когда я просыпаюсь в палатке, окружённой лесом и горами, я чувствую, как природа наполняет меня энергией. Величественные вершины, покрытые зелёными лесами, напоминают мне о том, как важно сохранять связь с природой. Каждый шаг по тропе — это не просто движение вперёд, это путешествие внутрь себя, где я нахожу вдохновение и силу. В такие моменты я понимаю, что настоящая красота мира скрыта в его простоте и величии.',
          tags: [{ id: 1, text: "Природа"},{ id: 2, text: "Люди"},{ id: 3, text: "Животные"}]
        },
        { 
          id: 4 ,
          image: 'https://i.pinimg.com/736x/6e/0d/55/6e0d553afe2843c3d30f56a96fe34310.jpg',
          date: '2023-04-03 14:30:00',
          read_time: 2,
          comments: [{id:0,image: 'https://i.pinimg.com/736x/6e/0d/55/6e0d553afe2843c3d30f56a96fe34310.jpg',author:'Мира Гусева',date:'2024-04-09 14:54:00',text:'Эти мгновения наполняют наши сердца радостью и любовью.'},{id:1,image: 'https://i.pinimg.com/736x/6e/0d/55/6e0d553afe2843c3d30f56a96fe34310.jpg',author:'Мира Гусева',date:'2024-04-09 15:54:00',text:'Эти мгновения наполняют наши сердца радостью и любовью.'}],
          title: 'Гармония городских и природных пейзажей ',
          short_description:'Этот вид напоминает нам о том, как природа и город могут сосуществовать в гармонии.',
          description: 'Каждое утро, когда я просыпаюсь в палатке, окружённой лесом и горами, я чувствую, как природа наполняет меня энергией. Величественные вершины, покрытые зелёными лесами, напоминают мне о том, как важно сохранять связь с природой. Каждый шаг по тропе — это не просто движение вперёд, это путешествие внутрь себя, где я нахожу вдохновение и силу. В такие моменты я понимаю, что настоящая красота мира скрыта в его простоте и величии.',
          tags: [{ id: 1, text: "Природа"},{ id: 7, text: "Искусство"}]
        },    
        { 
          id: 3 ,
          image: 'https://i.pinimg.com/736x/6e/0d/55/6e0d553afe2843c3d30f56a96fe34310.jpg',
          date: '2023-04-04 14:30:00',
          read_time: 15,
          comments: [{id:2,image: 'https://i.pinimg.com/736x/6e/0d/55/6e0d553afe2843c3d30f56a96fe34310.jpg',author:'Мира Гусева',date:'2024-04-09 14:54:00',text:'Эти мгновения наполняют наши сердца радостью и любовью.'},{id:3,image: 'https://i.pinimg.com/736x/6e/0d/55/6e0d553afe2843c3d30f56a96fe34310.jpg',author:'Мира Гусева',date:'2024-04-09 15:54:00',text:'Эти мгновения наполняют наши сердца радостью и любовью.'},{id:4,image: 'https://i.pinimg.com/736x/6e/0d/55/6e0d553afe2843c3d30f56a96fe34310.jpg',author:'Мира Гусева',date:'2024-04-09 14:54:00',text:'Эти мгновения наполняют наши сердца радостью и любовью.'},{id:5,image: 'https://i.pinimg.com/736x/6e/0d/55/6e0d553afe2843c3d30f56a96fe34310.jpg',author:'Мира Гусева',date:'2024-04-09 15:54:00',text:'Эти мгновения наполняют наши сердца радостью и любовью.'},{id:6,image: 'https://i.pinimg.com/736x/6e/0d/55/6e0d553afe2843c3d30f56a96fe34310.jpg',author:'Мира Гусева',date:'2024-04-09 14:54:00',text:'Эти мгновения наполняют наши сердца радостью и любовью.'},{id:7,image: 'https://i.pinimg.com/736x/6e/0d/55/6e0d553afe2843c3d30f56a96fe34310.jpg',author:'Мира Гусева',date:'2024-04-09 15:54:00',text:'Эти мгновения наполняют наши сердца радостью и любовью.'}],
          title: 'Семейные узы в дикой природе',
          short_description:'Наблюдая за этими сценами, наши фотографы чувствуют тепло и единство.',
          description: 'Каждое утро, когда я просыпаюсь в палатке, окружённой лесом и горами, я чувствую, как природа наполняет меня энергией. Величественные вершины, покрытые зелёными лесами, напоминают мне о том, как важно сохранять связь с природой. Каждый шаг по тропе — это не просто движение вперёд, это путешествие внутрь себя, где я нахожу вдохновение и силу. В такие моменты я понимаю, что настоящая красота мира скрыта в его простоте и величии.',
          tags: [{ id: 1, text: "Природа"},{ id: 3, text: "Животные"}]
        },
        { 
          id: 2 ,
          image: 'https://i.pinimg.com/736x/6e/0d/55/6e0d553afe2843c3d30f56a96fe34310.jpg',
          date: '2023-04-05 14:30:00',
          read_time: 3,
          comments: [{id:15,image: 'https://i.pinimg.com/736x/6e/0d/55/6e0d553afe2843c3d30f56a96fe34310.jpg',author:'Мира Гусева',date:'2024-04-09 14:54:00',text:'Эти мгновения наполняют наши сердца радостью и любовью.'},{id:16,image: 'https://i.pinimg.com/736x/6e/0d/55/6e0d553afe2843c3d30f56a96fe34310.jpg',author:'Мира Гусева',date:'2024-04-09 15:54:00',text:'Эти мгновения наполняют наши сердца радостью и любовью.'},{id:17,image: 'https://i.pinimg.com/736x/6e/0d/55/6e0d553afe2843c3d30f56a96fe34310.jpg',author:'Мира Гусева',date:'2024-04-09 14:54:00',text:'Эти мгновения наполняют наши сердца радостью и любовью.'},{id:18,image: 'https://i.pinimg.com/736x/6e/0d/55/6e0d553afe2843c3d30f56a96fe34310.jpg',author:'Мира Гусева',date:'2024-04-09 15:54:00',text:'Эти мгновения наполняют наши сердца радостью и любовью.'},{id:19,image: 'https://i.pinimg.com/736x/6e/0d/55/6e0d553afe2843c3d30f56a96fe34310.jpg',author:'Мира Гусева',date:'2024-04-09 14:54:00',text:'Эти мгновения наполняют наши сердца радостью и любовью.'},{id:20,image: 'https://i.pinimg.com/736x/6e/0d/55/6e0d553afe2843c3d30f56a96fe34310.jpg',author:'Мира Гусева',date:'2024-04-09 14:54:00',text:'Эти мгновения наполняют наши сердца радостью и любовью.'},{id:21,image: 'https://i.pinimg.com/736x/6e/0d/55/6e0d553afe2843c3d30f56a96fe34310.jpg',author:'Мира Гусева',date:'2024-04-09 15:54:00',text:'Эти мгновения наполняют наши сердца радостью и любовью.'},{id:22,image: 'https://i.pinimg.com/736x/6e/0d/55/6e0d553afe2843c3d30f56a96fe34310.jpg',author:'Мира Гусева',date:'2024-04-09 14:54:00',text:'Эти мгновения наполняют наши сердца радостью и любовью.'},{id:23,image: 'https://i.pinimg.com/736x/6e/0d/55/6e0d553afe2843c3d30f56a96fe34310.jpg',author:'Мира Гусева',date:'2024-04-09 15:54:00',text:'Эти мгновения наполняют наши сердца радостью и любовью.'},{id:24,image: 'https://i.pinimg.com/736x/6e/0d/55/6e0d553afe2843c3d30f56a96fe34310.jpg',author:'Мира Гусева',date:'2024-04-09 14:54:00',text:'Эти мгновения наполняют наши сердца радостью и любовью.'}],
          title: 'Цвета природы в наших руках',
          short_description:'Наши художники выражают всю красоту окружающего мира через творчество.',
          description: 'Каждое утро, когда я просыпаюсь в палатке, окружённой лесом и горами, я чувствую, как природа наполняет меня энергией. Величественные вершины, покрытые зелёными лесами, напоминают мне о том, как важно сохранять связь с природой. Каждый шаг по тропе — это не просто движение вперёд, это путешествие внутрь себя, где я нахожу вдохновение и силу. В такие моменты я понимаю, что настоящая красота мира скрыта в его простоте и величии.',
          tags: [{ id: 1, text: "Природа"},{ id: 7, text: "Искусство"}]
        },
        { 
          id: 0,
          image: 'https://i.pinimg.com/736x/6e/0d/55/6e0d553afe2843c3d30f56a96fe34310.jpg',
          date: '2023-04-09 14:30:00',
          read_time: 2,
          comments: [{id:8,image: 'https://i.pinimg.com/736x/6e/0d/55/6e0d553afe2843c3d30f56a96fe34310.jpg',author:'Мира Гусева',date:'2024-04-09 14:54:00',text:'Эти мгновения наполняют наши сердца радостью и любовью.'},{id:9,image: 'https://i.pinimg.com/736x/6e/0d/55/6e0d553afe2843c3d30f56a96fe34310.jpg',author:'Мира Гусева',date:'2024-04-09 15:54:00',text:'Эти мгновения наполняют наши сердца радостью и любовью.'}],
          title: 'Вдохновение в каждом шаге',
          short_description:'Наши путешественники находят вдохновение в каждом шаге своего пути.',
          description: 'Каждое утро, когда я просыпаюсь в палатке, окружённой лесом и горами, я чувствую, как природа наполняет меня энергией. Величественные вершины, покрытые зелёными лесами, напоминают мне о том, как важно сохранять связь с природой. Каждый шаг по тропе — это не просто движение вперёд, это путешествие внутрь себя, где я нахожу вдохновение и силу. В такие моменты я понимаю, что настоящая красота мира скрыта в его простоте и величии.',
          tags: [{ id: 1, text: "Природа"},{ id: 2, text: "Люди"}]
        },
        { 
          id: 1,
          image: 'https://i.pinimg.com/736x/6e/0d/55/6e0d553afe2843c3d30f56a96fe34310.jpg',
          date: '2023-04-06 14:30:00',
          read_time: 3,
          comments: [{id:10,image: 'https://i.pinimg.com/736x/6e/0d/55/6e0d553afe2843c3d30f56a96fe34310.jpg',author:'Мира Гусева',date:'2024-04-09 14:54:00',text:'Эти мгновения наполняют наши сердца радостью и любовью.'},{id:11,image: 'https://i.pinimg.com/736x/6e/0d/55/6e0d553afe2843c3d30f56a96fe34310.jpg',author:'Мира Гусева',date:'2024-04-09 15:54:00',text:'Эти мгновения наполняют наши сердца радостью и любовью.'},{id:12,image: 'https://i.pinimg.com/736x/6e/0d/55/6e0d553afe2843c3d30f56a96fe34310.jpg',author:'Мира Гусева',date:'2024-04-09 14:54:00',text:'Эти мгновения наполняют наши сердца радостью и любовью.'},{id:13,image: 'https://i.pinimg.com/736x/6e/0d/55/6e0d553afe2843c3d30f56a96fe34310.jpg',author:'Мира Гусева',date:'2024-04-09 15:54:00',text:'Эти мгновения наполняют наши сердца радостью и любовью.'},{id:14,image: 'https://i.pinimg.com/736x/6e/0d/55/6e0d553afe2843c3d30f56a96fe34310.jpg',author:'Мира Гусева',date:'2024-04-09 14:54:00',text:'Эти мгновения наполняют наши сердца радостью и любовью.'}],
          title: 'Моменты тишины и покоя',
          short_description:'В такие моменты наши фотографы ощущают гармонию и умиротворение.',
          description: 'Каждое утро, когда я просыпаюсь в палатке, окружённой лесом и горами, я чувствую, как природа наполняет меня энергией. Величественные вершины, покрытые зелёными лесами, напоминают мне о том, как важно сохранять связь с природой. Каждый шаг по тропе — это не просто движение вперёд, это путешествие внутрь себя, где я нахожу вдохновение и силу. В такие моменты я понимаю, что настоящая красота мира скрыта в его простоте и величии.',
          tags: [{ id: 1, text: "Природа"},{ id: 3, text: "Животные" }]
        },
      ]
      const tagsActive = getters.getTagsActive;//активные теги
      let postsFiltered = JSON.parse(JSON.stringify(posts))
      if (tagsActive.length) { //если есть активные теги
        postsFiltered = posts.filter((el: post)=>{ //если в одном из постов id тега совпадает с id тега из tags, у которого selected == true, (Неизвестно должны ли быть все выбранные теги у постов, или 1 из тегов)
         const commonItems = el.tags.filter(tag1 =>
           tagsActive.some((tag2: tag) => tag1.id === tag2.id)
         );
         return commonItems.length
       })
      }
      if (searchText) { //находим есть ли в названии или описании текст из поля поиска
        postsFiltered = postsFiltered.filter((el: post)=>
          el.title.toLowerCase().includes(searchText.toLowerCase()) || el.description.toLowerCase().includes(searchText.toLowerCase()) ||  el.short_description.toLowerCase().includes(searchText.toLowerCase())
        )
      }
      commit('setPosts',postsFiltered)
    },
    addCommentAction({commit},data){ // должен быть запрос
      commit('addCommentHelper',data) 
    },
  },
});

export default store;
