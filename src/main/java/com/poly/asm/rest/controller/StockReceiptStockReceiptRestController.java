package com.poly.asm.rest.controller;

import java.util.List;

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

import com.poly.asm.model.Report;
import com.poly.asm.model.ReportStoc;
import com.poly.asm.model.StockReceipt;
import com.poly.asm.respository.StockReceiptRepository;

import javax.servlet.http.HttpServlet;

@RestController
@CrossOrigin("*")
@RequestMapping("/pcgearhub")
public class StockReceiptStockReceiptRestController extends HttpServlet {
	@Autowired
	StockReceiptRepository dao;

	@GetMapping("/rest/stockReceipts")
	public ResponseEntity<List<StockReceipt>> getAll(Model model) {
		return ResponseEntity.ok(dao.findAll());
	}

	@GetMapping("/rest/stockReceipt/{id}")
	public ResponseEntity<StockReceipt> getOne(@PathVariable("id") String id) {
//check xem id cs tồn tại trong cơ sở dữ liệu hay không trả về true or false	
		if (!dao.existsById(id)) {
			return ResponseEntity.notFound().build();

		}
		return ResponseEntity.ok(dao.findById(id).get());
	}

	@PostMapping("/rest/stockReceipt")
//	đưa dữ liệu consumer lên rest API @requesstBody
	public ResponseEntity<StockReceipt> post(@RequestBody StockReceipt stockReceipt) {
		dao.save(stockReceipt);
		return ResponseEntity.ok(stockReceipt);
	}

	@PutMapping("/rest/stockReceipt/{id}")
	public ResponseEntity<StockReceipt> put(@PathVariable("id") String id, @RequestBody StockReceipt stockReceipt) {
		if (!dao.existsById(id /* StockReceipt.getId() */)) {
			return ResponseEntity.notFound().build();
		}
		dao.save(stockReceipt);
		return ResponseEntity.ok(stockReceipt);
	}

	@DeleteMapping("/rest/stockReceipt/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") String id) {
		if (!dao.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		dao.deleteById(id);
		return ResponseEntity.ok().build();
	}


	//tổng phiếu nhập kho
	@GetMapping("/rest/stockReceipt/getTotalQuantityStock")
	public List<ReportStoc> getTotalQuantityStock(){
		return dao.getTotalQuantityStock();
	}
}
