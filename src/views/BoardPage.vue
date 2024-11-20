<template>
  <div>
    <!-- 네비게이션 바 -->
    <mainNavbar />    
    <!-- 왼쪽 메뉴 영역 -->
    <SideMenu :menuItems="menuItems" @board-selected="handleBoardSelection" />
    <!-- 게시판 영역 -->
    <Board  :selectedBoard="selectedBoard" />
  </div>
</template>

<script>
// import Pagination from "vue3-pagination"; //페이지
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
  data() {
    return {
      selectedBoard: { value: 1, label: "공지사항" },// 선택된 게시판 데이터
    };
  },
  methods: {
    handleBoardSelection(menuItem) {
      this.selectedBoard = menuItem;
    }
  }
};
</script>