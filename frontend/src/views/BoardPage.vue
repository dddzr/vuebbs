<template>
  <div>
    <!-- 네비게이션 바 -->
    <mainNavbar />    
    <!-- 왼쪽 메뉴 영역 -->
    <SideMenu :menuItems="menuItems" @board-selected="handleBoardSelection" />
    <!-- 게시판 영역 -->
    <Board/>
  </div>
</template>

<script>
// import Pagination from "vue3-pagination"; //페이지
import { usePostStore } from '@/stores/postStore';
import '@/assets/styles/boardPage.css'; 
import Board from '@/components/board.vue';
import mainNavbar from '@/components/mainNavbar.vue';
import SideMenu from '@/components/sideMenu.vue';

export default {
  name: "BoardPage",
  components: {
    mainNavbar,
    SideMenu,
    Board
    // Pagination,
  },
  setup() {
    const postStore = usePostStore(); // store 초기화

    // 게시판 선택 시 상태 업데이트
    const handleBoardSelection = (menuItem) => {
      postStore.setSelectedBoard(menuItem); // 선택된 게시판을 store에 업데이트
      postStore.fetchPosts(menuItem); // 게시판에 맞는 게시글 데이터 가져오기
    };

    return {
      handleBoardSelection
    };
  }
};
</script>