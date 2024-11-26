package com.bbs.vuebbs.service;

import com.bbs.vuebbs.mapper.UserMapper;
import com.bbs.vuebbs.model.User;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    // 생성자 주입
    public UserService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    public Optional<User> selectUserByUsername(String username) {
        return userMapper.selectUserByUsername(username);
    }

    /* 회원가입 */
    // 필드 중복 검사 (type에 따라 검사)
    public boolean checkDuplication(String type, String value) {
        int count = userMapper.checkDuplication(type, value);

        if (count > 0) {
            return false;
        }
        return true;
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