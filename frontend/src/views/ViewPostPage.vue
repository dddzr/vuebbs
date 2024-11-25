<template>
    <div class="post-container">
      <!-- 네비게이션 바 -->
      <mainNavbar />
      <!-- 로딩 화면 -->
      <loading-spinner v-if="isLoading" />
  
      <div class="page-title-bar">
        <h1 v-if="mode === 'view'">게시글 상세</h1>
        <button style="float: right;" @click="goBack">
          목록
        </button>
      </div>    
  
      <div class="post-info">
        <postForm :mode="'view'" :postData="postData" />
        <div class="reaction-container" v-if="mode === 'view'">
          <div class="views">
            👀 조회수: {{ form.view_count || 0 }}
          </div>
          <div @click="handleLike" class="likes">
            ❤️ 좋아요: {{ form.like_count || 0 }}
          </div>
        </div>
  
        <!-- 좋아요 애니메이션 -->
        <div v-if="showHeart" class="like-animation">
          ❤️
        </div>
      </div>    
    </div>
  </template>
  
  <script>
  import { usePostStore } from '@/stores/postStore';
  import mainNavbar from '@/components/mainNavbar.vue';
  import loadingSpinner from '@/components/loadingSpinner.vue';
  import postForm from '@/components/postForm.vue';
  import '@/assets/styles/postDetailPage.css'; 
  
  export default {
    name: "ViewPostPage",
    components: {
      mainNavbar,      
      loadingSpinner,
      postForm,
    },
    setup() {
      const postStore = usePostStore();
      return { postStore };
    },
    props: {
      mode: {
        type: String,
        required: true,
        validator: (value) => ["view", "create", "modify"].includes(value),
      },
      /* 스토어 이용하도록 수정
      post: {
        type: Object,
        default: () => ({
          // category: "",
          title: "",
          author: "",
          created_at: "",
        }),
      },*/
    },
    data() {
      return {
        isLoading: false,
        form: { ...this.postStore.currentPost }, // 얕은 복사하여 양방향 바인딩 // currentPost즉시 변경x.
        showHeart: false,
      };
    },
    mounted() {
      if (this.mode === "view") {
        this.form.view_count++;
      }
    },
    beforeRouteLeave(to, from, next) { //like unmounted
        this.postStore.setCurrentPost(null);
        next(); // 라우터 이동 허용
    },
    methods: {
      handleLike() {
        this.postStore.increaseLikeCount(this.form);
        this.form.like_count++;
        this.showHeart = true;
        setTimeout(() => {
          this.showHeart = false; // 1.5초 후 하트 숨김
        }, 1500);
      },
      goBack() {
        this.$router.push("/");
      },
    },
  };
  </script>