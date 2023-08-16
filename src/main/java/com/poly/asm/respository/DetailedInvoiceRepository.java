package com.poly.asm.respository;

import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.poly.asm.model.DetailedInvoice;
import com.poly.asm.model.ReportRevenue_Quantity;
import com.poly.asm.model.ReportTotalRevenueDetail;

@Repository
public interface DetailedInvoiceRepository extends JpaRepository<DetailedInvoice, Integer> {
       // Các phương thức truy vấn tùy chỉnh nếu cần
       List<DetailedInvoice> findByInvoiceId(String invoiceId);

        // tổng doanh thu
       @Query("SELECT new com.poly.asm.model.ReportRevenue_Quantity(SUM(d.quantity * d.product.price)   , SUM(d.quantity)  ) "
                     + " FROM DetailedInvoice d " + 
                     "  where d.invoice.status = 'complete'  ")
       List<ReportRevenue_Quantity> getTotalRevenueAll();


@Query("SELECT new com.poly.asm.model.ReportTotalRevenueDetail(" +
        " Count(d.id)   , SUM(d.quantity) , i.orderDate , sum(p.price * d.quantity) ) " +
       " from Invoice i  join i.detailedInvoices d join d.product p" +
       " where i.status = 'complete' " +
       " group by i.orderDate ")
List<ReportTotalRevenueDetail> getReportTotalRevenueDetails();

@Query("SELECT new com.poly.asm.model.ReportTotalRevenueDetail(" +
        " Count(d.id)   , SUM(d.quantity) , i.orderDate , sum(p.price * d.quantity) ) " +
       " from Invoice i  join i.detailedInvoices d join d.product p" +
       " where i.status = 'complete'  AND  i.orderDate BETWEEN ?1 AND ?2 " +
       " group by i.orderDate ")
List<ReportTotalRevenueDetail> findTotalRevenueDetails(Date startDate , Date endDate);

     

}