package com.poly.asm.controller.service;

import javax.mail.MessagingException;

import com.poly.asm.model.MailInfo2;

public interface MailerService2 {
	/**
	 * Gửi email
	 *
	 * @param mail thông tin email
	 * @throws MessagingException lỗi gửi email
	 */
	void send(MailInfo2 mail) throws MessagingException;

	/**
	 * Gửi email đơn giản
	 *
	 * @param to      email người nhận
	 * @param subject tiêu đề email
	 * @param body    nội dung email
	 * @throws MessagingException lỗi gửi email
	 */
	void send(String to, String subject, String body) throws MessagingException;

	/**
	 * 
	 * @param mail thông tin email
	 */
	void queue(MailInfo2 mail);

	/**
	 * Tạo MailInfo2 và xếp vào hàng đợi
	 * 
	 * @param to      email người nhận
	 * @param subject tiêu đề email
	 * @param body    nội dung email
	 */
	void queue(String to, String subject, String body);

}
