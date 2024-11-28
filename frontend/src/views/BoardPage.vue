<template>
  <div>
    <!-- 네비게이션 바 -->
    <mainNavbar />    
    <!-- 왼쪽 메뉴 영역 -->
    <SideMenu :menuItems="menuItems" @board-selected="handleBoardSelection" />
    <!-- 게시판 영역 -->
    <boardMain/>
  </div>
</template>

<script setup>
  import { usePostStore } from '@/stores/postStore';
  import '@/assets/styles/boardPage.css'; 
  import boardMain from '@/components/boardMain.vue';
  import mainNavbar from '@/components/mainNavbar.vue';
  import SideMenu from '@/components/sideMenu.vue';

  const postStore = usePostStore();

  // 게시판 선택 시 상태 업데이트
  const handleBoardSelection = (menuItem) => {
    postStore.setSelectedBoard(menuItem);
    postStore.fetchPosts(menuItem);
  };
</script>