package com.poly.asm.controller;

import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.poly.asm.controller.service.OrderService;
import com.poly.asm.model.Invoice;

@Controller
@RequestMapping("/pcgearhub")
public class ShoppingCartController {

	@Autowired
	OrderService orderService;

	@RequestMapping("/cart")
	public String cart() {

		return "/fragment/ShoppingCart";
	}

	@RequestMapping("/confirm-information")
	public String confirm_information() {

		return "/fragment/confirm-information";
	}

	@GetMapping("/ordered-list/details/{id}")
	public String thankyou(@PathVariable("id") String id, Model model) {
		Invoice order = orderService.findById(id);
		model.addAttribute("order", order);

		double totalPrice = order.getDetailedInvoices().stream()
				.mapToDouble(detail -> detail.getProduct().getPrice() * detail.getQuantity())
				.sum();

		model.addAttribute("totalPrice", totalPrice);
		return "/fragment/list-details";
	}

	@RequestMapping("/ordered-list")
	public String oderList(Model model, HttpServletRequest request) {
		String username = request.getRemoteUser();
		model.addAttribute("orders", orderService.findByUsernameStatusPending(username));
		return "/fragment/orderedList";
	}
}
