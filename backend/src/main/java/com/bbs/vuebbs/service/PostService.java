package com.bbs.vuebbs.service;

import com.bbs.vuebbs.mapper.PostMapper;
import com.bbs.vuebbs.model.Post;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostService {

    @Autowired
    private PostMapper postMapper;

    public List<Post> selectPost(Integer board_id) {
        return postMapper.selectPost(board_id);
    }

    public void insertPost(Post post) {
        postMapper.insertPost(post);
    }
}
