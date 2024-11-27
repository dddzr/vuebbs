package com.bbs.vuebbs.controller;

import com.bbs.vuebbs.model.User;
import com.bbs.vuebbs.service.UserService;

import java.util.HashMap;
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
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response); // 상태 코드 409 Conflict
        }
    }
}
