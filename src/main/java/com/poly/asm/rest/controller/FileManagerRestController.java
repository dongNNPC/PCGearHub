package com.poly.asm.rest.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.poly.asm.controller.service.FileManagerService;

import javax.servlet.http.HttpServlet;
import javax.websocket.server.PathParam;

@RestController
@CrossOrigin("*")
@RequestMapping("/pcgearhub")
public class FileManagerRestController extends HttpServlet {

	@Autowired
	FileManagerService fileService;

	@GetMapping("/rest/files/{folder}/{file}")
	public byte[] dowload(@PathVariable("folder") String folder, @PathVariable("file") String file) {
		return fileService.read(folder, file);
	}

	@PostMapping("/rest/files/{folder}")
	public List<String> upload(@PathVariable("folder") String folder, @PathParam("files") MultipartFile[] files) {
		return fileService.save(folder, files);
	}

	@DeleteMapping("/rest/files/{folder}/{file}")
	public void delete(@PathVariable("folder") String folder, @PathVariable("file") String file) {
		fileService.delete(folder, file);
	}

	@GetMapping("/rest/files/{folder}")
	public List<String> list(@PathVariable("folder") String folder) {
		return fileService.list(folder);
	}

// 1 hình nền gọi thằng đến tên tấm hình đó
	@GetMapping("/rest/files/{folder}/one/{filename}")
	public List<String> getSingleImage(@PathVariable("folder") String folder,
			@PathVariable("filename") String filename) {
		List<String> singleImageList = new ArrayList<>();
		singleImageList.add(filename);
		return singleImageList;
	}

}
