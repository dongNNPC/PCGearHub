package com.poly.asm.rest.controller;

import java.util.List;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.poly.asm.controller.service.OrderService;
import com.poly.asm.model.Invoice;
import com.poly.asm.respository.InvoiceRepository;

@RestController
@CrossOrigin("*")
@RequestMapping("/pcgearhub")
public class InvoiceRestController extends HttpServlet {
	@Autowired
	InvoiceRepository dao;

	@Autowired
	OrderService odersv;

	@GetMapping("/rest/invoices")
	public ResponseEntity<List<Invoice>> getAll(Model model) {
		return ResponseEntity.ok(dao.findAll());
	}

	@GetMapping("/rest/invoices/{keyword}")
	public ResponseEntity<List<Invoice>> getInvoicesByKeyword(@PathVariable("keyword") String keyword) {
		List<Invoice> invoices = dao.findByStatusContainingIgnoreCase(keyword);
		return ResponseEntity.ok(invoices);
	}

	@GetMapping("/rest/invoice/{id}")
	public ResponseEntity<Invoice> getOne(@PathVariable("id") String id) {
//check xem id cs tồn tại trong cơ sở dữ liệu hay không trả về true or false	
		if (!dao.existsById(id)) {
			return ResponseEntity.notFound().build();

		}
		return ResponseEntity.ok(dao.findById(id).get());
	}

	@PostMapping("/rest/invoice")
//	đưa dữ liệu consumer lên rest API @requesstBody
	public ResponseEntity<Invoice> post(@RequestBody Invoice invoice) {
		if (dao.existsById(invoice.getId())) {
			return ResponseEntity.badRequest().build();
		}
		dao.save(invoice);
		return ResponseEntity.ok(invoice);
	}

	@PutMapping("/rest/invoice/{id}")
	public ResponseEntity<Invoice> put(@PathVariable("id") String id, @RequestBody Invoice invoice) {
		if (!dao.existsById(id /* invoice.getId() */)) {
			return ResponseEntity.notFound().build();
		}
		dao.save(invoice);
		return ResponseEntity.ok(invoice);
	}

	@DeleteMapping("/rest/invoice/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") String id) {
		if (!dao.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		dao.deleteById(id);
		return ResponseEntity.ok().build();
	}

	@PostMapping("/rest/orders")
	public Invoice create(@RequestBody JsonNode orderData) {
		return odersv.create(orderData);
	}


	@GetMapping("/rest/order-list/pending")
    public List<Invoice> getOrderedList(Model model, HttpServletRequest request) {
        String username = request.getRemoteUser();
        List<Invoice> orders = odersv.findByUsernameStatusPending(username);
        return orders;
    }


	@GetMapping("/rest/order-list/delivery")
    public List<Invoice> getOrderedListdelivery(Model model, HttpServletRequest request) {
        String username = request.getRemoteUser();
		List<Invoice> orders = odersv.findByUsernameStatusDelivery(username);
        return orders;
    }
}
