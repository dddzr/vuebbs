package com.bbs.vuebbs.mapper;


import com.bbs.vuebbs.model.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    int checkDuplication(String type, String value);
    void insertUser(User user);
    void recordUserActivity(User userActivity);
    
}