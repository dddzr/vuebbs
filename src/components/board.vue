<template>
    <div>
        <div class="board">
        <div class="board_header">
            <h1>{{ selectedBoard.label }}</h1>
            <div></div>
            <button @click="goToCreate">게시글 작성</button>
        </div>

        <!-- 검색 필터 -->
        <div class="filter">
            <input
            type="text"
            placeholder="검색"
            v-model="filters.category"
            />      
            <!-- 검색 조건 셀렉트박스 -->
            <div class="filter-options">
            <select v-model="searchType" @change="applyFilter">
                <option value="all">전체</option>
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
            <tr v-for="post in paginatedPosts" :key="post.id" @click="goToDetail(post)">
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
// import Pagination from "vue3-pagination"; //페이지
import '@/assets/styles/boardPage.css'; 

export default {
  name: "BoardPage",
  components: {
    // Pagination,
  },
  props: {
    selectedBoard: Object
  },
  data() {
    return {
      posts: [],
      filters: {
        category: "",
        title: "",
        author: "",
      },
      currentPage: 1,
      postsPerPage: 5,
    };
  },
  computed: {
    filteredPosts() {
      return this.posts.filter((post) => {
        return (
          post.category.includes(this.filters.category) &&
          post.title.includes(this.filters.title) &&
          post.author.includes(this.filters.author)
        );
      });
    },
    paginatedPosts() {
      const start = (this.currentPage - 1) * this.postsPerPage;
      const end = start + this.postsPerPage;
      return this.filteredPosts.slice(start, end);
    },
  },
  watch: {
    // posts() {
    //   this.currentPage = 1;
    // },
    selectedBoard: {
      handler(newBoard) {
        this.fetchPosts(newBoard);
      },
      immediate: true
    }
  },
  methods: {
    async fetchPosts(board) {
      if (!board) return; // board 정보가 없으면 처리하지 않음

        // 예시: selectedBoard.category에 따라 DB에서 게시글을 가져오는 로직
        // 여기서는 임시로 데이터를 넣어두지만, 실제로는 API 호출을 통해 데이터를 가져와야 합니다.

        // 예시: DB에서 데이터를 가져오는 함수 (axios 또는 다른 방법으로)
        // try {
        //   const response = await fetch(`/api/posts?category=${board.category}`);
        //   const data = await response.json();
        //   this.posts = data; // 가져온 데이터로 posts 업데이트
        // } catch (error) {
        //   console.error("게시글을 불러오는 데 실패했습니다:", error);
        // }

      this.posts = [
        { id: 1, category: "공지사항", title: "공지1", author: "관리자", date: "2024-11-19", view_count: 0, like_count: 2, comment_count: 0 },
        { id: 2, category: "자유게시판", title: "안녕하세요", author: "홍길동", date: "2024-11-18", view_count: 0, like_count: 2, comment_count: 0   },
        { id: 3, category: "Q&A", title: "질문드립니다", author: "김철수", date: "2024-11-17", view_count: 0, like_count: 2, comment_count: 0   },
      ];
    },
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
      this.currentPage = 1; // 필터 변경 시 첫 페이지로 이동
    },
    changePage(page) {
      this.currentPage = page;
    },
  },
};
</script>