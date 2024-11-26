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
              :disabled="mode === 'view'"
            />
          </div>
          <div class="input-container">
            <label for="author">작성자</label>
            <input
              id="author"
              type="text"
              v-model="form.author"
              :disabled="mode === 'view'"
            />
          </div>
          <div v-if="mode === 'view'" class="input-container">
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
              :disabled="mode === 'view'"
              class="content_area"
            >
            </textarea>
          </div>
          <button v-if="mode === 'create' || mode === 'edit'" type="submit">작성 완료</button>
        </form>
      </div>    
  </template>
  
  <script>
  import { usePostStore } from '@/stores/postStore';
  export default {
    props: {
      mode: {
        type: String,
        required: true,
        validator(value) {
          return ['view', 'create'].includes(value);
        },
      },
    },
    setup() {
      const postStore = usePostStore();
      return { postStore };
    },
    data() {
      return {
        form: { ...this.postStore.currentPost }, // 수정 시 currentPost즉시 변경x.
      }
    },
  watch: {
    'postStore.currentPost': {
      deep: true, //객체 내부 속성 재귀적 감시
      immediate: false, // 초기 값을 기반으로 watch 동작 실행
      handler(newCurrentPost) {
        this.form = { ...newCurrentPost }; // currentPost변경 시 반영.
      },
    },
  },
    methods: {
      handleSubmit() {
        if (this.mode === 'create') {
          console.log('handleSubmit called');
          this.$emit('createPost', this.form);
        }
      },
    },
  };
  </script>
  