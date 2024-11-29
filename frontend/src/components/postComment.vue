<template>
  <div class="comment-section">
    <!-- 댓글 목록 -->
    <div class="comments">
      <div
        class="comment"
        v-for="(comment, index) in nestedComments"
        :key="index"
        :style="{ marginLeft: comment.level * 20 + 'px' }"
      >
        <div class="comment-contents">
          <div class="comment-info">            
            <p class="comment-author">{{ comment.author }}</p>
            <p class="comment-content">{{ comment.content }}</p>
          </div>
          <label v-if="comment.level < 2" class="reply-button" @click="toggleReply(comment.comment_id)">
            답글
          </label>
        </div>

        <!-- 대댓글 -->
        <div v-if="replyForms[comment.comment_id]">
          <div v-for="reply in getReplies(comment.comment_id)" :key="reply.comment_id">
            <div :style="{ marginLeft: reply.level * 20 + 'px' }" class="comment">
              <div class="comment-info">
                <p class="comment-author">{{ reply.author }}</p>
                <p class="comment-content">{{ reply.content }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 대댓글 작성 폼 -->
        <div v-if="replyForms[comment.comment_id]" class="reply-form">
          <textarea
            v-model="replyContent[comment.comment_id]"
            placeholder="대댓글을 입력하세요"
            required
          ></textarea>
          <button @click="addReply(comment.comment_id)">작성</button>
        </div>

      </div>
    </div>

    <!-- 댓글 작성 폼 -->
    <form class="comment-form" @submit.prevent="addComment">
      <input
        v-model="newComment.author"
        type="text"
        placeholder="작성자 이름"
        :disabled="userStore.isLoggedIn"
        required
      />
      <textarea
        v-model="newComment.content"
        placeholder="댓글을 입력하세요"
        required
      ></textarea>
      <button type="submit">작성</button>
    </form>
  </div>
</template>

<script setup>
import { reactive, onMounted, computed } from 'vue';  
import { useUserStore } from '@/stores/userStore';
// import { usePostStore } from '@/stores/postStore';

const userStore = useUserStore();
// const postStore = usePostStore();

let comments = reactive([
  { comment_id: 1, parent_comment_id: null, author: "사용자1", content: "좋은 게시글 감사합니다!" },
  { comment_id: 2, parent_comment_id: null, author: "사용자2", content: "재미있게 읽었습니다." },
  { comment_id: 3, parent_comment_id: 1, author: "사용자3", content: "동감합니다!" },
  ]);
let newComment = reactive({
    author: "",
    content: "",
  });
let replyForms = reactive({});
let replyContent = reactive({});

onMounted(() => {
  fetchComments();
  if(userStore.isLoggedIn){
    newComment.author = userStore.user?.nickname
  }
});
const fetchComments = () => {
  //postStore.fetchComments
}
const addComment = () => {
  if (newComment.author && newComment.content) {
    comments.push({
      id: comments.length + 1,
      parent_comment_id: null,
      author: newComment.author,
      content: newComment.content,
    });
    newComment.author = "";
    newComment.content = "";
  }
}

// 중첩된 댓글 계산
/* TODO: 댓글 가져오는 방식. 
1. 처음에 1레벨만 들고옴. 답글 클릭 시 2레벨
2. 한번에 들고와서 프론트에서 1레벨, 2레벨 각각 필터 => 현재 로직
3. 백이나 프론트에서 chlidren 형태 만드는 과정을 거친다
*/
const nestedComments = computed(() => {
  const map = new Map();
  const result = [];
  
  comments.forEach((comment) => {
    comment.level = 1; // 기본 레벨
    map.set(comment.comment_id, comment);
    if (comment.parent_comment_id === null) {
      // 최상위 댓글
      result.push(comment);
    } else {
      // 3번으로 한다면.
      // const parent = map.get(comment.parent_comment_id);
      // if (parent) {
      //   comment.level = parent.level + 1; // 부모의 레벨 + 1
      //   const parentIndex = result.indexOf(parent);
      //   comments[parentIndex].replise.push(comment);
      // }
    }
  });
  return result;
});
// 자식 댓글 가져오기 (대댓글)
const getReplies = (parent_comment_id) => {
  return comments.filter((comment) => comment.parent_comment_id === parent_comment_id);
};
const toggleReply = (comment_id) => {
  // 대댓글 작성 폼 토글
  replyForms[comment_id] = !replyForms[comment_id];
};
// 대댓글 추가
const addReply = (parent_comment_id) => {
  const content = replyContent[parent_comment_id];
  if (content) {
    comments.push({
      id: comments.length + 1,
      parent_comment_id,
      author: userStore.isLoggedIn ? userStore.user?.nickname : "익명",
      content,
    });
    replyContent[parent_comment_id] = "";
  }
};
</script>

<style scoped>
.comment-section {
  margin-top: 20px;
  border-top: 1px solid #ccc;
}

.comments {
  margin-bottom: 20px;
}

.comment {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
}
.comment-contents {
  display: flex;
  justify-content: space-between;
  .reply-button {
    align-self: flex-end;
    margin-left: auto;
    width: fit-content;
    cursor: pointer;
    font-size: 14px;
    margin-inline: 5px; 
    color: #007bff;
  }
}
.comment-info {
  display: flex;
  flex-direction: row;
}

.comment-author {
  font-weight: bold;
  margin-bottom: 5px;
}

.comment-content {
  margin-left: 10px;
}

.comment-form,
.reply-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
}

.comment-form input,
.comment-form textarea,
.reply-form textarea {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow-y: auto;
  resize: none;
}

.comment-form button,
.reply-form button {
  align-self: flex-end;
  padding: 10px 20px;
}

</style>
