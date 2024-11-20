// src/router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '@/views/MainPage.vue'
import DetailPost from '@/views/DetailPost.vue'

Vue.use(VueRouter)

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
  // 다른 페이지를 추가
]

const router = new VueRouter({
  routes,
})

export default router