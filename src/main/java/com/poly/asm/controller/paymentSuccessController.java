package com.poly.asm.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class paymentSuccessController {
    @GetMapping("/info/success")
    public String success (@RequestParam("vnp_Amount") Long vnp , Model model){
        model.addAttribute("vnp_Amount" ,vnp);
        return "/fragment/success";
    }
}
