<template>
    <div class="navbar">
      <div class="left-menu">
        <button @click="goHome">🏠 홈</button>
      </div>
      <div class="right-menu">
        <button v-if="isLoggedIn" @click="goToProfile">프로필</button>
        <button v-else @click="goToLogin">로그인</button>
      </div>
    </div>
  </template>  
  
  <script>
  export default {
    data() {
    return {
      isLoggedIn: false
    };
  },
    mounted() {
    // sessionStorage에서 loginId 확인
    if (typeof window !== 'undefined' && sessionStorage.getItem('loginId') !== null) {
      this.isLoggedIn = true;
    }
  },
    methods: {
      goHome() {
        this.$router.push('/');
      },
      goToLogin() {
        this.$router.push('/login');
      },
      goToProfile() {
        this.$router.push('/profile');
      },
    },
  };
  </script>
  
  <style scoped>
  .navbar {
        display: flex;
        justify-content: space-between;
        background-color: var(--theme-color-1);
        position: fixed;
        top: 0px;
        left: 0px;
        height: 60px;
        width: 100%;
        border-bottom: 1px solid var(--menu-border-color);
        button {
            background-color: var(--theme-color-1);            
            /* background: none; */
            border: 1px solid #cccccc00;
            height: 100%;
            padding: 10px;
            color: var(--text-color-2)
        }    
        button:hover {
            background-color: var(--theme-color-2);
            cursor: pointer;
        }
    }
    .left-menu {
      width: 200px;
    }
    .left-menu button {
      width: 100%;
      font-size: 18px;
      font-weight: 600;
    }

    .right-menu button {
      border-left: 1px solid #cccccc00;
    }
  </style>
  