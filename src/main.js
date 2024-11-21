import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { createPinia } from 'pinia';
import axios from 'axios';

const app = createApp(App);

// Axios 전역 기본 설정
axios.defaults.baseURL = 'http://localhost:8081/'; // Spring Boot API의 기본 URL
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Axios를 Vue 전역 프로퍼티에 추가
app.config.globalProperties.$axios = axios;

app
  .use(router)
  .use(createPinia())
  .mount('#app');