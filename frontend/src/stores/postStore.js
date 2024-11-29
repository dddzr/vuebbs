import { defineStore } from 'pinia';
import { reactive } from 'vue';
import axios from 'axios';

export const usePostStore = defineStore('post', {
  state: () => ({
    selectedBoard: { id: 1, label: "공지사항" }, // 선택된 게시판 default
    posts: [],                                  // 게시글 목록    
    /* 필터 */
    filteredPosts: [],
    searchType: "title",
    filterKeyword: "",
    /* 페이지 */
    currentPage: 1,
    postsPerPage: 5,
    /* 현재 게시글 */
    mode: null, // view, create, edit
    currentPost:  reactive({}),
  }),
  actions: {
    setPosts(posts) {
      this.posts = posts;
    },
    setSelectedBoard(board) {
      this.selectedBoard = board;
    },
    setCurrentPage(page) {
      this.currentPage = page;
    },
    setMode(mode) {
      const allowedModes = ['view', 'create', 'edit'];

      if (!allowedModes.includes(mode)) {
          throw new Error(`Invalid mode: ${mode}. Allowed modes are: ${allowedModes.join(', ')}`);
      }

      this.mode = mode;  
    },
    setCurrentPost(post) {
      this.currentPost = post;      
    },
    setFilteredPosts() {
      this.filteredPosts = this.posts.filter((post) => {
        if(!post[this.searchType]) return false
        return post[this.searchType].includes(this.filterKeyword);
      });
    },     
    async fetchPosts(board) { 
      if (!board) return;
      try {
        const url = "/post/selectPostList/"+ board.id;
        const response = await axios.get(url);
        this.posts = response.data;
      } catch (error) {
        console.error("error in fetchPosts: ", error);
        throw error;
      }
      this.initFilter();
    },    
    initFilter() { 
      this.searchType = "title";
      this.filterKeyword = "";
      this.filteredPosts = this.posts;
    },
    /* 게시글 */
    async fetchPostById(postId) { 
      if (!postId) return;
      try {
        const url = "/post/selectPostDetail/"+ postId;
        const response = await axios.get(url);
        this.currentPost = response.data;
      } catch (error) {
        console.error("error in fetchPostById: ", error);
        throw error;
      }
      this.initFilter();
    }, 
    async insertPost(post){
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
    },
    async updatePost(post){
      if (!post) return;
      post.board_id = this.selectedBoard.id;
      try {
        const url = "/post/updatePost";
        const response = await axios.post(url, post);
        console.log(response);
      } catch (error) {
        console.error("error in updatePost: ", error);
        throw error;
      }
    },
    async deletePost(post){
      if (!post) return;
      try {
        const url = "/post/deletePost";
        const response = await axios.post(url, post);
        console.log(response);
      } catch (error) {
        console.error("error in deletePost: ", error);
        throw error;
      }
    },
    /* 댓글 */
    async fetchComments() { 
      if (!this.currentPost) return;
      try {
        const url = "/post/selectComments/"+ this.currentPost.post_id;
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.error("error in fetchComments: ", error);
        throw error;
      }
    }, 
    async insertComment(comment){
      if (!this.currentPost) return;
      comment.post_id = this.currentPost.post_id;
      try {
        const url = "/post/insertComment";
        const response = await axios.post(url, comment);
        console.log(response);
      } catch (error) {
        console.error("error in insertComment: ", error);
        throw error;
      }
    },
    async deleteComment(comment){
      try {
        const url = "/post/deleteComment";
        const response = await axios.post(url, comment);
        console.log(response);
      } catch (error) {
        console.error("error in deleteComment: ", error);
        throw error;
      }
    },
    /* 게시글 추가 기능 */
    async increaseLikeCount(post, user_id){
      if (!post) return;
      try {
        const url = "/post/increaseLikeCount";
        const response = await axios.post(url, null, {params: {post_id: post.post_id, user_id: user_id}});
        console.log(response);
      } catch (error) {
        console.error("error in increaseLikeCount: ", error);
        throw error;
      }
    },
    async increaseViewCount(post){
      if (!post) return;
      const postId = post.post_id;
      /*
        조회수 증가 방법
        1. 유저별 1번 증가
        2. 세션 단위 증가(브라우저 열려 있는 동안 1회) => 채용
        3. 시간 기반(쿠키/세션/DB 등에 조회시간 기록)
      */
      const viewedPosts = JSON.parse(sessionStorage.getItem('viewedPosts') || '[]');
      if (!viewedPosts.includes(postId)) {
        try {
          const url = "/post/increaseViewCount";
          const response = await axios.post(url, postId);
          console.log(response);
          // 세션 스토리지에 저장
          viewedPosts.push(postId);
          sessionStorage.setItem('viewedPosts', JSON.stringify(viewedPosts));
        } catch (error) {
          console.error("error in increaseViewCount: ", error);
          throw error;
        }
      }
    },
  },
  getters: { //상태 변경 감지 (watch 같은 것)
    paginatedPosts(state) {
      const start = (state.currentPage - 1) * state.postsPerPage;
      const end = start + state.postsPerPage;
      return state.filteredPosts.slice(start, end);
    },
    // 전체 페이지 수 반환 (전체 게시물 수 / 한 페이지당 게시물 수)
    totalPages(state) {
      return Math.ceil(state.filteredPosts.length / state.postsPerPage);
    }
  }
});
