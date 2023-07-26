package com.poly.asm.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/pcgearhub")
public class ShoppingCartController {
    

    @RequestMapping("/cart")
	public String cart() {

		return "/fragment/ShoppingCart";
	}

	 @RequestMapping("/confirm-information")
	public String confirm_information() {

		return "/fragment/confirm-information";
	}

	@RequestMapping("/Thank-you")
	public String thanhyou() {

		return "/fragment/thankforShop";
	}

	
}
