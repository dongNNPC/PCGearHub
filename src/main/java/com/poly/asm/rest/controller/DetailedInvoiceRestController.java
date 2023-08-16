package com.poly.asm.rest.controller;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServlet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.poly.asm.model.DetailedInvoice;
import com.poly.asm.model.Report;
import com.poly.asm.model.ReportRevenue_Quantity;
import com.poly.asm.model.ReportTotalRevenueDetail;
import com.poly.asm.respository.DetailedInvoiceRepository;

@RestController
@CrossOrigin("*")
@RequestMapping("/pcgearhub")
public class DetailedInvoiceRestController extends HttpServlet {
	@Autowired
	DetailedInvoiceRepository dao;

	@GetMapping("/rest/detailedInvoices")
	public ResponseEntity<List<DetailedInvoice>> getAll(Model model) {
		return ResponseEntity.ok(dao.findAll());
	}

	@GetMapping("/rest/detailedInvoices/{invoiceId}")
	public ResponseEntity<List<DetailedInvoice>> getDetailedInvoicesByInvoiceId(
			@PathVariable("invoiceId") String invoiceId) {
		List<DetailedInvoice> detailedInvoices = dao.findByInvoiceId(invoiceId);
		return ResponseEntity.ok(detailedInvoices);
	}

	@GetMapping("/rest/detailedInvoice/{id}")
	public ResponseEntity<DetailedInvoice> getOne(@PathVariable("id") int id) {
//check xem id cs tồn tại trong cơ sở dữ liệu hay không trả về true or false	
		if (!dao.existsById(id)) {
			return ResponseEntity.notFound().build();

		}
		return ResponseEntity.ok(dao.findById(id).get());
	}

	@PostMapping("/rest/detailedInvoice")
//	đưa dữ liệu consumer lên rest API @requesstBody
	public ResponseEntity<DetailedInvoice> post(@RequestBody DetailedInvoice DetailedInvoice) {
		if (dao.existsById(DetailedInvoice.getId())) {
			return ResponseEntity.badRequest().build();
		}
		dao.save(DetailedInvoice);
		return ResponseEntity.ok(DetailedInvoice);
	}

	@PutMapping("/rest/detailedInvoice/{id}")
	public ResponseEntity<DetailedInvoice> put(@PathVariable("id") int id,
			@RequestBody DetailedInvoice DetailedInvoice) {
		if (!dao.existsById(id /* DetailedInvoice.getId() */)) {
			return ResponseEntity.notFound().build();
		}
		dao.save(DetailedInvoice);
		return ResponseEntity.ok(DetailedInvoice);
	}

	@DeleteMapping("/rest/detailedInvoice/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") int id) {
		if (!dao.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		dao.deleteById(id);
		return ResponseEntity.ok().build();
	}


	 @GetMapping("/rest/detailedInvoice/totalRevenue")
    public List<ReportRevenue_Quantity> getTotalRevenueAll() {
        return dao.getTotalRevenueAll();
    }

	@GetMapping("/rest/detailedInvoice/totalRevenueDetails")
    public List<ReportTotalRevenueDetail> gettotalRevenueDetails() {
        return dao.getReportTotalRevenueDetails();
    }

	@GetMapping("/rest/favoriteProduct/{startdate}/{enddate}")
    public ResponseEntity<List<ReportTotalRevenueDetail>> getDateFavorite(
        @PathVariable("startdate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
        @PathVariable("enddate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate
    ) {
        List<ReportTotalRevenueDetail> favorites = dao.findTotalRevenueDetails(startDate, endDate);
        return ResponseEntity.ok(favorites);
    }

	//  @GetMapping("/rest/detailedInvoice/totalRevenueDetails/search/{name}")
    // public List<ReportTotalRevenueDetail> getReportsBySearch(@PathVariable("name") String name) {
    //     return dao.getReportTotalRevenueDetailsBySearch(name);
    // }
}
