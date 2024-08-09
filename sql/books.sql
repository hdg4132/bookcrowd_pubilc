CREATE TABLE `books` (
  `book_id` int NOT NULL AUTO_INCREMENT,
  `ISBN` varchar(45) DEFAULT NULL,
  `book_name` varchar(100) DEFAULT NULL,
  `book_img_url` varchar(100) DEFAULT NULL,
  `publisher` varchar(45) DEFAULT NULL,
  `author` varchar(45) DEFAULT NULL,
  `publish_date` varchar(45) DEFAULT NULL,
  `genre` VARCHAR(45) DEFAULT NULL,
  `pages` SMALLINT DEFAULT NULL,
  `description` TEXT,
  `stock` TINYINT DEFAULT 0,
  `total_quantity` TINYINT DEFAULT 0,
   PRIMARY KEY (`book_id`)
) ENGINE=InnoDB CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;