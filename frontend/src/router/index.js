import { createRouter, createWebHistory } from 'vue-router';
import BoardPage from '@/views/BoardPage.vue'
// import PostDetailPage from '@/views/PostDetailPage.vue'
import ViewPostPage from '@/views/ViewPostPage.vue'
import CreatePostPage from '@/views/CreatePostPage.vue'
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
    path: '/post/view/:postId',
    name: 'ViewPostPage',
    component: ViewPostPage,
    props: route => ({
      postId: route.params.postId,
      mode: route.query.mode,
    }),
  },
  {
    path: '/post/create',
    name: 'CreatePostPage',
    component: CreatePostPage,
    props: route => ({
      id: route.params.id,
      mode: route.query.mode,
    }),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 전역 네비게이션 가드
// TODO: 스토어 getter로 isLoggedIn() 생성, 로그인 여부 판단.
router.beforeEach((to, from, next) => {
  const isLoggedIn = true;// !isLoggedIn() //localStorage.getItem('authToken');
  if (to.path === '/post/create' && !isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router