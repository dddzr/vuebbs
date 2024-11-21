package com.bbs.vuebbs.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // 모든 엔드포인트에 대해 CORS 허용 (정확한 프론트엔드 URL을 설정하는 것이 좋습니다)
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:8080")  // Vue 서버의 주소
                .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}
