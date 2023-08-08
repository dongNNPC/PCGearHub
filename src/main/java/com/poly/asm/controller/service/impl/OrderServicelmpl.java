package com.poly.asm.controller.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.poly.asm.controller.service.OrderService;
import com.poly.asm.model.DetailedInvoice;
import com.poly.asm.model.Invoice;
import com.poly.asm.respository.DetailedInvoiceRepository;
import com.poly.asm.respository.InvoiceRepository;

@Service
public class OrderServicelmpl implements OrderService  {
    @Autowired InvoiceRepository dao;
    @Autowired DetailedInvoiceRepository ddao;

    @Override
    public Invoice create(JsonNode orderData) {
       ObjectMapper mapper = new ObjectMapper();

       Invoice inv  =  mapper.convertValue(orderData, Invoice.class);
       dao.save(inv);

       TypeReference <List<DetailedInvoice>> type = new TypeReference <List<DetailedInvoice>> (){};
        List<DetailedInvoice> deList = mapper.convertValue(orderData.get("detailedInvoices"), type);
        if (deList != null) {
            deList.forEach(d -> d.setInvoice(inv));
            ddao.saveAll(deList);
        }

       return inv;
    }
}
