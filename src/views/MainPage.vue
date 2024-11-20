<template>
  <div>
    <!-- 네비게이션 바 -->
    <div class="navbar">
      <div v-for="(menuItem, index) in categories" :key="index" class="menu-item">
        <button @click="navigateTo(menuItem)">
          {{ menuItem.label }}
        </button>

        <!-- 하위 메뉴가 있으면 드롭다운처럼 표시 -->
        <div v-if="menuItem.subMenu" class="submenu">
          <div v-for="(subMenuItem, subIndex) in menuItem.subMenu" :key="subIndex" class="submenu-item">
            <button @click="navigateTo(subMenuItem)">
              {{ subMenuItem.label }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="board">
      <div class="board_header">
        <h1>게시판</h1>
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
import '@/assets/styles/basic.css'; 
import '@/assets/styles/main.css'; 

export default {
  name: "MainPage",
  components: {
    // Pagination,
  },
  data() {
    return {
      categories: [
        { value: "", label: "전체" },
        { value: "공지사항", label: "공지사항", subMenu: [] },
        { value: "자유게시판", label: "자유게시판" },
        { value: "Q&A", label: "Q&A" }
      ], // DB에서 불러오게 해야함.
      posts: [
        { id: 1, category: "공지사항", title: "공지1", author: "관리자", date: "2024-11-19", view_count: 0, like_count: 2, comment_count: 0 },
        { id: 2, category: "자유게시판", title: "안녕하세요", author: "홍길동", date: "2024-11-18", view_count: 0, like_count: 2, comment_count: 0   },
        { id: 3, category: "Q&A", title: "질문드립니다", author: "김철수", date: "2024-11-17", view_count: 0, like_count: 2, comment_count: 0   },
        // DB에서 불러오게 해야함.
      ],
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
  methods: {
    goToDetail(post) {
      this.$router.push({
        name: "DetailPost",
        params: { id: post.id },
        query: { post: JSON.stringify(post) },
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