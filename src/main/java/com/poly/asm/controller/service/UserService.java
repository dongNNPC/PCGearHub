package com.poly.asm.controller.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;

import com.poly.asm.model.Account;
import com.poly.asm.respository.UserRepository;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    UserRepository userDao;
    @Autowired
    BCryptPasswordEncoder pe;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        try {
            Account user = userDao.findById(username).get();
            String role = user.isAdmin() ? "ADMIN" : "USER";
            return User.withUsername(username)
                    .password(pe.encode(user.getPassword()))
                    .roles(role).build();
        } catch (Exception e) {
            throw new UsernameNotFoundException("User not found");
        }
    }

    public void loginFormOauth2(OAuth2AuthenticationToken oauth2) {
        String name = oauth2.getPrincipal().getAttribute("name");
        String email = oauth2.getPrincipal().getAttribute("email");
        String password = Long.toHexString(System.currentTimeMillis());

        UserDetails user = User.withUsername(email)
                .password(pe.encode(password))
                .roles("GUEST").build();

        Authentication auth = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(auth);

    }
}