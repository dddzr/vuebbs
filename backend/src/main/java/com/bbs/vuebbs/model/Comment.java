package com.bbs.vuebbs.model;
import lombok.Data;
@Data
public class Comment {
    Integer comment_id;
    Integer parent_comment_id;
    Integer post_id;
    String user_id;
    String user_nickname;
    String content;
    String created_at;
    String updated_at;
}
