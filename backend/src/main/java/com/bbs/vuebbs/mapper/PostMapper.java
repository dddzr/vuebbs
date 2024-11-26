package com.bbs.vuebbs.mapper;

import com.bbs.vuebbs.model.Post;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface PostMapper {
    List<Post> selectPostList(Integer board_id);
    Post selectPostDetail(Integer post_id);
    void insertPost(Post post);
    void deletePost(Post post);
    void updateLikeCount(@Param("post_id") Integer post_id, @Param("updateType") String updateType);
}
