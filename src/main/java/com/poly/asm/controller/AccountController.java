package com.poly.asm.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/pcgearhub")
public class AccountController {

    @RequestMapping("/login")
	public String login() {

		return "/account/login";
	}

	 @RequestMapping("/sign-in")
	public String signin() {

		return "/account/signIn";
	}

	 @RequestMapping("/forgot-password")
	public String ForgotPassword() {

		return "/account/ForgotPassword";
	}

	 @RequestMapping("/confirmation")
	public String confirmation() {

		return "/account/confirmation";
	}

	 @RequestMapping("/change-password")
	public String changePassword() {

		return "/account/changePassword";
	}
}
