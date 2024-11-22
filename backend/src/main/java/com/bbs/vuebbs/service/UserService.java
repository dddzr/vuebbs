package com.bbs.vuebbs.service;

import com.bbs.vuebbs.mapper.UserMapper;
import com.bbs.vuebbs.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;
    private BCryptPasswordEncoder passwordEncoder;

    // 생성자 주입
    public UserService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    // 필드 중복 검사 (type에 따라 검사)
    public boolean checkDuplication(String type, String value) {
        int count = userMapper.checkDuplication(type, value);

        if (count > 0) {
            // throw new RuntimeException(type + "은(는) 중복된 값입니다.");
            return false;
        }
        return true;
    }

    public void registerUser(User user) {
        // 비밀번호 해싱 처리 (예시로 bcrypt 사용)
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);

        // 사용자 등록
        userMapper.insertUser(user);
    }

    @Transactional
    public void recordUserActivity(Integer user_id, Integer post_id, String activity_type) {
        User userActivity = new User();
        userActivity.setUser_id(user_id);
        userActivity.setPost_id(post_id);
        userActivity.setActivity_type(activity_type);

        userMapper.recordUserActivity(userActivity);
    }
}