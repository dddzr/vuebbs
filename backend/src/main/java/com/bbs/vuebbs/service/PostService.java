package com.bbs.vuebbs.service;

import com.bbs.vuebbs.mapper.PostMapper;
import com.bbs.vuebbs.service.UserService;
import com.bbs.vuebbs.model.Post;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PostService {

    @Autowired
    private PostMapper postMapper;

    @Autowired
    private UserService userService;

    public List<Post> selectPostList(Integer board_id) {
        return postMapper.selectPostList(board_id);
    }

    public Post selectPostDetail(Integer post_id) {
        return postMapper.selectPostDetail(post_id);
    }

    public void insertPost(Post post) {
        postMapper.insertPost(post);
    }

    public void updatePost(Post post) {
        postMapper.updatePost(post);
    }

    public void deletePost(Post post) {
        postMapper.deletePost(post);
    }

    @Transactional
    public void increaseLikeCount(Integer post_id, Integer user_id) {
        // 좋아요 수 증가
        postMapper.updateLikeCount(post_id, "increase");        
        // 사용자 활동 기록 (userService 호출)
        userService.recordUserActivity(user_id, post_id, "like");
    }

    @Transactional
    public void decreaseLikeCount(Integer post_id, Integer user_id) {
        // 좋아요 수 감소
        postMapper.updateLikeCount(post_id, "decrease");        
        // 사용자 활동 기록 (userService 호출)
        userService.recordUserActivity(user_id, post_id, "like");
    }


}
