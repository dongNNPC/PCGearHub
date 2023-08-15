package com.poly.asm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.poly.asm.rest.controller.AccountRestController;

@Controller
@RequestMapping("/pcgearhub")
public class AccountController {


	@Autowired
	AccountRestController a;

	@RequestMapping("/login")
	public String login() {
		return "/account/login";
	}

	@RequestMapping("/sign-in/{id}")
	public String signin(Model model) {

		return "/account/signIn";
	}
	@RequestMapping("/sign-in")
	public String signinpost(Model model) {

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
