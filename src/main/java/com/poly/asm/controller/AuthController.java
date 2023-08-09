package com.poly.asm.controller;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.poly.asm.rest.controller.AccountRestController;

@Controller
public class AuthController {

	@RequestMapping("/pcgearhub/account")
	public String login() {
		return "account/login";
	}

	@RequestMapping("/auth/login/success")
	public String success(Model model) {
		model.addAttribute("massage", "Đăng nhập thành công");
		return "/pcgearhub/index";
	}

	@RequestMapping("/auth/login/error")
	public String error(Model model) {
		model.addAttribute("massage", "Sai thông tin đăng nhập");
		return "account/login";
	}

	@Autowired
	AccountRestController a;

	@RequestMapping("/auth/logout")
	public String errorSuccess(Model model) {
		model.addAttribute("massage", "Đăng xuất thành công");
		a.userAccount(null);
		return "/index";
	}

	@RequestMapping("/auth/access/denied")
	public String denied(Model model) {
		model.addAttribute("massage", "Bạn không có quyền truy cập");
		return "account/login";
	}

}
