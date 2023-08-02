package com.poly.asm.controller.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poly.asm.controller.service.AccountService;
import com.poly.asm.model.User;
import com.poly.asm.respository.UserRepository;

@Service
public class AccountServiceimpl implements AccountService {

         @Autowired
         UserRepository adao;

         @Override
         public User findById(String name) {
                  return adao.findById(name).get();
         }

}
