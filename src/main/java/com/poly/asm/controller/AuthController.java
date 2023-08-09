package com.poly.asm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poly.asm.controller.service.UserService;

@Controller
public class AuthController {


    @RequestMapping("/pcgearhub/account")
    public String login() {
        return "account/login";
    }

    @RequestMapping("/auth/login/success")
    public String success(Model model) {
        return "/pcgearhub/index";
    }

    @RequestMapping("/auth/login/error")
    public String error(Model model) {
        return "account/login";
    }

    @RequestMapping("/auth/logoff/success")
    public String errorSuccess(Model model) {
        return "forward:/pcgearhub/account";
    }

    @RequestMapping("/auth/access/denied")
    public String denied(Model model) {
        return "account/404";
    }

   @Autowired
   UserService userService;

   @RequestMapping("/oauth2/login/success")
   public String success(OAuth2AuthenticationToken oauth2){
   userService.loginFormOauth2(oauth2);
   return "pcgearhub/index";

   }

}
