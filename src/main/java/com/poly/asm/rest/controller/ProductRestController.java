package com.poly.asm.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.poly.asm.controller.service.ProductService;
import com.poly.asm.model.Category;
import com.poly.asm.model.Product;
import com.poly.asm.model.Top10NewProducts;
import com.poly.asm.respository.ProductRepository;

import javax.servlet.http.HttpServlet;

@RestController
@CrossOrigin("*")
@RequestMapping("/pcgearhub")
public class ProductRestController extends HttpServlet {
	@Autowired
	ProductRepository dao;
	// @Autowired ProductService productService;

	@GetMapping("/rest/products")
	public ResponseEntity<List<Product>> getAll(Model model) {
		return ResponseEntity.ok(dao.findAll());
	}

	@GetMapping("/rest/product/{id}")
	public ResponseEntity<Product> getOne(@PathVariable("id") String id) {
		// check xem id cs tồn tại trong cơ sở dữ liệu hay không trả về true or false
		if (!dao.existsById(id)) {
			return ResponseEntity.notFound().build();

		}
		return ResponseEntity.ok(dao.findById(id).get());
	}
	// Tìm danh mục theo category

	@GetMapping("/rest/product/{id}/category")
	public ResponseEntity<Category> getCategoryByProductId(@PathVariable("id") String id) {
		if (!dao.existsById(id)) {
			return ResponseEntity.notFound().build();
		}

		Category category = dao.findCategoryByProductId(id);
		if (category == null) {
			return ResponseEntity.notFound().build();
		}

		return ResponseEntity.ok(category);
	}

	@PostMapping("/rest/product")
	// đưa dữ liệu consumer lên rest API @requesstBody
	public ResponseEntity<Product> post(@RequestBody Product product) {
		if (dao.existsById(product.getId())) {
			return ResponseEntity.badRequest().build();
		}
		dao.save(product);
		return ResponseEntity.ok(product);
	}

	@PutMapping("/rest/product/{id}")
	public ResponseEntity<Product> put(@PathVariable("id") String id, @RequestBody Product product) {
		if (!dao.existsById(id /* product.getId() */)) {
			return ResponseEntity.notFound().build();
		}
		dao.save(product);
		return ResponseEntity.ok(product);
	}

	@DeleteMapping("/rest/product/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") String id) {
		if (!dao.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		dao.deleteById(id);
		return ResponseEntity.ok().build();
	}

	// tìm kiêm sản phẩm trong trang index
	@GetMapping("/rest/products/search/{name}")
	public ResponseEntity<List<Product>> searchProductsByName(@PathVariable(name = "name") String name) {
		List<Product> searchResults = dao.findProductsByNameAll(name);
		return ResponseEntity.ok(searchResults);
	}

	@GetMapping("/rest/products/top10new")
	public ResponseEntity<List<Top10NewProducts>> getTop10NewProducts() {
		List<Top10NewProducts> top10NewProducts = dao.findProductsAndStockReceipts();
		return ResponseEntity.ok(top10NewProducts);
	}



	@GetMapping("/rest/productByCategory/{id}")
	public ResponseEntity<List<Product>> getProductByCategory(@PathVariable(name = "id") String id) {
		return ResponseEntity.ok(dao.findProductsByCategory(id));
	}
}
