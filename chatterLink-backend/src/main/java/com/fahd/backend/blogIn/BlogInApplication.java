package com.fahd.backend.blogIn;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.fahd.backend.blogin"})
public class BlogInApplication {

	public static void main(String[] args) {
		SpringApplication.run(BlogInApplication.class, args);
	}

}
