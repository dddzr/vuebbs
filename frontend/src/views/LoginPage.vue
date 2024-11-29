<template>
  <div class="login_container">
    <h2>로그인</h2>
    <form @submit.prevent="login" style="margin: 50px 0px 10px 0px">
      <div class="login-info-input-container">
        <label>아이디</label>
        <input type="text" v-model="username" required />      
      </div>
      <div class="login-info-input-container">
        <label>비밀번호</label>
        <input type="text" v-model="password" required />    
      </div>
      <button type="submit" style="margin-top: 30px;">로그인</button>
    </form>
    <div class="auth-links">
      <label @click="goToSignUp()">회원가입</label>|<label>아이디/비밀번호 찾기</label>   
    </div>   
  </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore';
import '@/assets/styles/login.css'; 
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  setup() {
    const userStore = useUserStore();
    return {userStore};
  },
  methods: {
    async login() {
      try {
            await this.userStore.login({username: this.username, password: this.password});
            this.$router.push("/");
          } catch (error) {
            alert("로그인에 실패했습니다. " + error );
          } finally {
            //this.isLoading = false;
          }
    },
    goToSignUp(){
      this.$router.push("/signup");
    }
  },
};
</script>