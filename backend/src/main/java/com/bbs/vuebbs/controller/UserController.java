package com.bbs.vuebbs.controller;

import com.bbs.vuebbs.model.User;
import com.bbs.vuebbs.service.UserService;

import java.util.Map;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/checkDuplication")
    public String checkDuplication (@RequestBody Map<String, String> request) {
        String type = request.get("type");
        String value = request.get("value");
        userService.checkDuplication(type, value);
        return "checkDuplication success.";
    }

    @PostMapping("/registerUser")
    public String registerUser (@RequestBody User user) {
        userService.registerUser(user);
        return "registerUser success.";
    }
}
