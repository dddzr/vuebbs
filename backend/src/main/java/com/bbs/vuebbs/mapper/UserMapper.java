package com.bbs.vuebbs.mapper;


import com.bbs.vuebbs.model.User;

import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    Optional<User> selectUserByUsername(String username);
    int checkDuplication(String type, String value);
    void insertUser(User user);
    void recordUserActivity(User userActivity);
    
}