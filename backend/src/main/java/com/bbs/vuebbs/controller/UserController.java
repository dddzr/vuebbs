package com.bbs.vuebbs.controller;

import com.bbs.vuebbs.model.Post;
import com.bbs.vuebbs.model.User;
import com.bbs.vuebbs.service.UserService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/checkDuplication")
    public ResponseEntity<Map<String, Object>> checkDuplication (@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        String type = request.get("type");
        String value = request.get("value");
        boolean isAvailable = userService.checkDuplication(type, value);    
        if (isAvailable) {
            response.put("message", "사용가능 합니다.");
            response.put("available", true);
            return ResponseEntity.ok(response); // 상태 코드 200 OK
        } else {
            response.put("message", "중복된 데이터가 존재합니다.");
            response.put("available", false);
            return ResponseEntity.ok(response); // 상태 코드 200 OK

            //클라이언트가 409를 일반적인 "에러"로 해석하여 알림 없이 실패로 처리하거나, 추가적인 디버깅 작업이 필요
            //return ResponseEntity.status(HttpStatus.CONFLICT).body(response); // 상태 코드 409 Conflict
        }
    }

    @GetMapping("/getUserActivityRecords/{username}/{activity_type}")
    public List<Post> getUserActivityRecords(@PathVariable String username, @PathVariable String activity_type) {  
        List<Post> data = userService.getUserActivityRecords(username, activity_type);
        return data;
    }

    @GetMapping("/getPostsByUsername/{username}")
    public List<Post> getPostsByUsername(@PathVariable String username) {  
        List<Post> data = userService.getPostsByUsername(username);
        return data;
    }

    @GetMapping("/checkLikedPost/{post_id}/{username}")
    public ResponseEntity<Map<String, Object>> checkLikedPost(@PathVariable String post_id, @PathVariable String username) {  
        Map<String, Object> response = new HashMap<>();
        boolean isLiked = userService.checkLikedPost(post_id, username);
        response.put("isLiked", isLiked);
        return ResponseEntity.ok(response);
    }
}
