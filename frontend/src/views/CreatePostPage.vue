<template>
    <div class="post-container">
      <!-- 네비게이션 바 -->
      <mainNavbar />
      <!-- 로딩 화면 -->
      <loading-spinner v-if="isLoading" />
  
      <div class="page-title-bar">
        <h1 v-if="mode === 'create'">게시글 작성</h1>
        <button style="float: right;" @click="goBack">
          목록
        </button>
      </div>    
  
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
              v-model="form.created_at"
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
          <button v-if="mode === 'create'" type="submit">작성 완료</button>
        </form>
      </div>    
    </div>
  </template>
  
  <script>
  import { usePostStore } from '@/stores/postStore';
  import mainNavbar from '@/components/mainNavbar.vue';
  import loadingSpinner from '@/components/loadingSpinner';
  import '@/assets/styles/postDetailPage.css'; 
  
  export default {
    name: "CreatePostPage",
    components: {
      mainNavbar,
      loadingSpinner
    },
    setup() {
      const postStore = usePostStore();
      return { postStore };
    },
    props: {
      mode: {
        type: String,
        required: true,
        validator: (value) => ["view", "create"].includes(value),
      },
      post: {
        type: Object,
        default: () => ({
          // category: "",
          title: "",
          author: "",
          created_at: "",
        }),
      },
    },
    data() {
      return {
        isLoading: false,
        form: { ...this.post }, // 게시글 데이터를 복사하여 양방향 바인딩
      };
    },
    methods: {
      async handleSubmit() {
        this.isLoading = true; // 로딩 시작
        try {
          await this.postStore.insertPost(this.form);
          alert("게시글이 작성되었습니다.");
          this.$router.push("/");
        } catch (error) {
          alert("게시글이 작성에 실패했습니다.");
          console.error("error in insertPost: ", error);
        } finally {
          this.isLoading = false; // 로딩 종료
        }
      },
      goBack() {
        this.$router.push("/");
      },
    },
  };
  </script>