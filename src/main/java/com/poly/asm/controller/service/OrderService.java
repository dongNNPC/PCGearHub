package com.poly.asm.controller.service;

import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;
import com.poly.asm.model.Invoice;

import lombok.val;

public interface OrderService {

    Invoice create(JsonNode orderData);

    Invoice findById(String id);

    List<Invoice> findByUsernameStatusPending(String username);

    List<Invoice> findByUsernameStatusDelivery(String username);

    List<Invoice> findByUsernameStatusComplete(String username);

    List<Invoice> findByUsernameStatusCancelled(String username);
    
}
