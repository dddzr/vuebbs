package com.bbs.vuebbs.controller;

import com.bbs.vuebbs.model.Post;
import com.bbs.vuebbs.service.PostService;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/post")
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/selectPost/{board_id}")
    public List<Post> selectPost(@PathVariable Integer board_id) {        
        List<Post> data = postService.selectPost(board_id);
        return data;
    }

    @PostMapping("/insertPost")
    public String insertPost(@RequestBody Post post) {
        postService.insertPost(post);
        return "Post uploaded successfully!";
    }
}
