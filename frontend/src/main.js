import { createApp } from 'vue'
import { createPinia } from 'pinia';
import router from './router';
import axios from 'axios';
import App from './App.vue'

const app = createApp(App);

// 디버깅 활성화
app.config.devtools = true;

// Axios 전역 기본 설정
axios.defaults.baseURL = 'http://localhost:8081/'; // Spring Boot API의 기본 URL
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Axios를 Vue 전역 프로퍼티에 추가
app.config.globalProperties.$axios = axios;

app
  .use(createPinia())
  .use(router)
  .mount('#app');