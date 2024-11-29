<template>
  <div class="navbar">
    <div class="left-menu">
      <button @click="goHome">🏠 홈</button>
    </div>
    <div class="right-menu">
      <button v-if="userStore.isLoggedIn" @click="goToNotifyPage" class="notification-btn">🔔
          <!-- 읽지 않은 알림 숫자 표시 -->
          <span v-if="unreadNotificationsCount > 0" class="notification-badge">
          {{ unreadNotificationsCount }}
        </span>
      </button>
      <button v-if="userStore.isLoggedIn" @click="goToMyPage">My Page</button>
      <button v-if="userStore.isLoggedIn" @click="userStore.logout()">로그아웃</button>
      <button v-else @click="goToLogin">로그인</button>
    </div>
  </div>
</template>  
  
<script setup>
  import { onMounted, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '@/stores/userStore';

  const userStore = useUserStore();
  const router = useRouter();

  onMounted(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('loginId') !== null) {
      userStore.isLoggedIn = true;
      userStore.fetchNotifications();
    }
  })

  // 읽지 않은 알림 개수 계산
  const unreadNotificationsCount = computed(() => {
    return userStore.notifications.filter(notification => !notification.isRead).length;
  });
  const goHome = () => {
    router.push('/');
  };
  const goToLogin = () => {
    router.push('/login');
  };
  const goToMyPage = () => {
    router.push({
      name: "MyPage",
      params: { username: userStore.user.username }
    });  
  };
  const goToNotifyPage = () => {
    router.push({
      name: "NotifyPage",
      params: { username: userStore.user.username }
    });  
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
          height: calc(100% - 2px);
          padding: 5px;
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

  .right-menu {
    display: flex;
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      border-left: 1px solid #cccccc00;
    }
  }

  .notification-badge {
    background-color: red;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
  }
</style>
  