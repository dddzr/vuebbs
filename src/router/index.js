import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/views/MainPage.vue'
import DetailPost from '@/views/DetailPost.vue'

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
  },
  {
    path: '/detail',
    name: 'DetailPost',
    component: DetailPost,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router