<template>
    <div class="signup_container">
      <h2>회원가입</h2>
      <form @submit.prevent="signup" style="margin: 50px 0px 10px 0px">
        <!-- 사용자명 입력 -->
        <div class="input-container">
          <label>이름</label>
          <input type="text" v-model="username" required />
          <button type="button" @click="checkDuplication('username', username)" class="check-btn">중복검사</button>
        </div>
        
        <!-- 이메일 입력 -->
        <div class="input-container">
          <label>이메일</label>
          <input type="email" v-model="email" required />
          <button type="button" @click="checkDuplication('email', email)" class="check-btn">중복검사</button>
        </div>
  
        <!-- 아이디 입력 -->
        <div class="input-container">
          <label>아이디</label>
          <input type="text" v-model="id" required />
          <button type="button" @click="checkDuplication('id', id)" class="check-btn">중복검사</button>
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
        username: "", // 사용자 이름
        email: "", // 이메일
        id: "", // 아이디
        password: "", // 비밀번호
        confirmPassword: "", // 비밀번호 확인
      };
    },
    setup() {
      const userStore = useUserStore();
      return {userStore};
    },
    methods: {
      signup() {
        if (this.password !== this.confirmPassword) {
          alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
          return;
        }
  
        if (this.name.trim() && this.email.trim() && this.username.trim() && this.password.trim()) {
          this.$emit("signup", {
            name: this.name,
            email: this.email,
            username: this.username,
            password: this.password,
          });
          this.$router.push("/login");
        }
      },
      
      // 중복 검사를 위한 메서드
      checkDuplication(type, vaule) {
        this.userStore.checkDuplication(type, vaule);
      },

      // 로그인 페이지로 이동
      goToLogin() {
        this.$router.push("/login");
      },
    },
  };
  </script>