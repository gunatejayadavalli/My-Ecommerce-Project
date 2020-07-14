package com.springboot.ecommercedemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class EcommerceRestApiApplication extends SpringBootServletInitializer {
	
	   @Override
	   protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
	      return application.sources(EcommerceRestApiApplication.class);
	   }

	public static void main(String[] args) {
		SpringApplication.run(EcommerceRestApiApplication.class, args);
	}

}
