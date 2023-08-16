package com.poly.asm.controller.service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.poly.asm.model.MailInfo2;

@Service
@Component
@EnableScheduling
public class MailerServiceImpl2 implements MailerService2 {
	@Autowired
	private JavaMailSender sender;

	private List<MailInfo2> queue = new ArrayList<>();

	@Override
	public void send(MailInfo2 mail) throws MessagingException {
		MimeMessage message = sender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");
		helper.setFrom(mail.getFrom());
		helper.setTo(mail.getTo());
		helper.setSubject(mail.getSubject());
		helper.setText(mail.getBody(), true);
		helper.setReplyTo(mail.getFrom());

		String[] cc = mail.getCc();
		if (cc != null && cc.length > 0) {
			helper.setCc(cc);
		}

		String[] bcc = mail.getBcc();
		if (bcc != null && bcc.length > 0) {
			helper.setBcc(bcc);
		}

		String[] attachments = mail.getAttachments();
		if (attachments != null && attachments.length > 0) {
			for (String path : attachments) {
				File file = new File(path);
				helper.addAttachment(file.getName(), file);
			}
		}

		sender.send(message);
	}

	@Override
	public void send(String to, String subject, String body) throws MessagingException {
		send(new MailInfo2(to, subject, body));
	}

	@Scheduled(fixedDelay = 1000)
	public void run() {
		while (!queue.isEmpty()) {
			MailInfo2 mail = queue.remove(0);
			try {
				this.send(mail);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	@Override
	public void queue(MailInfo2 mail) {
		queue.add(mail);
	}

	@Override
	public void queue(String to, String subject, String body) {
		queue(new MailInfo2(to, subject, body));
	}

}
