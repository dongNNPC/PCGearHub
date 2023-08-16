package com.poly.asm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.poly.asm.controller.service.MailerService2;

@Controller
public class Main2 {
	@Autowired
	private MailerService2 mailerService;

	@ResponseBody
	@RequestMapping("/mailer/demo2")
	public String demos(Model model) {
		try {
			mailerService.queue("khanhttpc03027@fpt.edu.vn", "Subject", "Body");
			return "Mail của bạn sẽ được gửi đi trong giây lát";
		} catch (Exception e) {
			return e.getMessage();
		}
	}
}
