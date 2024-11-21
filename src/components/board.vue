<template>
    <div>
      <!-- 로딩 화면 -->
      <loading-spinner v-if="isLoading" />
      <div v-else class="board">
        <div class="board-header">
            <h1>{{ postStore.selectedBoard.label }}</h1>
            <div></div>
            <button @click="goToCreate">게시글 작성</button>
        </div>

        <!-- 검색 필터 -->
        <div class="filter">
            <input
            type="text"
            placeholder="검색"
            v-model="postStore.filterKeyword"
            />      
            <!-- 검색 조건 셀렉트박스 -->
            <div class="filter-options">
            <select v-model="postStore.searchType">
                <option value="title">제목</option>
                <option value="author">작성자</option>
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
            <tr v-for="post in postStore.paginatedPosts" :key="post.id" @click="goToDetail(post)">
                <!-- <td>{{ post.category }}</td> -->
                <td>{{ post.title }}</td>
                <td>{{ post.author }}</td>
                <td>{{ post.date }}</td>
                <td>{{ post.view_count }}</td>
                <td>{{ post.like_count }}</td>
                <td>{{ post.comment_count }}</td>
            </tr>
            </tbody>
        </table>
        
        <!-- 페이징 -->
        <!-- <Pagination
            v-model:currentPage="currentPage"
            :total="filteredPosts.length"
            :per-page="postsPerPage"
            @change="changePage"
        /> -->
        </div>
    </div>
</template>


<script>
// import { storeToRefs } from 'pinia';
import { usePostStore } from '@/stores/postStore';
import loadingSpinner from '@/components/loadingSpinner';
// import Pagination from "vue3-pagination"; //페이지
import '@/assets/styles/boardPage.css';

export default {
  name: "BoardPage",
  setup() {
    const postStore = usePostStore();
    return {postStore};
  },
  components: {
    loadingSpinner
    // Pagination,
  },
  props: {
    selectedBoard: Object
  },
  data() {
    return {
      isLoading: false,
      currentPage: 1,
      postsPerPage: 5,
    };
  },  
  async mounted() {
    this.isLoading = true; // 로딩 시작
      try {
        await this.postStore.fetchPosts(this.postStore.selectedBoard);
      } catch (error) {
        console.error("게시글 로딩 중 오류 발생:", error);
      } finally {
        this.isLoading = false; // 로딩 종료
      }
  },
  methods: {
    goToDetail(post) {
      this.$router.push({
        name: "PostDetailPage",
        params: { id: post.id }, //url 경로
        query: { post: JSON.stringify(post), mode: "detail" },
      });
    },
    goToCreate() {
      this.$router.push({
        name: "PostDetailPage",
        query: { mode: "create" },
      });
    },
    navigateTo(menuItem) {
      if (menuItem.path) {
        this.$router.push(menuItem.path);
      }
    },
    applyFilter() {
      this.postStore.setfilteredPosts();
    },
    changePage(page) {
      this.currentPage = page;
    },
  },
};
</script>