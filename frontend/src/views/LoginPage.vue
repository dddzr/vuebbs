<template>
  <div class="login_container">
    <h2>로그인</h2>
    <form @submit.prevent="login" style="margin: 50px 0px 10px 0px">
      <div class="input-container">
        <label>아이디</label>
        <input type="text" v-model="username" required />      
      </div>
      <div class="input-container">
        <label>비밀번호</label>
        <input type="text" v-model="username" required />    
      </div>
      <button type="submit" style="margin-top: 30px;">로그인</button>
    </form>
    <div class="auth-links">
      <label @click="goToSignUp()">회원가입</label>|<label>아이디/비밀번호 찾기</label>   
    </div>   
  </div>
</template>

<script>
import '@/assets/styles/login.css'; 
export default {
  data() {
    return {
      username: "", // 입력한 사용자 이름
    };
  },
  methods: {
    login() {
      if (this.username.trim()) {
        // 사용자 정보를 저장 (예: Vuex, Local Storage, Emit 등)
        this.$emit("login", this.username);
        this.$router.push("/"); // 로그인 후 메인 화면으로 이동
      }
    },
    goToSignUp(){
      this.$router.push("/signup");
    }
  },
};
</script>