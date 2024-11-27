<template>
    <div class="post-container">
      <!-- 네비게이션 바 -->
      <mainNavbar />
      <!-- 로딩 화면 -->
      <loading-spinner v-if="uiStore.isLoading" />
  
      <div class="page-title-bar">
        <h1 v-if="mode === 'create'">게시글 작성</h1>
        <h1 v-if="mode === 'edit'">게시글 수정</h1>
        <button style="float: right;" @click="goBack">
          목록
        </button>
      </div>    
  
      <div class="post-info">
        <postForm :mode=this.mode @submitPost="handleSubmit"/>
      </div>    
    </div>
  </template>
  
  <script>
  import { useUIStore } from '@/stores/uiStore';
  import { usePostStore } from '@/stores/postStore';
  import mainNavbar from '@/components/mainNavbar.vue';
  import loadingSpinner from '@/components/loadingSpinner';
  import postForm from '@/components/postForm.vue';
  import '@/assets/styles/postDetailPage.css'; 
  
  export default {
    name: "CreatePostPage",
    components: {
      mainNavbar,
      loadingSpinner,
      postForm
    },
    setup() {
      const postStore = usePostStore();
      const uiStore = useUIStore();
      return {postStore, uiStore};
    },
    props: {
      mode: {
        type: String,
        required: true,
        validator: (value) => ["view", "create", "edit"].includes(value),
      }
    },
    methods: {
      async handleSubmit(formData) {
        console.log(this.mode);
        if(this.mode == "create"){
          this.uiStore.setIsLoading(true);
          try {
            await this.postStore.insertPost(formData);
            alert("게시글이 작성되었습니다.");
            this.$router.push("/");
          } catch (error) {
            alert("게시글이 작성에 실패했습니다.");
            console.error("error in insertPost: ", error);
          } finally {
            this.uiStore.setIsLoading(false);
          }
        } else if(this.mode == "edit") {
          this.uiStore.setIsLoading(true);
          try {
            await this.postStore.updatePost(formData);
            alert("게시글이 수정되었습니다.");
            this.$router.push({
              name: "ViewPostPage",
              params: { postId: formData.post_id },
              query: { mode: "view" },
            });
          } catch (error) {
            alert("게시글이 수정에 실패했습니다.");
            console.error("error in updatePost: ", error);
          } finally {
            this.uiStore.setIsLoading(false);
          }
        }
      },
      goBack() {
        this.$router.push("/");
      },
    },
  };
  </script>