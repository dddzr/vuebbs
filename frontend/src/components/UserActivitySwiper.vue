<template>
  <div style="height: 100%;">
      <!-- 로딩 화면 -->
      <loading-spinner v-if=uiStore.isLoading style="height: inherit;" />
      <div v-else class="activity-records">
      <div class="section-header">
        <h3>{{ title }}</h3>
        <button @click="viewMore">더보기</button>
      </div>
      <swiper :slides-per-view="2.5" spaceBetween="10" :loop=false style="width: 100%;">
        <swiper-slide v-for="post in activityRecords" :key="post.id" @click="goToViewPost(post)">
          <div class="thumbnail">
            <img src="@/assets/img/logo.png" alt="Thumbnail" /> <!-- 썸네일 이미지 TODO: DB에 컬럼 추가 및 dto 수정 -->
          </div>
          <div class="post-item">{{ post.title }}</div>
          <div class="post-item">{{ post.user_id }}</div>
          <div class="post-item">{{ post.created_at_formatted }}</div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
   
<script setup>
  import { onMounted, computed, defineProps, defineEmits } from "vue";
  import { useRouter } from 'vue-router';
  import { useUIStore } from '@/stores/uiStore';
  import { useUserStore } from '@/stores/userStore';
  import { usePostStore } from '@/stores/postStore';
  import loadingSpinner from '@/components/loadingSpinner';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/swiper-bundle.css';

  const userStore = useUserStore();
  const uiStore = useUIStore();
  const postStore = usePostStore();
  const router = useRouter();

  const props = defineProps({
    activity_type :{
      type: String,
      Required: true
    }
  });


  let title = '';

  onMounted(async () => {
    if (props.activity_type === 'posted') {
      title = '내 게시글';
    } else if (props.activity_type === 'comment') {
      title = '댓글 단 게시글';
    } else if (props.activity_type === 'view') {
      title = '최근 본 게시글';
    } else if (props.activity_type === 'like') {
      title = '좋아요 한 게시글';
    }

    uiStore.setIsLoading(true);
    try {
      await userStore.fetchUserActivity(props.activity_type);
    } catch (error) {
      console.error("error in fetchUserActivity: ", error);
    } finally {
      uiStore.setIsLoading(false);
    }
  });
  const activityRecords = computed(() => userStore.userActivity[props.activity_type]);

  const emit = defineEmits(["viewMore"]);

  const viewMore = () => {
      emit("viewMore");
  }

  const goToViewPost = (post) => {
  postStore.setCurrentPost(post);
  postStore.setMode("view");
  router.push({
    name: "ViewPostPage",
    params: { postId: post.post_id },
    query: { mode: "view" },
  });
};
</script>
  
<style scoped>
  .activity-records {
    display: flex;
    flex-direction: column;
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 10px;
  }
  
  .swiper-slide {
    display: flex;
    flex-direction: column;
    background-color: #f4f4f4;
    border-radius: 8px;
    padding: 10px;
    height: 150px;
    cursor: pointer;
  }
  
  .post-item {
    white-space: nowrap;          /* 텍스트 줄바꿈 방지 */
    overflow: hidden;            /* 텍스트가 컨테이너를 넘으면 숨기기 */
    text-overflow: ellipsis;     /* 잘린 부분에 ... 표시 */
  }

  .thumbnail {
    top: 0px;
    img {
      width: 100%;
      height: 60px;
      object-fit: cover; /* 이미지를 잘라서 비율을 맞춤 */
    }
  }
  h3 {
    flex-grow: 1; /* 제목이 남은 공간을 차지하도록 */
    margin: 0; /* 기본 마진 제거 */
  }
</style>
  