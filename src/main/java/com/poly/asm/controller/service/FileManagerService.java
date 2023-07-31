package com.poly.asm.controller.service;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;

@Service
public class FileManagerService {
	@Autowired
	ServletContext appContext;

	private Path getPath(String folder, String filename) {
		File dir = Paths.get(appContext.getRealPath("/files/"), folder).toFile();
		if (!dir.exists()) {
			dir.mkdir();
		}
		return (Path) Paths.get(dir.getAbsolutePath(), filename);
	}

	public byte[] read(String folder, String filename) {
		Path path = this.getPath(folder, filename);
		try {
			return Files.readAllBytes(path);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	public List<String> list(String folder) {
		List<String> filenames = new ArrayList<>();
		File dir = Paths.get(appContext.getRealPath("/files/"), folder).toFile();
		if (dir.exists()) {
			File[] files = dir.listFiles();
			for (File file : files) {
				filenames.add(file.getName());
			}
		}
		return filenames;
	}

	/*
	 * public List<String> save(String folder, MultipartFile[] files) { List<String>
	 * filenames = new ArrayList<>(); for (MultipartFile file : files) { String name
	 * = System.currentTimeMillis() + file.getOriginalFilename(); String filename =
	 * Integer.toHexString(name.hashCode()) + name.substring(name.lastIndexOf("."));
	 * Path path = this.getPath(folder, filename); try { file.transferTo(path);
	 * filenames.add(filename); } catch (Exception e) { e.printStackTrace(); } }
	 * return filenames; }
	 */

	public List<String> save(String folder, MultipartFile[] files) {
		List<String> filenames = new ArrayList<>();
		for (MultipartFile file : files) {
			String originalFilename = file.getOriginalFilename();
			Path path = this.getPath(folder, originalFilename);
			try {
				file.transferTo(path);
				filenames.add(originalFilename);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return filenames;
	}

	public void delete(String folder, String filename) {
		Path path = this.getPath(folder, filename);
		path.toFile().delete();
	}
}
