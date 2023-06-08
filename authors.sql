CREATE USER IF NOT EXISTS 'admin'@'%' IDENTIFIED WITH mysql_native_password BY 'pswd';
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' WITH GRANT OPTION;

USE `authors`;

CREATE TABLE `authors` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO authors (id, name) VALUES
(1, 'Author 1'),
(2, 'Author 2'),
(3, 'Author 3'),
(4, 'Author 4'),
(5, 'Author 5');
