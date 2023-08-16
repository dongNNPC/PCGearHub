package com.poly.asm.controller.service;

import java.text.Normalizer;
import java.util.Map;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poly.asm.model.Account;
import com.poly.asm.respository.UserRepository;
import com.poly.asm.rest.controller.AccountRestController;

@Service
@RequestMapping("/pcgearhub")
@RestController
public class UserService implements UserDetailsService {

	// @Bean
	// public BCryptPasswordEncoder getPasswordEncoder() {
	// return new BCryptPasswordEncoder();
	// }

	@Autowired
	AccountRestController a;

	@Autowired
	UserRepository userDao;

	@Autowired
	BCryptPasswordEncoder pe;
	String idString = "";

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		idString = username;
		try {
			Account user = userDao.findById(username).get();
			String role = user.isAdmin() ? "ADMIN" : "USER";
			a.userAccount(user);
			return User.withUsername(username).password(pe.encode(user.getPassword())).roles(role)
					.build();
		} catch (Exception e) {
			throw new UsernameNotFoundException("User not found");
		}
	}

	// public void loginFormOauth2(OAuth2AuthenticationToken oauth2) {
	// String name = oauth2.getPrincipal().getAttribute("name");
	// String email = oauth2.getPrincipal().getAttribute("email");
	// String password = Long.toHexString(System.currentTimeMillis());

	// UserDetails user = User.withUsername(email)
	// .password(pe.encode(password))
	// .roles("GUEST").build();

	// Authentication auth = new UsernamePasswordAuthenticationToken(user, null,
	// user.getAuthorities());

	// SecurityContextHolder.getContext().setAuthentication(auth);

	// }

	@Autowired
	UserRepository userDAOs;

	public static String formatName(String name) {
		String normalized = Normalizer.normalize(name, Normalizer.Form.NFD);
		Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
		String formatted = pattern.matcher(normalized).replaceAll("").replaceAll(" ", "").toLowerCase();
		return formatted;
	}

	public void loginFormOauth2(OAuth2AuthenticationToken oauth2) {
		String name = oauth2.getPrincipal().getAttribute("name");
		String email = oauth2.getPrincipal().getAttribute("email");
		String provider = oauth2.getAuthorizedClientRegistrationId();
		String address = oauth2.getPrincipal().getAttribute("address");

		String formatUsername;
		String password;
		String fullName;
		String role;
		Account account;
		account = userDao.findByEmail(email);

		if ("google".equals(provider)) {
			String picture = oauth2.getPrincipal().getAttribute("picture");
			String givenName = oauth2.getPrincipal().getAttribute("given_name");
			String familyName = oauth2.getPrincipal().getAttribute("family_name");
			String sub = oauth2.getPrincipal().getAttribute("sub");

			System.out.println("Google - Email: " + email);
			System.out.println("Google - Name: " + name);
			System.out.println("Google - Picture: " + picture);
			System.out.println("Google - givenName: " + givenName);
			System.out.println("Google - familyName: " + familyName);
			System.out.println("Google - sub: " + sub);
			System.out.println("Google - provider: " + provider);

			if (account != null) {
				a.userAccount(account);
			} else {
				formatUsername = formatName(givenName) + "gg";
				password = Long.toHexString(System.currentTimeMillis());
				fullName = familyName + " " + givenName;
				account = new Account();
				account.setId(formatUsername);
				account.setPassword(password);
				account.setName(fullName);
				account.setEmail(email);
				account.setAdmin(false);
				account.setAddress(address);
				account.setImage(picture);
				userDAOs.save(account);
				account = userDao.findById(account.getId()).get();
				a.userAccount(account);
				System.out.println("TẠO THÀNH CÔNG GG: " + formatUsername);

			}

		} else if ("facebook".equals(provider)) {

			Map<String, Object> pictureObj = (Map<String, Object>) oauth2.getPrincipal()
					.getAttribute("picture");
			Map<String, Object> pictureData = (Map<String, Object>) pictureObj.get("data");
			String pictureUrl = (String) pictureData.get("url");
			String firstName = oauth2.getPrincipal().getAttribute("first_name");
			String lastName = oauth2.getPrincipal().getAttribute("last_name");

			System.out.println("Facebook - Email: " + email);
			System.out.println("Facebook - Name: " + name);
			System.out.println("Facebook - Picture: " + pictureUrl);
			System.out.println("Facebook - firstName: " + firstName);
			System.out.println("Facebook - lastName: " + lastName);

			if (account != null) {
				// password = account.getPassword();
				// role = account.isAdmin() ? "ADMIN" : "USER";
				a.userAccount(account);
			} else {
				formatUsername = formatName(name) + "fb";
				password = Long.toHexString(System.currentTimeMillis());
				fullName = lastName + " " + firstName;
				account = new Account();
				account.setId(formatUsername);
				account.setPassword(password);
				account.setName(fullName);
				account.setEmail(email);
				account.setAdmin(false);
				account.setAddress(address);
				account.setImage(pictureUrl);
				userDAOs.save(account);
				account = userDao.findById(account.getId()).get();
				a.userAccount(account);
				System.out.println("TẠO THÀNH CÔNG FB: " + formatUsername);
			}
		}

	}
}