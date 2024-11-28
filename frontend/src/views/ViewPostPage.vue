<template>
  <div class="post-container">
    <!-- 네비게이션 바 -->
    <mainNavbar />
    <!-- 로딩 화면 -->
    <loading-spinner v-if="uiStore.isLoading" />

    <div class="page-title-bar">
      <h1 v-if="postStore.mode === 'view'">게시글 상세</h1>
      <button v-show="form?.author == userStore.user?.user_id" style="float: right; margin-right: 10px;" @click="goUpdate">
        수정
      </button>    
      <button style="float: right;" @click="goBack">
        목록
      </button>       
      <button v-show="form?.author == userStore.user?.user_id" style="float: right; margin-left: 10px;" @click="handleDelete">
        삭제
      </button>
    </div>    

    <postForm/>
    <div class="reaction-container" v-if="postStore.mode === 'view'">
      <div class="views">
        👀 조회수: {{ form?.view_count || 0 }}
      </div>
      <div @click="handleLike" class="likes">
        ❤️ 좋아요: {{ form?.like_count || 0 }}
      </div>
    </div>
    <!-- 좋아요 애니메이션 -->
    <div v-if="showHeart" class="like-animation">
      ❤️
    </div>

  </div>
</template>
  
<script setup>
  import { ref, reactive, onMounted } from 'vue';  
  // ref: int, Stirng (.value로 접근)
  // reactive: 배열, 객체
  import { useRouter, useRoute } from 'vue-router';
  import { useUIStore } from '@/stores/uiStore';
  import { useUserStore } from '@/stores/userStore';
  import { usePostStore } from '@/stores/postStore';
  import { onBeforeRouteLeave } from 'vue-router';
  import mainNavbar from '@/components/mainNavbar.vue';
  import loadingSpinner from '@/components/loadingSpinner.vue';
  import postForm from '@/components/postForm.vue';
  import '@/assets/styles/postDetailPage.css'; 

  const postStore = usePostStore();
  const uiStore = useUIStore();
  const userStore = useUserStore();
  const router = useRouter(); // 라우터 인스턴스(라우팅 관련 동작을 수행)
  const route = useRoute(); //현재 라우트(활성화된 URL에 대한 세부 정보)

  let form = reactive({ ...postStore.currentPost }); // 수정 시 currentPost즉시 변경x.
  let isLikeDisabled = ref(false);
  let showHeart = ref(false);

  onMounted(async () => {    
    const postId = route.params.postId;
      await postStore.fetchPostById(postId);
      form = postStore.currentPost;
      form.view_count++;
  });

  onBeforeRouteLeave((to, from, next) => {
    if (to.name !== 'CreatePostPage' || to.query.mode !== 'edit') {
      postStore.setCurrentPost(null);
    }
    next();
  });

  const handleLike = () => {
    if (isLikeDisabled.value) {
      alert("이미 좋아요 한 글입니다.");
      return;
    }
    isLikeDisabled.value = true;

    // this.postStore.increaseLikeCount(this.form); // TODO: DB연동, 사용자 별 1회만 누르도록/좋아요 취소
    form.like_count++;
    showHeart.value = true;
    setTimeout(() => {
      showHeart.value = false;
    }, 1500);
  };

  const goBack = () => {
    router.push("/");
  };

  const goUpdate = () => {
      this.postStore.setMode("edit");
      router.push({
      name: "CreatePostPage",
      query: { mode: "edit" },
    });
  };

  const handleDelete = () => {
    if(confirm("게시글을 삭제하시겠습니까?")){
      this.postStore.deletePost(this.form);
      router.push("/");
    }        
  };
</script>