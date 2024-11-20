<template>
  <div class="post-container">
    <!-- 네비게이션 바 -->
    <mainNavbar />

    <div class="page-title-bar">
      <h1 v-if="mode === 'detail'">게시글 상세</h1>
      <button v-if="mode === 'detail'" style="float: right;" @click="goBack">
        목록
      </button>
      <h1 v-if="mode === 'create'">게시글 작성</h1>
    </div>    

    <div class="post_info">
      <form @submit.prevent="handleSubmit">
        <div class="post_info_line">
          <label for="category">카테고리</label>
          <input
            id="category"
            type="text"
            v-model="form.category"
            :disabled="mode === 'detail'"
          />
        </div>
        <div class="post_info_line">
          <label for="title">제목</label>
          <input
            id="title"
            type="text"
            v-model="form.title"
            :disabled="mode === 'detail'"
          />
        </div>
        <div class="post_info_line">
          <label for="author">작성자</label>
          <input
            id="author"
            type="text"
            v-model="form.author"
            :disabled="mode === 'detail'"
          />
        </div>
        <div v-if="mode === 'detail'" class="post_info_line">
          <label for="date">작성일</label>
          <!-- 날짜는 직접 입력하지 않음.-->
          <input
            id="date"
            type="date"
            v-model="form.date"
            :disabled=true
          />
        </div>
        <div class="post_info_line">
          <textarea
            id="contents"
            type="text"
            v-model="form.contents"
            :disabled="mode === 'detail'"
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
import '@/assets/styles/postDetailPage.css'; 
import mainNavbar from '@/components/mainNavbar.vue';

export default {
  name: "PostDetailPage",
  components: {
    mainNavbar
  },
  props: {
    mode: {
      type: String,
      required: true,
      validator: (value) => ["detail", "create"].includes(value),
    },
    post: {
      type: Object,
      default: () => ({
        category: "",
        title: "",
        author: "",
        date: "",
      }),
    },
  },
  data() {
    return {
      form: { ...this.post }, // 게시글 데이터를 복사하여 양방향 바인딩
    };
  },
  methods: {
    handleSubmit() {
      // 작성 완료 시 처리
      console.log("작성된 데이터:", this.form);
      alert("게시글이 작성되었습니다.");
      this.$router.push("/");
    },
    goBack() {
      this.$router.push("/");
    },
  },
};
</script>