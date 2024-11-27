<template>
  <div>
    <!-- 로딩 화면 -->
    <loading-spinner v-if="uiStore.isLoading" />
    <div v-else class="board">
      <div class="board-header">
          <h1>{{ postStore.selectedBoard.label }}</h1>
          <div></div>
          <button @click="goToCreatePost">게시글 작성</button>
      </div>

      <!-- 검색 필터 -->
      <div class="filter">
          <input
          type="text"
          placeholder="검색"
          v-model="postStore.filterKeyword"
          @keyup.enter="applyFilter()"
          />      
          <!-- 검색 조건 셀렉트박스 -->
          <div class="filter-options">
          <select v-model="postStore.searchType">
              <option value="title">제목</option>
              <option value="author_nickname">작성자</option>
              <option value="contents">내용</option>
          </select>
          </div>
          <button @click="applyFilter()">검색</button>
      </div>
      
      <!-- 게시글 목록 -->
      <table class="post-list">
          <colgroup>
          <!-- <col style="width: 10%;"> --> <!-- 카테고리 열 -->
          <col style="width: 45%;"> <!-- 제목 열 -->
          <col style="width: 12%;"> <!-- 작성자 열 -->
          <col style="width: 12%;"> <!-- 날짜 열 -->
          <col style="width: 7%;"> <!-- 조회 열 -->
          <col style="width: 7%;"> <!-- 추천 열 -->
          <col style="width: 7%;"> <!-- 댓글 열 -->
          </colgroup>
          <thead>
          <tr>
              <!-- <th>카테고리</th> -->
              <th>제목</th>
              <th>작성자</th>
              <th>날짜</th>
              <th>조회</th>
              <th>추천</th>
              <th>댓글</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="post in postStore.paginatedPosts" :key="post.post_id">
              <!-- <td>{{ post.category }}</td> -->
              <td @click="goToViewPost(post)">{{ post.title }}</td>
              <td>{{ post.author_nickname }}</td>
              <td>{{ post.created_at_formatted }}</td>
              <td>{{ post.view_count }}</td>
              <td>{{ post.like_count }}</td>
              <td>{{ post.comment_count }}</td>
          </tr>
          </tbody>
      </table>
      
      <!-- 페이징 -->
        <div class="pagination-container">
        <v-pagination
          v-model="postStore.currentPage"
          :pages="postStore.totalPages"
          :range-size="3"
          active-color="#DCEDFF"
          @update:modelValue="changePage"
          :hideFirstButton="false"
          :hideLastButton="false"
        />
        </div>
      </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUIStore } from '@/stores/uiStore';
import { usePostStore } from '@/stores/postStore';
import loadingSpinner from '@/components/loadingSpinner';
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import '@/assets/styles/boardPage.css';

const postStore = usePostStore();
const uiStore = useUIStore();
const router = useRouter();

const fetchPosts = async () => {
  uiStore.setIsLoading(true);
  try {
    await postStore.fetchPosts(postStore.selectedBoard);
  } catch (error) {
    console.error("Error in loading post list: ", error);
  } finally {
    uiStore.setIsLoading(false);
  }
};

onMounted(() => {
  fetchPosts();
});

const goToViewPost = (post) => {
  postStore.setCurrentPost(post);
  postStore.setMode("view");
  router.push({
    name: "ViewPostPage",
    params: { postId: post.post_id },
    query: { mode: "view" },
  });
};

const goToCreatePost = () => {
  postStore.setMode("create");
  router.push({
    name: "CreatePostPage",
    query: { mode: "create" },
  });
};

const applyFilter = () => {
  postStore.setFilteredPosts();
};

const changePage = (page) => {
  postStore.setCurrentPage(page);
};
</script>

<style scpoed>
.pagination-container {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-top: 10px;
}
</style>