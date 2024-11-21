package com.bbs.vuebbs.mapper;

import com.bbs.vuebbs.model.Post;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PostMapper {
    List<Post> selectPost(Integer board_id);
    void insertPost(Post post);
}
