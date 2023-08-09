package com.poly.asm.respository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.poly.asm.model.DetailedInvoice;
import com.poly.asm.model.Invoice;
import com.poly.asm.model.Report;
import com.poly.asm.model.ReportTotalRevenueDetail;

@Repository
public interface DetailedInvoiceRepository extends JpaRepository<DetailedInvoice, Integer> {
	// Các phương thức truy vấn tùy chỉnh nếu cần
	List<DetailedInvoice> findByInvoiceId(String invoiceId);

	// tổng doanh thu
	@Query("SELECT new com.poly.asm.model.Report(SUM(d.quantity * p.price) AS totalRevenue , SUM(d.quantity) AS totalODer) "
			+ " FROM DetailedInvoice d " + " JOIN d.product p ")
	List<Report> getTotalRevenueAll();

	// tổng doanh thu chi tiết
	@Query("SELECT new com.poly.asm.model.ReportTotalRevenueDetail(" +
       "u.name AS userName, p.name AS productName, p.price AS productPrice, " +
       "d.quantity AS quantity, i.orderDate AS orderDate, d.paymentMethod AS paymentMethod) " +
       "FROM DetailedInvoice d " +
       "INNER JOIN d.product p " +
       "INNER JOIN d.invoice i " +
       "INNER JOIN i.user u")
List<ReportTotalRevenueDetail> getReportTotalRevenueDetails();

	//câu lệnh tìm kiếm theo tên người dùng và
	@Query("SELECT new com.poly.asm.model.ReportTotalRevenueDetail(" +
       "u.name AS userName, p.name AS productName, p.price AS productPrice, " +
       "d.quantity AS quantity, i.orderDate AS orderDate, d.paymentMethod AS paymentMethod) " +
       "FROM DetailedInvoice d " +
       "INNER JOIN d.product p " +
       "INNER JOIN d.invoice i " +
       "INNER JOIN i.user u " +
       "WHERE u.name LIKE %:name% OR p.name LIKE %:name%")
List<ReportTotalRevenueDetail> getReportTotalRevenueDetailsBySearch(@Param("name") String name);

}