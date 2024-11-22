package com.bbs.vuebbs.model;
import lombok.Data;

@Data
public class User {
    Integer user_id; // 사용자 고유 ID (자동 증가)
    String username; // 사용자명 (중복 불가)
    String email; // 이메일 (중복 불가)
    String id; // 아이디 (중복 불가)
    String password; // 비밀번호
    String profile_picture; // 프로필 사진 (선택적, 이미지 URL 등)
    String created_at; // 생성일자 (기본값은 현재 시간)
    String updated_at ; // 수정일자 (수정 시 자동 업데이트)
    String status; // ENUM('active', 'inactive', 'banned') DEFAULT 'active', -- 사용자 상태 (기본값은 'active')
    String last_login; // 마지막 로그인 시간

    /* for user_activity */ 
    // Integer user_id; // 사용자 ID
    Integer post_id; // 게시글 ID
    String activity_type; // 활동 유형 ENUM('like', 'view', 'comment')
    String activity_timestamp; // 활동 시간
}
