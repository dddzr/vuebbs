<template>
    <div>
        <!-- 좌측 카테고리 메뉴 -->
        <div class="sidebar">
        <div class="sidebar_header">
            {{ selectedMenu.label }}
        </div>
        <div v-for="(menuItem, index) in categories" :key="index" class="sidebar-item">
            <button @click="selectBoard(menuItem)">
            {{ menuItem.label }}
            </button>
        </div>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
    return {
      selectedMenu: { value: 0, label: "공지사항", subMenu: [] },
      categories: [
        { value: 0, label: "공지사항", subMenu: [] },
        { value: 1, label: "자유게시판" },
        { value: 2, label: "Q&A" }
      ], // DB에서 불러오게 해야함.
    };
  },
    mounted() {
    // sessionStorage에서 loginId 확인
    if (typeof window !== 'undefined' && sessionStorage.getItem('loginId') !== null) {
      this.isLoggedIn = true;
    }
  },
    methods: {
    selectBoard(menuItem) {
      this.$emit('board-selected', menuItem); 
      },
    },
  };
</script>