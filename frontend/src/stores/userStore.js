import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    isAuthenticated: false, // 로그인 상태
    user: null,             // 로그인된 사용자 정보 {}
    token: null             // 인증 토큰
  }),
  actions: {
    login(user, token) {
      this.isAuthenticated = true;
      this.user = user;
      this.token = token;
    },
    logout() {
      this.isAuthenticated = false;
      this.user = null;
      this.token = null;
    },
    async checkDuplication(type, value){
      if (value == '' || value == null) return;
      try {
        const url = "/user/checkDuplication";
        const data = {
          type: type,
          value: value,
        };
        const response = await axios.post(url, data);
        console.log(response);
      } catch (error) {
        console.error("error in insertPost: ", error);
        throw error;
      }
    }
  }
});
