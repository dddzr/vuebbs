package com.bbs.vuebbs.controller;

import com.bbs.vuebbs.model.Comment;
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
        // 필요한 정보만 들고오자.
        List<Post> data = postService.selectPostList(board_id);
        return data;
    }

    @GetMapping("/selectPostDetail/{post_id}")
    public Post selectPostDetail(@PathVariable Integer post_id) { 
        Post data = postService.selectPostDetail(post_id);
        return data;
    }

    @PostMapping("/insertPost")
    public String insertPost(@RequestBody Post post) {
        postService.insertPost(post);
        return "insertPost success.";
    }

    @PostMapping("/updatePost")
    public String updatePost(@RequestBody Post post) {
        postService.updatePost(post);
        return "updatePost success.";
    }

    @PostMapping("/deletePost")
    public String deletePost(@RequestBody Post post) {
        postService.deletePost(post);
        return "deletePost success.";
    }

    
    @GetMapping("/selectComments/{post_id}")
    public List<Comment> selectComments(@PathVariable Integer post_id) { 
        List<Comment> comment = postService.selectComments(post_id);
        return comment;
    }

    @PostMapping("/insertComment")
    public String insertComment(@RequestBody Comment comment) {
        postService.insertComment(comment);
        return "insertComment success.";
    }

    @PostMapping("/updateComment")
    public String updateComment(@RequestBody Comment comment) {
        postService.updateComment(comment);
        return "updateComment success.";
    }

    @PostMapping("/deleteComment")
    public String deleteComment(@RequestBody Comment comment) {
        postService.deleteComment(comment);
        return "deleteComment success.";
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

    @PostMapping("/increaseViewCount")
    public String increaseViewCount(@RequestParam Integer post_id, @RequestParam Integer user_id) {
        // postService.increaseViewCount(post_id, user_id);
        return "increaseViewCount success.";
    }
}
