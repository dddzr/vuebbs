package com.bbs.vuebbs.mapper;


import com.bbs.vuebbs.model.Post;
import com.bbs.vuebbs.model.User;

import java.util.List;
import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    Optional<User> selectUserByUsername(String username);
    int checkDuplication(String type, String value);
    void insertUser(User user);
    void insertUserActivity(User userActivity);
    void deleteUserActivity(User userActivity);
    List<Post> getUserActivityRecords(String username, String activity_type);
    List<Post> getPostsByUsername(String username);
    int checkLikedPost(String post_id, String username);
    
}