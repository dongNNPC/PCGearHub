	use master

	Create database pcgearhub

--	drop database pcgearhub

	go
	use pcgearhub
	go
	--I. TAO BẢNG
	-- Tạo bảng Users
	CREATE TABLE Users (
	  id VARCHAR(20) NOT NULL,
	  name NVARCHAR(50) NOT NULL,
	  Password VARCHAR(20) NOT NULL,
	  Phone VARCHAR(10) Not null,
	  email NVARCHAR(100) unique NOT NULL,
	  address NVARCHAR(200),
	  image NVARCHAR(200),
	  admin BIT NOT NULL,
	  status BIT DEFAULT 1,
	  confirm bit,
	  OTP varchar(20),
	);
	go
	-- Tạo bảng Categories
	CREATE TABLE Categories (
	  id VARCHAR(20) NOT NULL,
	  name NVARCHAR(50) NOT NULL,
	 description NVARCHAR(200),
	);
	go
	-- Tạo bảng Products
	CREATE TABLE Products (
	  id VARCHAR(20) NOT NULL,
	  name NVARCHAR(max) NOT NULL,
	  quantity INT NOT NULL,
	  price float not null,
	 description NVARCHAR(max),
	  status BIT NOT NULL,
	  image1 nvarchar(max),
	  image2 nvarchar(max),
	  category_id VARCHAR(20) NOT NULL
	);

	-- Tạo bảng distinctive
	CREATE TABLE distinctives (
	  id VARCHAR(20) NOT NULL,
	 name nvarchar(max),
	);
		-- Tạo bảng products_distinctives
	CREATE TABLE products_distinctives (
	id INT IDENTITY(1,1),
	product_id varchar(20) not null,
	distinctive_id varchar(20) not null
	);


	go
		-- Tạo bảng comments
	CREATE TABLE comments (
	  id VARCHAR(20) NOT NULL,
	 content nvarchar(max),
	 user_id varchar(20) not null,
	product_id varchar(20) not null,

	);

	-- Tạo bảng Invoices
	CREATE TABLE Invoices (
	  id VARCHAR(20) NOT NULL,
	  order_date DATE NOT NULL,
	  status NVARCHAR(50) NOT NULL,
	  user_id VARCHAR(20) NOT NULL,
	);
	go
	-- Tạo bảng DetailedInvoices
	CREATE TABLE detailed_invoices (
		id int Identity(1,1) not null,
	  invoice_id VARCHAR(20) NOT NULL,
	  product_id VARCHAR(20) NOT NULL,
	  quantity INT NOT NULL,
	  payment_method NVARCHAR(200) NOT NULL,
	);
	go
	-- Tạo bảng Carts
	CREATE TABLE Carts (
	id int Identity(1,1) not null,
	  user_id VARCHAR(20) NOT NULL,
	  product_id VARCHAR(20) NOT NULL,
	  quantity INT NOT NULL,
	 order_date DATE NOT NULL,
	  status NVARCHAR(50) NOT NULL,
	);
	go
	-- Tạo bảng Brands
	CREATE TABLE Brands (
	  id VARCHAR(20) NOT NULL,
	  name NVARCHAR(200) NOT NULL,
	  phone_number varchar(10) not null,
	  email nvarchar(100),
	  address nvarchar(max)
	);
	go

	--Tạo bảng suppliers
		CREATE TABLE suppliers (
	  id VARCHAR(20) NOT NULL,
	  name NVARCHAR(200) NOT NULL,
	  phone_number varchar(10) not null,
	  email nvarchar(100),
	    address nvarchar(max)
	);

	-- Tạo bảng StockReceipts
	CREATE TABLE stock_receipts (
	  id VARCHAR(20) NOT NULL,
	  product_id VARCHAR(20) NOT NULL,
	   supplier_id varchar(20) not null,
	  brand_id varchar(20) not null,
	 
	  quantity INT NOT NULL,
	  price FLOAT NOT NULL,
	  order_date Date not null,
	
	);
	go
	--Tạo bảng user histories
	create table user_Histories(
	id_history int Identity(1,1) not null,
	note Nvarchar(200),
	history_date date not null,
	user_id varchar(20) not null,
	);


	--II. Tạo Khóa chính
	-- Thêm khóa chính cho bảng StockReceipts
		ALTER TABLE stock_receipts
	ADD CONSTRAINT PK_DetailedReceipt PRIMARY KEY (id);
	-- Thêm khóa chính cho bảng Users 
		ALTER TABLE Users
	ADD CONSTRAINT PK_User PRIMARY KEY (id);

	go
	
	--Thêm khóa chính cho bảng suppliers
	alter table  suppliers add constraint PK_suppliers primary key (id);

	--Thêm khóa chính cho bảng history
	alter table  user_Histories add constraint PK_history primary key (id_history);

	-- Thêm khóa chính cho bảng Categories
	ALTER TABLE Categories
	ADD CONSTRAINT PK_Categories PRIMARY KEY (id);

	go
	-- Thêm khóa chính cho bảng Products
	ALTER TABLE Products
	ADD CONSTRAINT PK_Products PRIMARY KEY (id);
		-- Thêm khóa chính cho bảng comments
	ALTER TABLE comments
	ADD CONSTRAINT PK_Comments PRIMARY KEY (id);

	go
			-- Thêm khóa chính cho bảng distinctives
	ALTER TABLE distinctives
	ADD CONSTRAINT PK_distinctives PRIMARY KEY (id);

	go
				-- Thêm khóa chính cho bảng products_distinctives
	ALTER TABLE  products_distinctives
	ADD CONSTRAINT PK_products_distinctives PRIMARY KEY (id);

	go

	-- Thêm khóa chính cho bảng Invoices
	ALTER TABLE Invoices
	ADD CONSTRAINT PK_Invoices PRIMARY KEY (id);

	go

	-- Thêm khóa chính cho bảng Brands
	ALTER TABLE Brands
	ADD CONSTRAINT PK_Brands PRIMARY KEY (id);

	-- Thêm khóa chính cho bảng carts
	ALTER TABLE Carts
	ADD CONSTRAINT PK_Carts PRIMARY KEY (id);

	-- Thêm khóa chính cho bảng DetailedInvoices
	ALTER TABLE Detailed_invoices
	ADD CONSTRAINT PK_detailed_invoices PRIMARY KEY (id);

	--III. Tạo khóa ngoại 


	-- Thêm liên kết khóa ngoại cho bảng Products
	ALTER TABLE Products
	ADD CONSTRAINT FK_Product_Categories FOREIGN KEY (category_id) REFERENCES Categories(id)
	go

	-- Thêm liên kết khóa ngoại cho bảng Invoices
	ALTER TABLE Invoices
	ADD CONSTRAINT FK_Invoices_Users FOREIGN KEY (user_id) REFERENCES Users(id);


	go
	-- Thêm liên kết khóa ngoại cho bảng comments
	ALTER TABLE comments
	ADD CONSTRAINT FK_Comments_Users FOREIGN KEY (user_id) REFERENCES Users(id);
		ALTER TABLE comments
	ADD CONSTRAINT FK_Comments_Products FOREIGN KEY (product_id) REFERENCES Products(id);
	go

	-- Thêm liên kết khóa ngoại cho bảng DetailedInvoices
	ALTER TABLE Detailed_invoices
	ADD CONSTRAINT FK_DetailedInvoices_Invoices FOREIGN KEY (invoice_id) REFERENCES Invoices(id)
	ALTER TABLE Detailed_invoices
	ADD CONSTRAINT FK_DetailedInvoices_Products FOREIGN KEY (product_id) REFERENCES Products(id);

	go

	-- Thêm liên kết khóa ngoại cho bảng Carts
	ALTER TABLE Carts
	ADD CONSTRAINT FK_Carts_User FOREIGN KEY (user_id) REFERENCES Users(id)
 
	ALTER TABLE Carts ADD CONSTRAINT FK_Carts_Products FOREIGN KEY (product_id) REFERENCES Products(id);

	go

	-- Thêm liên kết khóa ngoại cho bảng StockReceipts
	ALTER TABLE stock_receipts ADD CONSTRAINT FK_stock_receipts_Products FOREIGN KEY (product_id) REFERENCES Products(id)   ON DELETE CASCADE;
	ALTER TABLE stock_receipts ADD CONSTRAINT FK_stock_receipts_suppliers FOREIGN KEY (supplier_id) REFERENCES suppliers(id)   ON DELETE CASCADE;
	ALTER TABLE stock_receipts ADD CONSTRAINT FK_stock_receipts_brands FOREIGN KEY (brand_id) REFERENCES brands(id)   ON DELETE CASCADE;
	go

	-- thêm liên kết khóa ngoại cho bảng history
	alter table  user_Histories add constraint FK_user_Histories_Users FOREIGN KEY (user_id) REFERENCES users(id)

		-- thêm liên kết khóa ngoại cho bảng products_distinctives
	alter table  products_distinctives add constraint FK_products_distinctives_product FOREIGN KEY (product_id) REFERENCES products(id)
	alter table  products_distinctives add constraint FK_products_distinctives_distinctives FOREIGN KEY (distinctive_id) REFERENCES distinctives(id)
	--III. Thêm dữ liệu

	-- Thêm dữ liệu vào bảng Users
	INSERT INTO Users (id, name, Password, Phone, email, address, image, admin)
	VALUES 
	  ('U001', 'Nguyen Van A', '12345678', '0234567890', 'admin@gmail.com', N'Địa chỉ người dùng 1', 'avatar.jpg', 1),
	   ('U002', N'Nguyễn Nhựt Đông', '12345678', '0393618987', '0393618987dong@gmail.com', N'Ấp hoà phú xã định thành  , huyện thoại sơn tỉnh an giang', 'avatar-11.jpg', 0),
	  ('U003', N'Trần Tấn Khanh', '12345678', '0987654322', 'khanhttpc03027@fpt.edu.vn', N'Số nhà 10, Đường Trần Hưng Đạo, Quận 8, TP.HCM', 'avatar-12.jpg', 0),
	  ('U004', N'Trần Văn Hoàng', '12345678', '0987654321', 'trantankhanh31102003@gmail.com', N'Số nhà 4, Đường Lê Lợi, Quận 2, TP.HCM', 'avatar-4.jpg', 0),
	  ('U005', N'Lê Thị Minh Anh', '12345678', '0234567890', 'anhle@gmail.com', N'Số nhà 5, Đường Nguyễn Đình Chiểu, Quận 3, TP.HCM', 'avatar-5.jpg', 0),
	  ('U006', N'Phạm Văn Tuấn', '12345678', '0987654321', 'tuantuan@gmail.com', N'Số nhà 6, Đường Trần Phú, Quận 4, TP.HCM', 'avatar-6.jpg', 0),
	  ('U007', N'Vũ Thị Hương', '12345678', '0123456789', 'huongvu@gmail.com', N'Số nhà 7, Đường Lý Tự Trọng, Quận 5, TP.HCM', 'avatar-7.jpg', 0),
	  ('U008', N'Ngô Đình Thảo', '12345678', '0987654321', 'thaongo@gmail.com', N'Số nhà 8, Đường Nguyễn Văn Cừ, Quận 6, TP.HCM', 'avatar-8.jpg', 0),
	  ('U009', N'Trương Văn Thắng', '12345678', '0234567890', 'thangtruong@gmail.com', N'Số nhà 9, Đường Hùng Vương, Quận 7, TP.HCM', 'avatar-9.jpg', 0),
	  ('U010', N'Nguyễn Thị Mai', '12345678', '0987654321', 'mainguyen@gmail.com', N'Số nhà 10, Đường Trần Hưng Đạo, Quận 8, TP.HCM', 'avatar-10.jpg', 0);


	-- Thêm dữ liệu vào bảng Categories
	INSERT INTO Categories (id, name, description)
	VALUES 
	  ('C001', N'Giày thể thao', N'Mô tả danh mục 1'),
	  ('C002', N'Giày cao gót', N'Mô tả danh mục 2')

		-- Thêm dữ liệu vào bảng distinctives
	INSERT INTO distinctives(id, name)
	VALUES 
	  ('D001', N'Đặt trưng 1'),
	  ('D002', N'Đặt trưng 2')


	-- Thêm dữ liệu vào bảng Brands
	INSERT INTO Brands (id, name, phone_number,email,address)
	VALUES
	  ('B001', 'Nike', '0829232859','Nike@gmail.com','Địa chỉ nike'),
	 ('B002', 'Guci', '0829232858','Gu@gmail.com','Địa chỉ gu')

	 	-- Thêm dữ liệu vào bảng suppliers
	INSERT INTO suppliers(id, name, phone_number,email,address)

	VALUES
	  ('S001', 'nhà cung cấp 1', '0829232822','ncc1@gmail.com','Địa chỉ ncc1'),
	 ('S002', 'Nhà Cung cấp 2', '0829232833','ncc2@gmail.com','Địa chỉ ncc2')



	-- Thêm dữ liệu vào bảng Products
	INSERT INTO Products (id, name, quantity, price, description, status, category_id)
	VALUES 
	  ('P001', N'Nike Air Max 97 Mschf x Inri Jesus Shoes', 100, 150, N'Tính nhất quán là chìa khóa để xây dựng sức mạnh và sức bền. Những đôi giày chạy bộ Reebok dành cho nam này giúp bạn đạt được tiến bộ ổn định với lớp đệm Floatride Energy Foam mang lại cảm giác nhẹ nhàng và một chuyến đi êm ái, nhạy bén. Lưới phía trên thoải mái và thoáng khí. ', 1, 'C001'),
	  ('P002', N'Giày Thể Thao Nam Bitis Hunter Core Refreshing Collection Marios DSMH06700', 50, 200, N'Tính nhất quán là chìa khóa để xây dựng sức mạnh và sức bền. Những đôi giày chạy bộ Reebok dành cho nam này giúp bạn đạt được tiến bộ ổn định với lớp đệm Floatride Energy Foam mang lại cảm giác nhẹ nhàng và một chuyến đi êm ái, nhạy bén. Lưới phía trên thoải mái và thoáng khí.', 1, 'C001'),
	  ('P003', N'Giày Thể Thao Nam Hunter X - X-NITE 22 Collection DSMH10500', 80, 180, N'Tính nhất quán là chìa khóa để xây dựng sức mạnh và sức bền. Những đôi giày chạy bộ Reebok dành cho nam này giúp bạn đạt được tiến bộ ổn định với lớp đệm Floatride Energy Foam mang lại cảm giác nhẹ nhàng và một chuyến đi êm ái, nhạy bén. Lưới phía trên thoải mái và thoáng khí.', 1, 'C001'),
	  ('P004', N'Giày Thể Thao Nam Hunter Street DSMH10400', 120, 160, N'Tính nhất quán là chìa khóa để xây dựng sức mạnh và sức bền. Những đôi giày chạy bộ Reebok dành cho nam này giúp bạn đạt được tiến bộ ổn định với lớp đệm Floatride Energy Foam mang lại cảm giác nhẹ nhàng và một chuyến đi êm ái, nhạy bén. Lưới phía trên thoải mái và thoáng khí.', 1, 'C001'),
	  ('P005', N'Giày Thể Thao Nam Hunter Tennis DSMH10200', 30, 220,N'Tính nhất quán là chìa khóa để xây dựng sức mạnh và sức bền. Những đôi giày chạy bộ Reebok dành cho nam này giúp bạn đạt được tiến bộ ổn định với lớp đệm Floatride Energy Foam mang lại cảm giác nhẹ nhàng và một chuyến đi êm ái, nhạy bén. Lưới phía trên thoải mái và thoáng khí.', 1, 'C001'),
	  ('P006', N'Giày Thể Thao Nam Hunter X - X-NITE 22 Collection DSMH10500', 60, 190, N'Tính nhất quán là chìa khóa để xây dựng sức mạnh và sức bền. Những đôi giày chạy bộ Reebok dành cho nam này giúp bạn đạt được tiến bộ ổn định với lớp đệm Floatride Energy Foam mang lại cảm giác nhẹ nhàng và một chuyến đi êm ái, nhạy bén. Lưới phía trên thoải mái và thoáng khí.', 1, 'C001'),
	  ('P007', N'Giày Thể Thao Nam Hunter X - SPIKY COLLAR Collection DSMH10600', 100, 250, N'Tính nhất quán là chìa khóa để xây dựng sức mạnh và sức bền. Những đôi giày chạy bộ Reebok dành cho nam này giúp bạn đạt được tiến bộ ổn định với lớp đệm Floatride Energy Foam mang lại cảm giác nhẹ nhàng và một chuyến đi êm ái, nhạy bén. Lưới phía trên thoải mái và thoáng khí.', 1, 'C001'),
	  ('P008', N'Giày Thể Thao Nam Hunter Core - Meteor Collection DSMH10800', 40, 280, N'Tính nhất quán là chìa khóa để xây dựng sức mạnh và sức bền. Những đôi giày chạy bộ Reebok dành cho nam này giúp bạn đạt được tiến bộ ổn định với lớp đệm Floatride Energy Foam mang lại cảm giác nhẹ nhàng và một chuyến đi êm ái, nhạy bén. Lưới phía trên thoải mái và thoáng khí.', 1, 'C001'),
	  ('P009', N'Giày Thể Thao Nam Bitis Hunter X Festive Aurora DSMH03401', 70, 170, N'Tính nhất quán là chìa khóa để xây dựng sức mạnh và sức bền. Những đôi giày chạy bộ Reebok dành cho nam này giúp bạn đạt được tiến bộ ổn định với lớp đệm Floatride Energy Foam mang lại cảm giác nhẹ nhàng và một chuyến đi êm ái, nhạy bén. Lưới phía trên thoải mái và thoáng khí.', 1, 'C001'),
	  ('P010', N'Giày Thể Thao Nữ Bitis Hunter X "CÒN-GÌ-DÙNG-ĐÓ" Colletion – Random 100 RSWH00100', 90, 200, N'Tính nhất quán là chìa khóa để xây dựng sức mạnh và sức bền. Những đôi giày chạy bộ Reebok dành cho nam này giúp bạn đạt được tiến bộ ổn định với lớp đệm Floatride Energy Foam mang lại cảm giác nhẹ nhàng và một chuyến đi êm ái, nhạy bén. Lưới phía trên thoải mái và thoáng khí.', 1, 'C001'),
	  ('P011', N'Giày Thể Thao Nữ Biti’s Hunter X Z Collection InPink DSWH06300', 60, 220, N'Tính nhất quán là chìa khóa để xây dựng sức mạnh và sức bền. Những đôi giày chạy bộ Reebok dành cho nam này giúp bạn đạt được tiến bộ ổn định với lớp đệm Floatride Energy Foam mang lại cảm giác nhẹ nhàng và một chuyến đi êm ái, nhạy bén. Lưới phía trên thoải mái và thoáng khí.', 1, 'C001'),
	  ('P012', N'Giày Bóng Đá Nam Bitis Hunter Football Gen 2K21 Futsal DSMH07300', 50, 260, N'Tính nhất quán là chìa khóa để xây dựng sức mạnh và sức bền. Những đôi giày chạy bộ Reebok dành cho nam này giúp bạn đạt được tiến bộ ổn định với lớp đệm Floatride Energy Foam mang lại cảm giác nhẹ nhàng và một chuyến đi êm ái, nhạy bén. Lưới phía trên thoải mái và thoáng khí.', 1, 'C001'),
	  ('P013', N'Giày Thể Thao Trẻ Em Bitis Hunter Street JUNIOR x Vietmax Hanoi Culture Patchwork - Old Wall DSBH00500', 10, 240, N'Tính nhất quán là chìa khóa để xây dựng sức mạnh và sức bền. Những đôi giày chạy bộ Reebok dành cho nam này giúp bạn đạt được tiến bộ ổn định với lớp đệm Floatride Energy Foam mang lại cảm giác nhẹ nhàng và một chuyến đi êm ái, nhạy bén. Lưới phía trên thoải mái và thoáng khí.', 1, 'C001'),
	  ('P014', N'Giày Thể Thao Nam Bitis Hunter Core Refreshing Collection Contras DSMH06700', 80, 200, N'Tính nhất quán là chìa khóa để xây dựng sức mạnh và sức bền. Những đôi giày chạy bộ Reebok dành cho nam này giúp bạn đạt được tiến bộ ổn định với lớp đệm Floatride Energy Foam mang lại cảm giác nhẹ nhàng và một chuyến đi êm ái, nhạy bén. Lưới phía trên thoải mái và thoáng khí.', 1, 'C001'),
	  ('P015', N'Giày Thể Thao Nam Bitis Hunter X Festive Frosty-White DSMH03500', 40, 180, N'Tính nhất quán là chìa khóa để xây dựng sức mạnh và sức bền. Những đôi giày chạy bộ Reebok dành cho nam này giúp bạn đạt được tiến bộ ổn định với lớp đệm Floatride Energy Foam mang lại cảm giác nhẹ nhàng và một chuyến đi êm ái, nhạy bén. Lưới phía trên thoải mái và thoáng khí.', 1, 'C001'),
	  ('P016', N'Giày Thể Thao Cao Cấp Nữ Bitis Hunter Layered Upper DSWH02800', 70, 190, N'Tính nhất quán là chìa khóa để xây dựng sức mạnh và sức bền. Những đôi giày chạy bộ Reebok dành cho nam này giúp bạn đạt được tiến bộ ổn định với lớp đệm Floatride Energy Foam mang lại cảm giác nhẹ nhàng và một chuyến đi êm ái, nhạy bén. Lưới phía trên thoải mái và thoáng khí.', 1, 'C001'),
	  ('P017', N'Giày Thể Thao Nam Bitis Hunter X Festive Spice Pumpkin DSMH03500', 90, 230, N'Tính nhất quán là chìa khóa để xây dựng sức mạnh và sức bền. Những đôi giày chạy bộ Reebok dành cho nam này giúp bạn đạt được tiến bộ ổn định với lớp đệm Floatride Energy Foam mang lại cảm giác nhẹ nhàng và một chuyến đi êm ái, nhạy bén. Lưới phía trên thoải mái và thoáng khí.', 1, 'C001'),
	  ('P018', N'Giày Thể Thao Nam Bitis Hunter Street Z Collection High White DSMH06200', 60, 250, N'Tính nhất quán là chìa khóa để xây dựng sức mạnh và sức bền. Những đôi giày chạy bộ Reebok dành cho nam này giúp bạn đạt được tiến bộ ổn định với lớp đệm Floatride Energy Foam mang lại cảm giác nhẹ nhàng và một chuyến đi êm ái, nhạy bén. Lưới phía trên thoải mái và thoáng khí.', 1, 'C001'),
	  ('P019', N'Giày Thể Thao Nam Biti’s Hunter Core Z Collection Stone DSMH06400', 30, 280, N'Tính nhất quán là chìa khóa để xây dựng sức mạnh và sức bền. Những đôi giày chạy bộ Reebok dành cho nam này giúp bạn đạt được tiến bộ ổn định với lớp đệm Floatride Energy Foam mang lại cảm giác nhẹ nhàng và một chuyến đi êm ái, nhạy bén. Lưới phía trên thoải mái và thoáng khí.', 1, 'C001'),
	  ('P020', N'Giày Thể Thao Nam Bitis Hunter X Festive Frosty-White DSMH03500', 50, 260, N'Tính nhất quán là chìa khóa để xây dựng sức mạnh và sức bền. Những đôi giày chạy bộ Reebok dành cho nam này giúp bạn đạt được tiến bộ ổn định với lớp đệm Floatride Energy Foam mang lại cảm giác nhẹ nhàng và một chuyến đi êm ái, nhạy bén. Lưới phía trên thoải mái và thoáng khí.', 1, 'C001')
 
 
	  		-- Thêm dữ liệu vào bảng products_distinctives
	INSERT INTO products_distinctives(product_id,distinctive_id)
	VALUES 
	  ( N'P001','D001'),
	  (N'P002','D001')

	-- Thêm dữ liệu vào bảng Invoices
	INSERT INTO Invoices (id, order_date, status, user_id)
	VALUES 
	('I001', '2024-01-10', N'delivered', 'U001'),
	('I002', '2024-02-09', N'delivered', 'U002'),
	('I003', '2024-03-12', N'pending', 'U003'),
	('I004', '2024-04-08', N'delivered', 'U004'),
	('I005', '2024-05-13', N'delivered', 'U003'),
	('I006', '2024-06-12', N'delivered', 'U004'),
	('I007', '2024-07-11', N'pending', 'U004'),
	('I008', '2024-08-07', N'delivered', 'U002'),
	('I009', '2024-09-15', N'delivered', 'U004'),
	('I010', '2024-10-14', N'delivered', 'U003'),
	('I011', '2024-11-06', N'pending', 'U004'),
	('I012', '2024-12-05', N'delivered', 'U001'),
	('I013', '2024-01-18', N'delivered', 'U003'),
	('I014', '2024-02-17', N'delivered', 'U003'),
	('I015', '2024-03-04', N'delivered', 'U002'),
	('I016', '2024-04-16', N'delivered', 'U003'),
	('I017', '2024-05-19', N'delivered', 'U002'),
	('I018', '2024-06-03', N'pending', 'U002'),
	('I019', '2024-07-21', N'delivered', 'U002'),
	('I020', '2024-07-20', N'pending', 'U002'),
	('I021', '2024-01-10', N'pending', 'U001'),
	('I022', '2024-02-09', N'pending', 'U002'),
	('I023', '2024-03-12', N'pending', 'U003'),
	('I024', '2024-04-08', N'delivered', 'U004'),
	('I025', '2024-05-13', N'delivered', 'U003'),
	('I026', '2024-08-12', N'pending', 'U004'),
	('I027', '2024-12-11', N'pending', 'U004'),
	('I028', '2024-11-07', N'delivered', 'U002'),
	('I029', '2024-09-15', N'delivered', 'U004'),
	('I030', '2024-01-14', N'delivered', 'U003'),
	('I031', '2024-02-06', N'pending', 'U004'),
	('I032', '2024-03-05', N'delivered', 'U001'),
	('I033', '2024-05-18', N'cancelled', 'U003'),
	('I034', '2024-11-17', N'delivered', 'U003'),
	('I035', '2024-07-04', N'cancelled', 'U002'),
	('I036', '2024-09-16', N'pending', 'U003'),
	('I037', '2024-01-19', N'cancelled', 'U002'),
	('I038', '2024-12-03', N'delivered', 'U002'),
	('I039', '2024-02-21', N'pending', 'U002'),
	('I040', '2024-03-20', N'delivered', 'U002')
		INSERT INTO Invoices (id, order_date, status, user_id)
	SELECT 'INV001', '2023-01-01', 'pending', 'U002'
	UNION ALL SELECT 'INV002', '2023-02-01', 'pending', 'U002'
	UNION ALL SELECT 'INV003', '2023-03-01', 'delivered', 'U002'
	UNION ALL SELECT 'INV004', '2023-04-01', 'delivered', 'U002'
	UNION ALL SELECT 'INV005', '2023-05-01', 'delivered', 'U002'
	UNION ALL SELECT 'INV006', '2023-06-01', 'delivered', 'U003'
	UNION ALL SELECT 'INV007', '2023-07-01', 'pending', 'U003'
	UNION ALL SELECT 'INV008', '2023-08-01', 'delivered', 'U003'
	UNION ALL SELECT 'INV009', '2023-09-01', 'delivered', 'U003'
	UNION ALL SELECT 'INV010', '2023-10-01', 'delivered', 'U003'
	UNION ALL SELECT 'INV011', '2023-11-01', 'delivered', 'U003'
	UNION ALL SELECT 'INV012', '2023-12-01', 'pending', 'U003'
	UNION ALL SELECT 'INV0022', '2023-02-01', 'delivered', 'U002'
	UNION ALL SELECT 'INV0032', '2023-03-01', 'pending', 'U002'
	UNION ALL SELECT 'INV0042', '2023-07-01', 'delivered', 'U004'
	UNION ALL SELECT 'INV0052', '2023-05-01', 'delivered', 'U002'
	UNION ALL SELECT 'INV0062', '2023-07-01', 'pending', 'U004'
	UNION ALL SELECT 'INV0072', '2023-07-01', 'delivered', 'U004'
	UNION ALL SELECT 'INV0082', '2023-07-01', 'delivered', 'U004'
	UNION ALL SELECT 'INV0092', '2023-09-01', 'delivered', 'U004'
	UNION ALL SELECT 'INV0102', '2023-11-01', 'pending', 'U003'
	UNION ALL SELECT 'INV0112', '2023-11-01', 'delivered', 'U004'
	UNION ALL SELECT 'INV0122', '2023-12-01', 'delivered', 'U002';
	-- Thêm dữ liệu vào bảng DetailedInvoices
	INSERT INTO detailed_invoices (invoice_id, product_id, quantity, payment_method)
	VALUES 
	  ('I001', 'P001', 2, N'Thanh toán khi nhận hàng'),
	  ('I001', 'P002', 1, N'Thanh toán qua ví điện tử'),
	  ('I002', 'P003', 3, N'Thanh toán khi nhận hàng'),
	  ('I002', 'P004', 2, N'Thanh toán qua thẻ tín dụng'),
	  ('I003', 'P005', 1, N'Thanh toán khi nhận hàng'),
	  ('I003', 'P006', 4, N'Thanh toán qua ví điện tử'),
	  ('I004', 'P007', 2, N'Thanh toán khi nhận hàng'),
	  ('I004', 'P008', 1, N'Thanh toán qua thẻ tín dụng'),
	  ('I005', 'P009', 3, N'Thanh toán khi nhận hàng'),
	  ('I005', 'P010', 2, N'Thanh toán qua ví điện tử'),
	  ('I006', 'P011', 1, N'Thanh toán khi nhận hàng'),
	  ('I006', 'P012', 3, N'Thanh toán qua thẻ tín dụng'),
	  ('I007', 'P013', 2, N'Thanh toán khi nhận hàng'),
	  ('I007', 'P014', 1, N'Thanh toán qua ví điện tử'),
	  ('I008', 'P015', 4, N'Thanh toán khi nhận hàng'),
	  ('I008', 'P016', 2, N'Thanh toán qua thẻ tín dụng'),
	  ('I009', 'P017', 1, N'Thanh toán khi nhận hàng'),
	  ('I009', 'P018', 3, N'Thanh toán qua ví điện tử'),
	  ('I010', 'P019', 2, N'Thanh toán khi nhận hàng'),
	  ('I010', 'P020', 1, N'Thanh toán qua thẻ tín dụng');


	-- Thêm dữ liệu vào bảng StockReceipts
	INSERT INTO stock_receipts(id, product_id,supplier_id,brand_id, quantity, price, order_date)
	VALUES 
	('R001', 'P001','S001','B001', 100, 150, '2023-06-30'),
	('R002', 'P002','S001','B001', 50, 400, '2023-06-29'),
	('R003', 'P003','S001','B001', 120, 200, '2023-06-28'),
	('R004','P004','S001','B001', 80, 300, '2023-06-27'),
	('R005','P005','S001','B001', 60, 250, '2023-06-26'),
	('R006', 'P006','S001','B001', 90, 350, '2023-06-25'),
	('R007',  'P007','S001','B001', 110, 180, '2023-06-24'),
	('R008', 'P008','S001','B001', 70, 400, '2023-06-23'),
	('R009', 'P009','S001','B001', 95, 220, '2023-6-22'),
	('R010', 'P010','S002','B002', 120, 250, '2023-06-21'),
	('R011', 'P011','S002','B002', 80, 300, '2023-10-20'),
	('R012', 'P012','S002','B002', 65, 350, '2023-11-19'),
	('R013', 'P013','S002','B002', 105, 190, '2023-12-18'),
	('R014', 'P014','S002','B002', 75, 400, '2023-04-17'),
	('R015',  'P015','S002','B002', 100, 230, '2023-06-16'),
	('R016', 'P016','S002','B002', 115, 270, '2023-06-15'),
	('R017', 'P017','S002','B002', 85, 320, '2023-06-14'),
	('R018',  'P018','S002','B002', 55, 400, '2023-06-13'),
	('R019', 'P019','S002','B002', 70, 200, '2023-06-12'),
	('R020', 'P020','S002','B002', 90, 350, '2023-12-11')



	
-- Insert data into detailed_invoices table
INSERT INTO detailed_invoices (invoice_id, product_id, quantity, payment_method)
SELECT 'INV001', 'P001', 2, 'Thanh toán khi nhận hàng'
UNION ALL SELECT 'INV002', 'P002', 1, N'Thanh toán khi nhận hàng'
UNION ALL SELECT 'INV003', 'P003', 3, N'Thanh toán khi nhận hàng'
UNION ALL SELECT 'INV004', 'P004', 2, N'Thanh toán khi nhận hàng'
UNION ALL SELECT 'INV005', 'P005', 1, N'Thanh toán khi nhận hàng'
UNION ALL SELECT 'INV006', 'P006', 2, N'Thanh toán khi nhận hàng'
UNION ALL SELECT 'INV007', 'P007', 3, N'Thanh toán khi nhận hàng'
UNION ALL SELECT 'INV008', 'P008', 1, N'Thanh toán khi nhận hàng'
UNION ALL SELECT 'INV009', 'P009', 2, N'Thanh toán khi nhận hàng'
UNION ALL SELECT 'INV010', 'P010', 3, N'Thanh toán khi nhận hàng'
UNION ALL SELECT 'INV011', 'P011', 1, N'Thanh toán khi nhận hàng'
UNION ALL SELECT 'INV012', 'P012', 2, N'Thanh toán khi nhận hàng';


INSERT INTO detailed_invoices (invoice_id, product_id, quantity, payment_method)
VALUES
('INV001', 'P001', 2, N'Thanh toán khi nhận hàng'),
('INV001', 'P002', 1, N'Thanh toán khi nhận hàng'),
('INV002', 'P003', 3, N'Thanh toán khi nhận hàng'),
('INV002', 'P004', 2, N'Thanh toán khi nhận hàng'),
('INV003', 'P005', 1, N'Thanh toán khi nhận hàng'),
('INV003', 'P006', 2, N'Thanh toán khi nhận hàng'),
('INV004', 'P007', 3, N'Thanh toán khi nhận hàng'),
('INV004', 'P008', 1, N'Thanh toán khi nhận hàng'),
('INV005', 'P009', 2, N'Thanh toán khi nhận hàng'),
('INV005', 'P010', 1, N'Thanh toán khi nhận hàng'),
('INV006', 'P011', 2, N'Thanh toán khi nhận hàng'),
('INV006', 'P012', 3, N'Thanh toán khi nhận hàng'),
('INV007', 'P013', 1, N'Thanh toán khi nhận hàng'),
('INV007', 'P014', 2, N'Thanh toán khi nhận hàng'),
('INV008', 'P015', 3, N'Thanh toán khi nhận hàng'),
('INV008', 'P016', 1, N'Thanh toán khi nhận hàng'),
('INV009', 'P017', 2, N'Thanh toán khi nhận hàng'),
('INV009', 'P018', 1, N'Thanh toán khi nhận hàng'),
('INV010', 'P019', 2, N'Thanh toán khi nhận hàng'),
('INV010', 'P020', 3, N'Thanh toán khi nhận hàng'),
('INV011', 'P001', 1, N'Thanh toán khi nhận hàng'),
('INV011', 'P002', 2, N'Thanh toán khi nhận hàng'),
('INV012', 'P003', 3, N'Thanh toán khi nhận hàng'),

('INV0022', 'P001', 2, N'Thanh toán khi nhận hàng'),
('INV0032', 'P002', 1, N'Thanh toán khi nhận hàng'),
('INV0042', 'P003', 3, N'Thanh toán khi nhận hàng'),
('INV0052', 'P004', 2, N'Thanh toán khi nhận hàng'),
('INV0062', 'P005', 1, N'Thanh toán khi nhận hàng'),
('INV0072', 'P006', 2, N'Thanh toán khi nhận hàng'),
('INV0082', 'P007', 3, N'Thanh toán khi nhận hàng'),
('INV0092', 'P008', 1, N'Thanh toán khi nhận hàng'),
('INV0102', 'P009', 2, N'Thanh toán khi nhận hàng'),
('INV0112', 'P010', 1, N'Thanh toán khi nhận hàng'),
('INV0122', 'P011', 2, N'Thanh toán khi nhận hàng'),

('I001', 'P001', 2, N'Thanh toán khi nhận hàng'),
('I001', 'P002', 1, N'Thanh toán khi nhận hàng'),
('I002', 'P003', 3, N'Thanh toán khi nhận hàng'),
('I002', 'P004', 2, N'Thanh toán khi nhận hàng'),
('I003', 'P005', 1, N'Thanh toán khi nhận hàng'),
('I003', 'P006', 2, N'Thanh toán khi nhận hàng'),
('I004', 'P007', 3, N'Thanh toán khi nhận hàng'),
('I004', 'P008', 1, N'Thanh toán khi nhận hàng'),
('I005', 'P009', 2, N'Thanh toán khi nhận hàng'),
('I005', 'P010', 1, N'Thanh toán khi nhận hàng'),
('I006', 'P011', 2, N'Thanh toán khi nhận hàng'),
('I006', 'P012', 3, N'Thanh toán khi nhận hàng'),
('I007', 'P013', 1, N'Thanh toán khi nhận hàng'),
('I007', 'P014', 2, N'Thanh toán khi nhận hàng'),
('I008', 'P015', 3, N'Thanh toán khi nhận hàng'),
('I008', 'P016', 1, N'Thanh toán khi nhận hàng'),
('I009', 'P017', 2, N'Thanh toán khi nhận hàng'),
('I009', 'P018', 1, N'Thanh toán khi nhận hàng'),
('I010', 'P019', 2, N'Thanh toán khi nhận hàng'),
('I010', 'P020', 3, N'Thanh toán khi nhận hàng'),
('I011', 'P001', 1, N'Thanh toán khi nhận hàng'),
('I011', 'P002', 2, N'Thanh toán khi nhận hàng'),
('I012', 'P003', 3, N'Thanh toán khi nhận hàng'),
('I013', 'P013', 1, N'Thanh toán khi nhận hàng'),
('I014', 'P014', 2, N'Thanh toán khi nhận hàng'),
('I015', 'P015', 3, N'Thanh toán khi nhận hàng'),
('I016', 'P016', 1, N'Thanh toán khi nhận hàng'),
('I017', 'P017', 2, N'Thanh toán khi nhận hàng'),
('I018', 'P018', 1, N'Thanh toán khi nhận hàng'),
('I019', 'P019', 2, N'Thanh toán khi nhận hàng'),
('I020', 'P020', 3, N'Thanh toán khi nhận hàng'),

('I021', 'P001', 2, N'Thanh toán khi nhận hàng'),
('I021', 'P002', 1, N'Thanh toán khi nhận hàng'),
('I023', 'P003', 3, N'Thanh toán khi nhận hàng'),
('I024', 'P004', 2, N'Thanh toán khi nhận hàng'),
('I025', 'P005', 1, N'Thanh toán khi nhận hàng'),
('I026', 'P006', 2, N'Thanh toán khi nhận hàng'),
('I027', 'P007', 3, N'Thanh toán khi nhận hàng'),
('I028', 'P008', 1, N'Thanh toán khi nhận hàng'),
('I029', 'P009', 2, N'Thanh toán khi nhận hàng'),
('I030', 'P010', 1, N'Thanh toán khi nhận hàng'),
('I031', 'P011', 2, N'Thanh toán khi nhận hàng'),
('I032', 'P012', 3, N'Thanh toán khi nhận hàng'),
('I033', 'P013', 1, N'Thanh toán khi nhận hàng'),
('I034', 'P014', 2, N'Thanh toán khi nhận hàng'),
('I035', 'P015', 3, N'Thanh toán khi nhận hàng'),
('I036', 'P016', 1, N'Thanh toán khi nhận hàng'),
('I037', 'P017', 2, N'Thanh toán khi nhận hàng'),
('I038', 'P018', 1, N'Thanh toán khi nhận hàng'),
('I039', 'P019', 2, N'Thanh toán khi nhận hàng'),
('I040', 'P020', 3, N'Thanh toán khi nhận hàng')

-- thêm dữ liệu cho bảng distinctives

INSERT INTO distinctives (id, name)
VALUES 
  ('D1', 'Tính chất 1'),
  ('D2', 'Tính chất 2'),
  ('D3', 'Tính chất 3');

  --Thêm dữ liệu cho bảng products_distinctives

  INSERT INTO products_distinctives (product_id, distinctive_id)
VALUES
  ('P001', 'D1'),
  ('P001', 'D2'),
  ('P002', 'D2'),
  ('P003', 'D3');