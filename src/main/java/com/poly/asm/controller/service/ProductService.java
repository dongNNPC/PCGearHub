package com.poly.asm.controller.service;

import java.util.List;
import com.poly.asm.model.Product;
public interface ProductService {


    List<Product> findAll();

    Product findById(String id);

}