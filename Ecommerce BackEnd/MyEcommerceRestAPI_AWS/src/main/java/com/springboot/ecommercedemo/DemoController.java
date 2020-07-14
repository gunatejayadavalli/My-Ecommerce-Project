package com.springboot.ecommercedemo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {
	
	@GetMapping(value = "/")
	   public String hello() {
	      return "Hello World..!!!!";
	   }

}
