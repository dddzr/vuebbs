package com.bbs.vuebbs;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.bbs.vuebbs.mapper")
public class VuebbsApplication {

	public static void main(String[] args) {
		SpringApplication.run(VuebbsApplication.class, args);
	}

}
