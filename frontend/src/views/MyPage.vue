<template>
    <div class="mypage-container">
        <!-- 네비게이션 바 -->
        <mainNavbar />   
        <!-- 상단 프로필 영역 -->
        <div class="profile-section">
        <UserProfile />
        </div>

        <!-- 하단 T자 레이아웃 -->
        <div class="bottom-section">
            <div class="grid-layout">                
                <!-- 내 게시글 -->
                <!-- <div class="grid-item">
                    <UserActivitySwiper :activity_type="'posted'" @viewMore="handleViewMore('posted')"/>
                </div> -->
                <!-- 댓글 단 게시글 -->
                <div class="grid-item">
                    <UserActivitySwiper :activity_type="'comment'" @viewMore="handleViewMore('comment')"/>
                </div>
                <!-- 최근 본 게시글 -->
                <div class="grid-item">
                    <UserActivitySwiper :activity_type="'view'" @viewMore="handleViewMore('view')"/>
                </div>                
                <!-- 좋아요 한 게시글 -->
                <div class="grid-item">
                    <UserActivitySwiper :activity_type="'like'" @viewMore="handleViewMore('like')"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import mainNavbar from '@/components/mainNavbar.vue';
    import UserProfile from '@/components/UserProfile.vue';
    import UserActivitySwiper from '@/components/UserActivitySwiper.vue';

    const handleViewMore = (type) => {
        alert(type + "더보기 미구현");
    };
</script>
  
<style scoped>
.mypage-container {
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 70px); /* navbar and padding */    
    max-width: 100vw;
}
  
.profile-section {
  margin-bottom: 20px;
}

.bottom-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.grid-layout {
  display: grid;
  grid-template-columns: 49% 49%; /* 2 열 부모 높이 기준 반반*/
  grid-template-rows: repeat(2, 1fr); /* 2 행 각각동일 비율*/
  gap: 20px;   
  max-width: 100vw;
}

.grid-item {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 220px;
  flex: 1
}
</style>
  