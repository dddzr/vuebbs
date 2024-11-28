<template>
    <div class="activity-records">
      <div class="section-header">
        <h3>{{ title }}</h3>
        <button @click="viewMore">더보기</button>
      </div>
      <swiper :slides-per-view="2.5" spaceBetween="10" :loop=false style="width: 100%;">
        <swiper-slide v-for="post in activityRecords" :key="post.id" style="height: 200px;">
          <div class="post-item">{{ post.title }}</div>
        </swiper-slide>
      </swiper>
    </div>
</template>
   
<script setup>
  import { onMounted, computed, defineProps, defineEmits } from "vue";
  import { useUserStore } from '@/stores/userStore';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/swiper-bundle.css';

  const userStore = useUserStore();

  const props = defineProps({
    activity_type :{
      type: String,
      Required: true
    }
  });


  let title = '';

  onMounted(() => {
    // Set the title based on the activity_type
    if (props.activity_type === 'posted') {
      title = '내 게시글';
    } else if (props.activity_type === 'comment') {
      title = '댓글 단 게시글';
    } else if (props.activity_type === 'view') {
      title = '최근 본 게시글';
    } else if (props.activity_type === 'like') {
      title = '좋아요 한 게시글';
    }

    // Fetch data based on the activity_type
      userStore.fetchUserActivity(props.activity_type);
  });
  const activityRecords = computed(() => userStore.userActivity[props.activity_type]);

  const emit = defineEmits(["viewMore"]);

  const viewMore = () => {
      emit("viewMore");
  }
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
    justify-content: center;
    align-items: center;
    background-color: #f4f4f4;
    border-radius: 8px;
    padding: 10px;
  }
  
  .post-item {
    text-align: center;
  }
</style>
  