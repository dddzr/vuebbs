import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: localStorage.getItem('token') ? true : false, // 로그인 상태
    user: JSON.parse(localStorage.getItem('user')) ?? null,   // 로그인된 사용자 정보 {}
    token: localStorage.getItem('token') ?? null,             // 인증 토큰
    isAvailable: { // 회원가입 중복 체크 상태
      username: false,
      email: false
    },
    userActivity: {
      like: [],
      posted: [],
      comment: [],
      view: [],
    },
    notifications: [
      { "id": 1, "content": "새 댓글이 달렸습니다.", "isRead": false, "createdAt": "2024-11-29T12:34:00" },
      { "id": 2, "content": "새 좋아요가 있습니다.", "isRead": true, "createdAt": "2024-11-28T10:00:00" },
      { "id": 3, "content": "대댓글이 달렸습니다.", "isRead": false, "createdAt": "2024-11-27T14:22:00" }
    ]
    
  }),
  actions: {
    async login(request) {
      try {
        const response = await axios.post('/auth/login', request);
        const { token, user } = response.data;

        this.token = token;
        this.user = user;
        this.isLoggedIn = true;

        // 토큰을 localStorage에 저장
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        if(error.response?.data?.message){
          const errorMessage = error.response.data.message;
          throw errorMessage;
        } else {
          console.error('로그인 실패:', error);
        }        
      }
    },
    async signup(request) {
      try {
        const response = await axios.post('/auth/signup', request);
        console.log(response);
      } catch (error) {
        console.error('회원가입 실패:', error);
        throw error;
      }
    },
    logout() {
      this.isLoggedIn = false;
      this.user = null;
      this.token = null;

      // localStorage에서 토큰 삭제
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      alert("로그아웃 되었습니다.");
    },
    setAvailability(type, value) {
      this.isAvailable[type] = value;
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
        if (response.data?.available) {
          this.isAvailable[type] = true;
          alert(response.data?.message);
        } else {
          this.isAvailable[type] = false;
          alert(response.data?.message);
        }
      } catch (error) {
        console.error("error in checkDuplication: ", error);
        throw error;
      }
    },
    async fetchUserActivity(activityType) {
      let url = '';
      try {
        if(activityType == 'posted') {
          url = '/user/getPostsByUsername/' + this.user.username;
        }else {
          url = '/user/getUserActivityRecords/' + this.user.username + '/' + activityType;
        }
        const response = await axios.get(url);
        // 상태 업데이트
        this.userActivity[activityType] = response.data;
      } catch (error) {
        console.error('Error fetching user activity data:', error);
      }
    },    
    async checkLikedPost(post_id){
      if(!this.user?.username && !post_id) return;
      try {
        let url = '/user/checkLikedPost/' + post_id + "/" + this.user.username;
        const response = await axios.get(url);
        return response.data?.isLiked;
      } catch (error) {
        console.error('Error fetching user activity data:', error);
      }
    },
    async fetchNotifications() {
      try {
        const response = await axios.get('/user/notifications', { params: { username: this.user.username } });
        this.notifications = response.data;
      } catch (error) {
        console.error('알림 데이터를 가져오는 데 실패했습니다:', error);
      }
    }
  }
});
