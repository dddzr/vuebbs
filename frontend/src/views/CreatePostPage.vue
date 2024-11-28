<template>
    <div class="post-container">
      <!-- 네비게이션 바 -->
      <mainNavbar />
      <!-- 로딩 화면 -->
      <loading-spinner v-if="uiStore.isLoading" />
  
      <div class="page-title-bar">
        <h1 v-if="postStore.mode === 'create'">게시글 작성</h1>
        <h1 v-if="postStore.mode === 'edit'">게시글 수정</h1>
      </div>    
  
      <div class="post-info">
        <postForm @submitPost="handleSubmit"/>
      </div>    
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useUIStore } from '@/stores/uiStore';
  import { usePostStore } from '@/stores/postStore';
  import mainNavbar from '@/components/mainNavbar.vue';
  import loadingSpinner from '@/components/loadingSpinner';
  import postForm from '@/components/postForm.vue';
  import '@/assets/styles/postDetailPage.css'; 

  const postStore = usePostStore();
  const uiStore = useUIStore();  
  const router = useRouter();
  const route = useRoute();

  onMounted(() => {    
    postStore.setMode(route.query.mode);
  });

  const handleSubmit = async(formData) => {
    console.log(postStore.mode);
    if(postStore.mode == "create"){
      uiStore.setIsLoading(true);
      try {
        await postStore.insertPost(formData);
        alert("게시글이 작성되었습니다.");
        router.push("/");
      } catch (error) {
        alert("게시글이 작성에 실패했습니다.");
        console.error("error in insertPost: ", error);
      } finally {
        uiStore.setIsLoading(false);
      }
    } else if(postStore.mode == "edit") {
      uiStore.setIsLoading(true);
      try {
        await postStore.updatePost(formData);
        alert("게시글이 수정되었습니다.");
        router.push({
          name: "ViewPostPage",
          params: { postId: formData.post_id },
          query: { mode: "view" },
        });
      } catch (error) {
        alert("게시글이 수정에 실패했습니다.");
        console.error("error in updatePost: ", error);
      } finally {
        uiStore.setIsLoading(false);
      }
    }
  };
</script>