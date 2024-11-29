package com.bbs.vuebbs.mapper;

import com.bbs.vuebbs.model.Comment;
import com.bbs.vuebbs.model.Post;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface PostMapper {
    List<Post> selectPostList(Integer board_id);
    Post selectPostDetail(Integer post_id);
    void insertPost(Post post);
    void updatePost(Post post);
    void deletePost(Post post);
    List<Comment> selectComments(Integer post_id);    
    void insertComment(Comment comment);
    void updateComment(Comment comment);
    void deleteComment(Comment comment);
    void updateLikeCount(@Param("post_id") Integer post_id, @Param("updateType") String updateType);
}
