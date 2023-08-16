package com.poly.asm.rest.controller;

import javax.servlet.http.HttpServlet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poly.asm.controller.service.MailerService2;

@RestController
@CrossOrigin("*")
@RequestMapping("/pcgearhub")
public class MailRestController extends HttpServlet {
	@Autowired
	private MailerService2 mailerService;

	// tổng user
	@GetMapping("/rest/mail")
	public void getTotalUSer() {
		mailerService.queue("khanhttpc03027@fpt.edu.vn", "Subject", "Body");
	}
}
