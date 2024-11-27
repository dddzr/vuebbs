<template>
    <div class="signup_container">
      <h2>회원가입</h2>
      <form @submit.prevent="signup" style="margin: 50px 0px 10px 0px">
        <!-- 아이디 입력 -->
        <div class="input-container">
          <label>아이디</label>
          <input type="text" v-model="username" @input="resetAvailability('username')" required />
          <button type="button" @click="checkDuplication('username', username)" :disabled="userStore.isAvailable.username" class="check-btn">중복검사</button>
        </div>
        <label v-show= userStore.isAvailable?.username class="available-message">사용 가능한 아이디입니다.</label>
        
        <!-- 이메일 입력 -->
        <div class="input-container">
          <label>이메일</label>
          <input type="email" v-model="email" @input="resetAvailability('email')" required />
          <button type="button" @click="checkDuplication('email', email)" :disabled="userStore.isAvailable.email" class="check-btn">중복검사</button>
        </div>
        <label v-show= userStore.isAvailable?.email class="available-message">사용 가능한 이메일입니다.</label>
  
        <!-- 닉네임 입력 -->
        <div class="input-container">
          <label>닉네임</label>
          <input type="text" v-model="nickname" required />
        </div>
        
        <!-- 비밀번호 입력 -->
        <div class="input-container">
          <label>비밀번호</label>
          <input type="password" v-model="password" required />
        </div>
  
        <div class="input-container">
          <label>비밀번호 확인</label>
          <input type="password" v-model="confirmPassword" required />
        </div>
  
        <button type="submit" style="margin-top: 30px;">회원가입</button>
      </form>
  
      <div class="auth-links">
        <label @click="goToLogin">이미 계정이 있으신가요?</label>
      </div>
    </div>
  </template>
  
  <script>
import { useUserStore } from '@/stores/userStore';
import '@/assets/styles/login.css'; 
  export default {
    data() {
      return {
        username: "", // 아이디
        email: "", // 이메일
        nickname: "", // 별명
        password: "", // 비밀번호
        confirmPassword: "", // 비밀번호 확인
      };
    },
    setup() {
      const userStore = useUserStore();
      return {userStore};
    },
    methods: {
      async signup() {
        if (this.password !== this.confirmPassword) {
          alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
          return;
        }
        if (!this.userStore.isAvailable?.username) {
          alert("아이디 중복검사가 완료되지 않았습니다.");
          return;
        }
        if (!this.userStore.isAvailable?.email) {
          alert("이메일 중복검사가 완료되지 않았습니다.");
          return;
        }
  
        if (this.username.trim() && this.email.trim() && this.nickname.trim() && this.password.trim()) {
          try {
            await this.userStore.signup({
                username: this.username,
                email: this.email,
                nickname: this.nickname,
                password: this.password,
              });
            alert("회원가입이 완료되었습니다.");
            this.$router.push("/login");
          } catch (error) {
            alert("회원가입에 실패했습니다.");
          } finally {
            //this.isLoading = false;
          }
        }
      },
      
      // 중복 검사를 위한 메서드
      checkDuplication(type, vaule) {
        this.userStore.checkDuplication(type, vaule);
      },
      // 입력값이 변경될 때 중복 검사 결과를 리셋
      resetAvailability(type) {
        this.userStore.setAvailability(type, false);
      },
      // 로그인 페이지로 이동
      goToLogin() {
        this.$router.push("/login");
      },
    },
  };
  </script>
