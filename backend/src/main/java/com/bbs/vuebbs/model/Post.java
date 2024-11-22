package com.bbs.vuebbs.model;

import lombok.Data;

@Data
public class Post {
    private Integer post_id;
    private String title;
    private String author;
    private String content;
    private String created_at;
    private String updated_at;
    private Integer board_id;
    private Integer comment_count;
    private Integer like_count;
    private Integer view_count;
}
