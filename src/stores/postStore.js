import { defineStore } from 'pinia';

export const usePostStore = defineStore('post', {
  state: () => ({
    selectedBoard: { value: 1, label: "공지사항" }, // 선택된 게시판 default
    posts: [],           // 게시글 목록
    filters: {           // 게시글 필터링 조건
      title: '',
      author: ''
    },
    currentPage: 1,     // 현재 페이지
    postDetail: null,   // 게시글 상세 정보
    createState: null,  // 게시글 작성 상태
    likeStatus: {}      // 게시글 좋아요 상태
  }),
  actions: {
    setPosts(posts) {
      this.posts = posts;
    },
    setSelectedBoard(board) {
      this.selectedBoard = board;
    },
    // 게시글 목록을 가져오는 함수 (예시)
    fetchPosts(board) {
        console.log("test");
        if (!board) return; // board 정보가 없으면 처리하지 않음
        
        // 예시: 게시판에 따라 DB에서 게시글을 가져오는 로직

        // 예시: DB에서 데이터를 가져오는 함수 (axios 또는 다른 방법으로)
        // try {
        //   const response = await fetch(`/api/posts?boardId=${board.boardId}`);
        //   const data = await response.json();
        //   this.posts = data; // 가져온 데이터로 posts 업데이트
        // } catch (error) {
        //   console.error("게시글을 불러오는 데 실패했습니다:", error);
        // }
        this.posts = [
          { id: 1, title: '첫 번째 게시글', author: '작성자1', date: '2024-01-01', view_count: 10, like_count: 5, comment_count: 2 },
          { id: 2, title: '두 번째 게시글', author: '작성자2', date: '2024-01-02', view_count: 20, like_count: 8, comment_count: 3 },
          // 추가적인 게시글들...
        ];
    },
    setFilters(filters) {
      this.filters = filters;
    },
    setPostDetail(post) {
      this.postDetail = post;
    },
    setCreateState(state) {
      this.createState = state;
    },
    setLikeStatus(postId, status) {
      this.likeStatus[postId] = status;
    },
    setCurrentPage(page) {
      this.currentPage = page;
    }
  },
  getters: {
    filteredPosts(state) {
      return state.posts.filter(post => 
        post.title.includes(state.filters.title) &&
        post.author.includes(state.filters.author) &&
        post.category.includes(state.filters.category)
      );
    },
    paginatedPosts(state) {
      const start = (state.currentPage - 1) * state.postsPerPage;
      const end = start + state.postsPerPage;
      return state.filteredPosts.slice(start, end);
    }
  }
});
