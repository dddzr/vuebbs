import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    isAuthenticated: false, // 로그인 상태
    user: null,             // 로그인된 사용자 정보 {}
    token: null,            // 인증 토큰
    isAvailable: {
      username: false,
      email: false,
      id: false
    }
  }),
  mutations: {
    setAvailability(state, { type, value }) {
      state.isAvailable[type] = value;
    },
  },
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
        // 중복 검사 결과에 따른 알림
        if (response.data?.available) {
          this.isAvailable[type] = false;
          alert(response.data?.message);  // 중복된 경우
        } else {
          this.isAvailable[type] = true;
          alert(response.data?.message);  // 중복되지 않은 경우
        }
      } catch (error) {
        console.error("error in insertPost: ", error);
        throw error;
      }
    }
  }
});
