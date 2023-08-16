package com.poly.asm.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MailInfo2 {

	String from;
	String to;
	String[] cc;
	String[] bcc;
	String subject;
	String body;
	String[] attachments;

	public MailInfo2(String to, String subject, String body) {
		this.from = "khanhttpc03027@fpt.edu.vn";
		this.to = to;
		this.subject = subject;
		this.body = body;
	}
}