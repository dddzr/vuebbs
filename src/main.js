import { createApp } from 'vue'
import App from './App.vue'
import router from './router';  // 라우터 임포트

createApp(App)
  .use(router)  // Vue 3.x에서 라우터 사용 설정
  .mount('#app');