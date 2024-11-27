<template>
  <div class="post-container">
    <!-- 네비게이션 바 -->
    <mainNavbar />
    <!-- 로딩 화면 -->
    <loading-spinner v-if="uiStore.isLoading"/>

    <div class="page-title-bar">
      <h1 v-if="mode === 'detail'">게시글 상세</h1>
      <button v-if="mode === 'detail'" style="float: right;" @click="goBack">
        목록
      </button>
      <h1 v-if="mode === 'create'">게시글 작성</h1>
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
            :disabled="mode === 'detail'"
          />
        </div> -->
        <div class="input-container">
          <label for="title">제목</label>
          <input
            id="title"
            name="title"
            type="text"
            v-model="form.title"
            :disabled="mode === 'detail'"
          />
        </div>
        <div class="input-container">
          <label for="author">작성자</label>
          <input
            id="author"
            type="text"
            v-model="form.author"
            :disabled="mode === 'detail'"
          />
        </div>
        <div v-if="mode === 'detail'" class="input-container">
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
            :disabled="mode === 'detail'"
            class="content_area"
          >
          </textarea>
        </div>
        <button v-if="mode === 'create'" type="submit">작성 완료</button>
      </form>
      <div class="reaction-container" v-if="mode === 'detail'">
        <div class="views">
          👀 조회수: {{ form.view_count || 0 }}
        </div>
        <div @click="handleLike" class="likes">
          ❤️ 좋아요: {{ form.like_count || 0 }}
        </div>
      </div>

      <!-- 좋아요 애니메이션 -->
      <div
        v-if="showHeart"
        class="like-animation"
      >
        ❤️
      </div>
    </div>    
  </div>
</template>

<script>
  import { useUIStore } from '@/stores/uiStore';
import { usePostStore } from '@/stores/postStore';
import mainNavbar from '@/components/mainNavbar.vue';
import loadingSpinner from '@/components/loadingSpinner';
import '@/assets/styles/postDetailPage.css'; 

export default {
  name: "PostDetailPage",
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
      validator: (value) => ["view", "create", "edit"].includes(value),
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
      showHeart: false,
    };
  },
  mounted() {
    if (this.mode === "detail") {
      this.form.view_count++;
    }
  },
  methods: {
    handleLike() {
      this.form.like_count++;
      this.showHeart = true;
      setTimeout(() => {
        this.showHeart = false; // 1.5초 후 하트 숨김
      }, 1500);
    },
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