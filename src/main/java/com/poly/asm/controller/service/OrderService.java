package com.poly.asm.controller.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.poly.asm.model.Invoice;

public interface OrderService {

    Invoice create(JsonNode orderData);
    
}
