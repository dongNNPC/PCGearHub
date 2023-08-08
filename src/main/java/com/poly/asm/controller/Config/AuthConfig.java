package com.poly.asm.controller.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.poly.asm.controller.service.UserService;

@Configuration
@EnableWebSecurity
public class AuthConfig extends WebSecurityConfigurerAdapter {
        
        @Bean
        public BCryptPasswordEncoder getPasswordEncoder() {
                return new BCryptPasswordEncoder();
        }
        @Autowired
        UserService userService;

        @Override
        protected void configure(AuthenticationManagerBuilder auth) throws Exception {
                auth.userDetailsService(userService);

        }
        // Phân quyền sử dụng và hình thức đăng nhập

        @Override
        protected void configure(HttpSecurity http) throws Exception {
                // CSRF,CORS - chia sẽ từ bên ngoài và truy cập
                http.csrf().disable().cors().disable();

                http.authorizeRequests(requests -> requests
                                .antMatchers("/pcgearhub/admin/**").hasRole("ADMIN")
                                .antMatchers("/pcgearhub/profile/**", "/pcgearhub/confirm-information")
                                .hasAnyRole("ADMIN", "USER"));

                // nếu không đúng vai trò vào đường dẫn
                http.exceptionHandling(handling -> handling
                                .accessDeniedPage("/auth/access/denied"));

                http.formLogin(login -> login // giao dien
                                .loginPage("/pcgearhub/account")
                                .loginProcessingUrl("/auth/login")
                                .defaultSuccessUrl("/pcgearhub/index", false)
                                .failureUrl("/auth/login/error")
                                .usernameParameter("username")
                                .passwordParameter("password"));

                http.rememberMe(me -> me
                                .rememberMeParameter("remember"));

                // dang xuat
                http.logout(logout -> logout
                                .logoutUrl("/auth/logoff")
                                .logoutSuccessUrl("/pcgearhub/login"));

                http.oauth2Login(login -> login
                                .loginPage("/pcgearhub/account")
                                .defaultSuccessUrl("/pcgearhub/index", true)
                                .failureUrl("/auth/login/error")
                                .authorizationEndpoint()
                                .baseUri("/oauth2/authorization"));

        }

}