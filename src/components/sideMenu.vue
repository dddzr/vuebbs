<template>
    <div>
        <!-- 좌측 카테고리 메뉴 -->
        <div class="sidebar">
        <div class="sidebar_header">
            {{ selectedMenu.label }}
        </div>
        <div v-for="(menuItem, index) in boards" :key="index" class="sidebar-item">
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
      boards: [
        { id: 1, label: "공지사항", subMenu: [] },
        { id: 2, label: "자유게시판" },
        { id: 3, label: "Q&A" }
      ],
    };
  },
  methods: {
    selectBoard(menuItem) {
      this.$emit('board-selected', menuItem); 
      },
    },
  };
</script>