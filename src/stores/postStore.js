import { defineStore } from 'pinia';

export const usePostStore = defineStore('post', {
  state: () => ({
    selectedBoard: { value: 1, label: "공지사항" }, // 선택된 게시판 default
    posts: [],           // 게시글 목록    
    //필터
    filteredPosts: [],
    searchType: "title",
    filterKeyword: "",
    //페이지
    currentPage: 1,
    postsPerPage: 10,
    //게시글
    postDetail: null,
  }),
  actions: {
    setPosts(posts) {
      this.posts = posts;
    },
    setSelectedBoard(board) {
      this.selectedBoard = board;
    },
    setPostDetail(post) {
      this.postDetail = post;      
    },
    setCurrentPage(page) {
      this.currentPage = page;
    },
    setfilteredPosts() {
      this.filteredPosts = this.posts.filter((post) => {
        return post[this.searchType].includes(this.filterKeyword);
      });
    },     
    fetchPosts(board) { 
      // 게시글 목록을 가져오는 함수
      console.log("fetchPosts");
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
        { id: 3, title: '두 번째 게시글', author: '작성자2', date: '2024-01-02', view_count: 20, like_count: 8, comment_count: 3 },
        { id: 4, title: '두 번째 게시글', author: '작성자2', date: '2024-01-02', view_count: 20, like_count: 8, comment_count: 3 },
        { id: 5, title: '두 번째 게시글', author: '작성자2', date: '2024-01-02', view_count: 20, like_count: 8, comment_count: 3 },
        { id: 6, title: '두 번째 게시글', author: '작성자2', date: '2024-01-02', view_count: 20, like_count: 8, comment_count: 3 },
        { id: 7, title: '두 번째 게시글', author: '작성자2', date: '2024-01-02', view_count: 20, like_count: 8, comment_count: 3 },
        { id: 8, title: '두 번째 게시글', author: '작성자2', date: '2024-01-02', view_count: 20, like_count: 8, comment_count: 3 },
        { id: 9, title: '두 번째 게시글', author: '작성자2', date: '2024-01-02', view_count: 20, like_count: 8, comment_count: 3 },
        { id: 10, title: '10 번째 게시글', author: '작성자2', date: '2024-01-02', view_count: 20, like_count: 8, comment_count: 3 },
        { id: 11, title: '두 번째 게시글', author: '작성자2', date: '2024-01-02', view_count: 20, like_count: 8, comment_count: 3 },
        { id: 12, title: '두 번째 게시글', author: '작성자2', date: '2024-01-02', view_count: 20, like_count: 8, comment_count: 3 },
        { id: 13, title: '두 번째 게시글', author: '작성자2', date: '2024-01-02', view_count: 20, like_count: 8, comment_count: 3 },
        { id: 14, title: '두 번째 게시글', author: '작성자2', date: '2024-01-02', view_count: 20, like_count: 8, comment_count: 3 },
        // 추가적인 게시글들...
      ];

      this.initFilter();
    },    
    initFilter() { 
      console.log("initFilter");
      this.searchType = "title";
      this.filterKeyword = "";
      this.filteredPosts = this.posts;
    },
    insertPost(){
      
    }
  },
  getters: { //상태 변경 감지 (watch 같은 것)
    paginatedPosts(state) {
      console.log("pageing");
      const start = (state.currentPage - 1) * state.postsPerPage;
      const end = start + state.postsPerPage;
      return state.filteredPosts.slice(start, end);
    }
  }
});
