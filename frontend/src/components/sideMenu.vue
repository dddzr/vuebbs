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

<script setup>
  import { reactive, defineEmits } from 'vue';
  const emit = defineEmits(['board-selected']); //이벤트 목록 정의.
  const selectedMenu = reactive({ value: 0, label: "공지사항", subMenu: [] });
  const boards = reactive([
      { id: 1, label: "공지사항", subMenu: [] },
      { id: 2, label: "자유게시판" },
      { id: 3, label: "Q&A" }
    ]
  );

  const selectBoard = (menuItem) => {
    emit('board-selected', menuItem); 
  }
</script>