package com.bbs.vuebbs.service;

import java.util.Arrays;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bbs.vuebbs.mapper.UserMapper;
import com.bbs.vuebbs.model.LoginResponse;
import com.bbs.vuebbs.model.User;
import com.bbs.vuebbs.security.JwtTokenProvider;

@Service
public class AuthService {

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthService(UserMapper userMapper, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public void signup(User request) {
        User user = request;
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole_id(2);//member
        userMapper.insertUser(user);
    }

    public LoginResponse login(User request) {
        User user = userMapper.selectUserByUsername(request.getUsername())
            .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }
        String token = jwtTokenProvider.createToken(user.getUsername(), Arrays.asList(user.getRole_id().toString()));
        // 응답 생성
        LoginResponse loginResponse = new LoginResponse(token, user);
        return loginResponse;
    }
}
