package com.poly.asm.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/pcgearhub/admin")
public class AdminController {

	@RequestMapping("/index")
	public String index() {

		return "/admin/index";
	}

	// Form

	@RequestMapping("/form-user/{id}")
	public String formUser(Model model, @PathVariable("id") String key) {

		return "/admin/views/form-user";
	}

	@RequestMapping("/form-product/{id}")
	public String formProduct(Model model, @PathVariable("id") String key) {

		return "/admin/views/form-product";
	}

	// Table
	@RequestMapping("/table-user")
	public String tableUser(Model model) {
		return "/admin/views/table-user";
	}

	@RequestMapping("/table-product")
	public String tableProduct(Model model) {
		return "/admin/views/table-product";
	}

	@RequestMapping("/table-invoice-pending")
	public String tableInvoice(Model model) {
		return "/admin/views/table-invoice-pending";
	}

	@RequestMapping("/table-invoice-delivery")
	public String tableDelivered(Model model) {
		return "/admin/views/table-invoice-delivery";
	}

	@RequestMapping("/table-invoice-complete")
	public String tableComplete(Model model) {
		return "/admin/views/table-invoice-complete";
	}

	@RequestMapping("/table-invoice-cancelled")
	public String tableCancelled(Model model) {
		return "/admin/views/table-invoice-cancelled";
	}

	@RequestMapping("/table-invoice-detailed/{id}")
	public String tabletableInvoiceDetailed(Model model, @PathVariable("id") String key) {
		return "/admin/views/table-invoice-detailed";
	}

	// Form category

	@RequestMapping("/form-category/{id}")
	public String formCategory(Model model, @PathVariable("id") String key) {

		return "/admin/views/form-category";
	}

	@RequestMapping("/table-category")
	public String tableCategory() {

		return "/admin/views/table-category";
	}

	@RequestMapping("/form-supplier/{id}")
	public String formSupplier(Model model, @PathVariable("id") String key) {

		return "/admin/views/form-supplier";
	}

	@RequestMapping("/table-supplier")
	public String tableSupplier() {

		return "/admin/views/table-supplier";
	}

	@RequestMapping("/form-user_id/{id}")
	public String formuser_id(Model model, @PathVariable("id") String key) {

		return "/admin/views/form-user_id";
	}

	@RequestMapping("/table-user_id")
	public String tableuser_id() {

		return "/admin/views/table-user_id";
	}

	@RequestMapping("/form-brand/{id}")
	public String formbrand(Model model, @PathVariable("id") String key) {

		return "/admin/views/form-brand";
	}

	@RequestMapping("/table-brand")
	public String tablebrand() {

		return "/admin/views/table-brand";
	}

	@RequestMapping("/form-distinctive/{id}")
	public String formDistinctive(Model model, @PathVariable("id") String key) {

		return "/admin/views/form-distinctive";
	}

	@RequestMapping("/table-distinctive")
	public String tableDistinctive() {

		return "/admin/views/table-distinctive";
	}

	@RequestMapping("/table-totalRevenue")
	public String totalRevenue() {

		return "/admin/views/table-totalRevenue";
	}

	/* Charts */

	@RequestMapping("/chart")
	public String chart() {

		return "/admin/views/chart";
	}

}
