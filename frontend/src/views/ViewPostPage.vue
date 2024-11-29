<template>
  <div class="post-container">
    <!-- 네비게이션 바 -->
    <mainNavbar />
    <!-- 로딩 화면 -->
    <loading-spinner v-if="uiStore.isLoading" />

    <div class="page-title-bar">
      <h1 v-if="postStore.mode === 'view'">게시글 상세</h1>
      <button v-show="form?.user_id == userStore.user?.user_id" style="float: right; margin-right: 10px;" @click="goUpdate">
        수정
      </button>    
      <button style="float: right;" @click="goBack">
        목록
      </button>       
      <button v-show="form?.user_id == userStore.user?.user_id" style="float: right; margin-left: 10px;" @click="handleDelete">
        삭제
      </button>
    </div>    

    <postForm v-if="postDataReady"/>
    <div class="reaction-container" v-if="postStore.mode === 'view'">
      <div class="views">
        👀 조회수: {{ form?.view_count || 0 }}
      </div>
      <div @click="handleLike" class="likes" style="display: contents;">
        <div v-show="!isLikedPost">❤️</div><div v-show="isLikedPost">🩶</div> 좋아요: {{ form?.like_count || 0 }}
      </div>
      
    </div>
    <!-- 좋아요 애니메이션 -->
    <div v-if="showHeart" class="like-animation">
      <span :class="isLikedPost ? 'unliked' : 'liked'">
          ❤️
      </span>
    </div>

    <postComment v-if="postDataReady"/>
  </div>
</template>
  
<script setup>
  import { ref, onMounted } from 'vue';  
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
  import postComment from '@/components/postComment.vue';
  import '@/assets/styles/postDetailPage.css'; 

  const postStore = usePostStore();
  const uiStore = useUIStore();
  const userStore = useUserStore();
  const router = useRouter(); // 라우터 인스턴스(라우팅 관련 동작을 수행)
  const route = useRoute(); //현재 라우트(활성화된 URL에 대한 세부 정보)

  let form = postStore.currentPost;
  let showHeart = ref(false);
  let isLikedPost = ref(false);
  let postDataReady = ref(false);

  onMounted(async () => {
    const postId = route.params.postId;
    const mode = route.query.mode;
    postStore.setMode(mode);
    await postStore.fetchPostById(postId);
    postDataReady.value = true; //게시글을 가져온 다음 댓글컴포넌트 로드
    if(userStore.isLoggedIn){
      isLikedPost.value = await userStore.checkLikedPost(postId);
    }
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
    if (isLikedPost.value) {
      alert("이미 좋아요 한 글입니다. TODO: unLike");
      return;
    }
    if(!userStore.isLoggedIn){
      alert("로그인 후에 이용해주세요.");
      return;
    }
    isLikedPost.value = true;
    try{
      postStore.increaseLikeCount(form, userStore.user.user_id); // TODO: DB연동, 사용자 별 1회만 누르도록/좋아요 취소
      form.like_count++;
    }catch{
      alert("좋아요 실패.");
    }    
    showHeart.value = true;
    setTimeout(() => {
      showHeart.value = false;
    }, 1500);
  };

  const goBack = () => {
    router.push("/");
  };

  const goUpdate = () => {
      postStore.setMode("edit");
      router.push({
      name: "CreatePostPage",
      query: { mode: "edit" },
    });
  };

  const handleDelete = () => {
    if(confirm("게시글을 삭제하시겠습니까?")){
      postStore.deletePost(form);
      router.push("/");
    }        
  };
</script>