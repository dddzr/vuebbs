<template>
  <div class="post-info">
      <form @submit.prevent="handleSubmit">
        <!-- <div class="input-container">
          <label for="category">카테고리</label>
          <input
            id="category"
            name="category"
            type="text"
            v-model="form.category"
            :disabled="mode === 'view'"
          />
        </div> -->
        <div class="input-container">
          <label for="title">제목</label>
          <input
            id="title"
            name="title"
            type="text"
            v-model="form.title"
            :disabled="postStore.mode === 'view'"
          />
        </div>
        <div class="input-container">
          <label for="author_nickname">작성자</label>
          <input
            id="author_nickname"
            type="text"
            v-model="form.author_nickname"
            :disabled=true
          />
        </div>
        <div class="input-container" v-show="false">
          <label for="author">작성자 아이디</label>
          <input
            id="author"
            type="text"
            v-model="form.author"
            :disabled=true
          />
        </div>
        <div v-if="postStore.mode === 'view'" class="input-container">
          <label for="created_at">작성일</label>
          <!-- 날짜는 직접 입력하지 않음.-->
          <input
            id="created_at"
            type="created_at"
            v-model="form.created_at_formatted"
            :disabled=true
          />
        </div>
        <div class="input-container">
          <textarea
            id="content"
            type="text"
            v-model="form.content"
            :disabled="postStore.mode === 'view'"
            class="content_area"
          >
          </textarea>
        </div>
        <button v-if="postStore.mode === 'create' || postStore.mode === 'edit'" type="submit">작성 완료</button>
      </form>
    </div>    
</template>
  
<script setup>
  import { reactive, watch, onMounted, defineEmits } from 'vue';
  import { useUserStore } from '@/stores/userStore';
  import { usePostStore } from '@/stores/postStore';
  const emit = defineEmits(['submitPost']); 
  const postStore = usePostStore();
  const userStore = useUserStore();

  let form = reactive({ ...postStore.currentPost }); // 수정 시 currentPost즉시 변경x.

  const handleSubmit = () => {
    if (postStore.mode === 'create' || postStore.mode === 'edit') {
      console.log('handleSubmit called');
      emit('submitPost', form);
    }
  };

  /// created와 비슷하게, onMounted 사용
  onMounted(() => {
    console.log(postStore.currentPost);
    if (postStore.mode === 'create') {
      form.author = userStore.user?.user_id;
      form.author_nickname = userStore.user?.nickname;
    } else {
      form = reactive({ ...postStore.currentPost });
    }
  });

  // watch 사용 - currentPost가 변경될 때마다 form을 갱신
  watch(
    () => postStore.currentPost,
    (newCurrentPost) => {
      form = reactive({ ...newCurrentPost }); // currentPost 변경 시 form에 반영
    },
    { deep: true } // 객체 내부 속성도 재귀적으로 감시
  );
</script>
  