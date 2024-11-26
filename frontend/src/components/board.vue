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
            <tr v-for="post in postStore.paginatedPosts" :key="post.post_id">
                <!-- <td>{{ post.category }}</td> -->
                <td @click="goToVeiwPost(post)">{{ post.title }}</td>
                <td>{{ post.author }}</td>
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
          <!--
            pages	Number		Total number of pages
            rangeSize	Number	1	Number of page around the current page
            activeColor	String	#DCEDFF	Background color of the current page
            hideFirstButton	Boolean	false	Hide the button to go to the first page
            hideLastButton	Boolean	false	Hide the button to go to the last page  
          -->
         </div>
        </div>
    </div>
</template>


<script>
// import { storeToRefs } from 'pinia';
import { useUIStore } from '@/stores/uiStore';
import { usePostStore } from '@/stores/postStore';
import loadingSpinner from '@/components/loadingSpinner';
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import '@/assets/styles/boardPage.css';

export default {
  name: "BoardPage",
  setup() {
    const postStore = usePostStore();
    const uiStore = useUIStore();
    return {postStore, uiStore};
  },
  components: {
    loadingSpinner,
    VPagination
  },
  props: {
    selectedBoard: Object
  },
  data() {
    return {
      currentPage: 1,
      postsPerPage: 5,
    };
  },  
  async mounted() {
    this.uiStore.setIsLoading(true);
      try {
        await this.postStore.fetchPosts(this.postStore.selectedBoard);
      } catch (error) {
        console.error("error in Loading Post List: ", error);
      } finally {
        this.uiStore.setIsLoading(false);
      }
  },
  methods: {
    goToVeiwPost(post) {
      /* 데이터 넘기는 방법.
      1. emit (부모-자식간 데이터 전달)
      this.$emit('goToVeiwPost', post);
      - 읽기페이지를 부모자식 연결해야하고,
      - 새로 고침시 사라진다.
      
      2.라우터 이용
        this.$router.push({
        name: "ViewPostPage",
        params: { id: post.post_id },
        query: { post: JSON.stringify(post), mode: "view" },
      });
      - query에 전달하는 데이터는 url 파라미터
      - 새로 고침 시 유지 되지만 url 길어지고 데이터 노출

      3. 스토어 이용    
      
      */
      // 스토어에 게시글 상세 정보를 저장
      this.postStore.setCurrentPost(post);
      // 상세페이지로 이동
      this.$router.push({
        name: "ViewPostPage",
        params: { postId: post.post_id },
        query: { mode: "view" },
      });

    },
    goToCreatePost() {
      this.$router.push({
        name: "CreatePostPage",
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
      this.postStore.setCurrentPage(page);
    },
  },
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