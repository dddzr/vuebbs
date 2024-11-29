<template>
    <div class="notify-page">
      <h2>알림</h2>
      <div v-for="notify in notifys" :key="notify.id" class="notify-item" :class="{ unread: !notify.isRead }">
        <div class="notify-type">{{ notify.type }}</div>
        <div class="notify-content">{{ notify.content }}</div>
        <button @click="markAsRead(notify.id)">읽음 처리</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue';
  
  const notifys = reactive([
    {
      id: 1,
      type: '댓글 알림',
      content: '사용자1님이 당신의 게시글에 댓글을 달았습니다.',
      post_id: 123,
      comment_id: 456,
      isRead: false,
    },
    {
      id: 2,
      type: '대댓글 알림',
      content: '사용자2님이 당신의 댓글에 대댓글을 달았습니다.',
      post_id: 123,
      comment_id: 456,
      reply_comment_id: 789,
      isRead: false,
    },
    {
      id: 3,
      type: '좋아요 알림',
      content: '사용자3님이 당신의 게시글에 좋아요를 눌렀습니다.',
      post_id: 123,
      isRead: false,
    },
  ]);
  
  const markAsRead = (id) => {
    const notify = notifys.find(n => n.id === id);
    if (notify) {
      notify.isRead = true;
    }
  };
  </script>
  
  <style scoped>
  .notify-page {
    padding: 20px;
  }
  
  .notify-item {
    padding: 15px;
    border-bottom: 1px solid #ccc;
    display: flex;
    flex-direction: column;
  }
  
  .notify-item.unread {
    background-color: #f0f8ff;
  }
  
  .notify-type {
    font-weight: bold;
    font-size: 14px;
  }
  
  .notify-content {
    margin-top: 5px;
    font-size: 12px;
  }
</style>
  