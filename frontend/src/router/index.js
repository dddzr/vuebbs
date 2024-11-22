import { createRouter, createWebHistory } from 'vue-router';
import BoardPage from '@/views/BoardPage.vue'
import PostDetailPage from '@/views/PostDetailPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import SignUpPage from '@/views/SignUpPage'

const routes = [
  {
    path: '/signup',
    name: 'SignUpPage',
    component: SignUpPage,
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/',
    name: 'BoardPage',
    component: BoardPage,
  },
  {
    path: '/post',
    name: 'PostDetailPage',
    component: PostDetailPage,
    props: route => ({
      id: route.params.id,
      mode: route.query.mode,
      post: JSON.parse(route.query.post || "{}"),
    }),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router