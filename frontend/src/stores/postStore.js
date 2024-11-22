import { defineStore } from 'pinia';
import axios from 'axios';

export const usePostStore = defineStore('post', {
  state: () => ({
    selectedBoard: { id: 1, label: "공지사항" }, // 선택된 게시판 default
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
    async fetchPosts(board) { 
      // 게시글 목록을 가져오는 함수
      if (!board) return;
      try {
        const url = "/post/selectPost/"+ board.id;
        const response = await axios.get(url);
        this.posts = response.data;
      } catch (error) {
        console.error("error in fetchPosts: ", error);
        throw error;
      }
      this.initFilter();
    },    
    initFilter() { 
      console.log("initFilter");
      this.searchType = "title";
      this.filterKeyword = "";
      this.filteredPosts = this.posts;
    },
    async insertPost(post){
      // 게시글 등록
      if (!post) return;
      post.board_id = this.selectedBoard.id;
      try {
        const url = "/post/insertPost";
        const response = await axios.post(url, post);
        console.log(response);
      } catch (error) {
        console.error("error in insertPost: ", error);
        throw error;
      }
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
