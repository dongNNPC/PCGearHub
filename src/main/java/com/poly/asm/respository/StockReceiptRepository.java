package com.poly.asm.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.poly.asm.model.Report;
import com.poly.asm.model.ReportStoc;
import com.poly.asm.model.StockReceipt;

@Repository
public interface StockReceiptRepository extends JpaRepository<StockReceipt, String> {
	// Các phương thức truy vấn tùy chỉnh nếu cần
	@Query("SELECT new com.poly.asm.model.ReportStoc( SUM(d.quantity)) "
			+ " FROM StockReceipt d ")
	List<ReportStoc> getTotalQuantityStock();
}