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
            <p class="comment-user">{{ comment.user_nickname }}</p>
            <p class="comment-content">{{ comment.content }}</p>
          </div>
          <label v-if="comment.level < 2" class="reply-button" @click="toggleReply(comment.comment_id)">
            답글
          </label>
        </div>

        <!-- 대댓글 -->
        <div v-if="replyShow[comment.comment_id]">
          <div v-for="reply in getReplies(comment.comment_id)" :key="reply.comment_id">
            <div :style="{ marginLeft: reply.level * 20 + 'px' }" class="comment">
              <div class="comment-info">
                <p >{{ reply.user_nickname }}</p>
                <p >{{ reply.content }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 대댓글 작성 폼 -->
        <div v-if="replyShow[comment.comment_id]" class="reply-form">
          <textarea
            v-model="newReply[comment.comment_id].content"
            placeholder="대댓글을 입력하세요"
            required
          ></textarea>
          <button @click="addComment(comment.comment_id)">작성</button>
        </div>

      </div>
    </div>

    <!-- 댓글 작성 폼 -->
    <form class="comment-form" @submit.prevent="addComment()">
      <!-- <input
        v-model="newComment.user_nickname"
        type="text"
        placeholder="작성자 이름"
        :disabled="userStore.isLoggedIn"
        required
      /> -->
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
import { ref, reactive, onMounted } from 'vue';  
  import { useUIStore } from '@/stores/uiStore';
  import { useUserStore } from '@/stores/userStore';
  import { usePostStore } from '@/stores/postStore';

  const userStore = useUserStore();
  const uiStore = useUIStore();
  const postStore = usePostStore();

let comments = reactive([]);
let newComment = reactive({});
let replyShow = reactive({});
let newReply = reactive({});

onMounted(() => {
  fetchComments();
});

const fetchComments = async () => {
  uiStore.setIsLoading(true);
  try {
    comments = await postStore.fetchComments();
    nestComment();
  } catch (error) {
    //alert("error in fetchComments");
  } finally {
    uiStore.setIsLoading(false);
  } 
};

const addComment = async (comment_id) => {
  if(!userStore.isLoggedIn){
    alert("로그인 후 이요해주세요.")
  }

  if(comment_id){
    console.log("test");
    if (newReply[comment_id].content) {
      newReply[comment_id].user_id = userStore.user?.user_id
      newReply[comment_id].user_nickname = userStore.user?.nickname
      newReply[comment_id].parent_comment_id = comment_id;
      try {
        await postStore.insertComment(newReply[comment_id]);
        nestComment();
      } catch (error) {
        //alert("error in insertComment");
      } finally {
        fetchComments();
      } 
      newReply[comment_id].content = ""; 
    } else {
      alert("내용을 입력하세요.");
    } 
  }else{
    if (newComment.content) {      
      newComment.user_id = userStore.user?.user_id
      newComment.user_nickname = userStore.user?.nickname
      try {
        await postStore.insertComment(newComment);
        nestComment();
      } catch (error) {
        //alert("error in insertComment");
      } finally {
        fetchComments();
      } 
      newComment.content = "";  
    } else {
      alert("내용을 입력하세요.");
    }
  }
}

// 중첩된 댓글 계산
/* TODO: 댓글 가져오는 방식. 
1. 처음에 1레벨만 들고옴. 답글 클릭 시 2레벨
2. 한번에 들고와서 프론트에서 1레벨, 2레벨 각각 필터 => 현재 로직
3. 백이나 프론트에서 chlidren 형태 만드는 과정을 거친다
*/
let nestedComments = reactive([]);
const nestComment = () => {
  nestedComments.splice(0, nestedComments.length); // 기존 배열을 비움
  const map = new Map();
  comments.forEach((comment) => {
    comment.level = 1; // 기본 레벨
    map.set(comment.comment_id, comment);
    if (comment.parent_comment_id === null) {
      // 최상위 댓글
      nestedComments.push(comment);
    } else {
      // 3번으로 한다면.
      // const parent = map.get(comment.parent_comment_id);
      // if (parent) {
      //   comment.level = parent.level + 1; // 부모의 레벨 + 1
      //   const parentIndex = nestedComments.indexOf(parent);
      //   comments[parentIndex].replise.push(comment);
      // }
    }
  });
}

// 자식 댓글 가져오기 (대댓글)
const getReplies = (parent_comment_id) => {
  return comments.filter((comment) => comment.parent_comment_id === parent_comment_id);
};

const toggleReply = (comment_id) => {
  // 대댓글 작성 폼 토글
  replyShow[comment_id] = !replyShow[comment_id];
  // 댓글 내용 초기화
  if (!newReply[comment_id]) {
    newReply[comment_id] = ref({ content: '' });
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

.comment-user {
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
