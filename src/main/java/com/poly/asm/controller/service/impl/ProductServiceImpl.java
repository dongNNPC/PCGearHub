package com.poly.asm.controller.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poly.asm.controller.service.ProductService;
import com.poly.asm.model.Product;
import com.poly.asm.respository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {
   @Autowired
   ProductRepository productRepository;

   @Override
   public List<Product> findAll() {
      return productRepository.findAll();

   }

   @Override
   public Product findById(String id) {
      return productRepository.findById(id).get();
   }

}
