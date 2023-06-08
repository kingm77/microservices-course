CREATE USER 'admin'@'%' IDENTIFIED WITH mysql_native_password BY 'pswd';
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' WITH GRANT OPTION;

use `books`;

CREATE TABLE `books` (
  `id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `authorId` int DEFAULT NULL,
  `categoryId` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO books (id, title, authorId, categoryId) VALUES
(1, 'Book 1', 1, 1),
(2, 'Book 2', 2, 2),
(3, 'Book 3', 3, 3),
(4, 'Book 4', 4, 4),
(5, 'Book 5', 5, 5);


