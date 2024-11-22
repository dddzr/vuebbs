package com.bbs.vuebbs.controller;

import com.bbs.vuebbs.model.Post;
import com.bbs.vuebbs.service.PostService;

import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/post")
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/selectPostList/{board_id}")
    public List<Post> selectPostList(@PathVariable Integer board_id) {       
        // 얘는 불필요한 정보(내용검색 안 하려면 내용, 추후 댓글 등) 안 들고 오게 수정이 필요. 
        List<Post> data = postService.selectPostList(board_id);
        return data;
    }

    @GetMapping("/selectPostDetail/{post_id}")
    public Post selectPostDetail(@PathVariable Integer post_id) {      
        // 댓글 조인해서 가져오게 수정 필요  
        Post data = postService.selectPostDetail(post_id);
        return data;
    }

    @PostMapping("/insertPost")
    public String insertPost(@RequestBody Post post) {
        postService.insertPost(post);
        return "insertPost success.";
    }

    @PostMapping("/increaseLikeCount")
    public String increaseLikeCount(@RequestParam Integer post_id, @RequestParam Integer user_id) {
        postService.increaseLikeCount(post_id, user_id);
        return "increaseLikeCount success.";
    }

    @PostMapping("/decreaseLikeCount")
    public String decreaseLikeCount(@RequestParam Integer post_id, @RequestParam Integer user_id) {
        postService.decreaseLikeCount(post_id, user_id);
        return "decreaseLikeCount success.";
    }
}
