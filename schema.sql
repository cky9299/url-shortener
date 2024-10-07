/*
mysql -u root -p < schema.sql
*/

SET GLOBAL wait_timeout = 8640000;


CREATE DATABASE url_shortener1;
USE url_shortener1;


CREATE TABLE urls (
    id INT AUTO_INCREMENT PRIMARY KEY,
    target_url VARCHAR(255) NOT NULL,
    short_code VARCHAR(15) UNIQUE NOT NULL,
    title VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE url_visits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    short_code VARCHAR(15) NOT NULL,
    click_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    ip_address VARCHAR(45),
    city VARCHAR(100),
    region VARCHAR(45),
    country VARCHAR(45),

    FOREIGN KEY (short_code) REFERENCES urls(short_code)
);

CREATE TABLE clicks (
     short_code VARCHAR(15) UNIQUE NOT NULL PRIMARY KEY,
     clicks INT,
     FOREIGN KEY (short_code) REFERENCES url_visits(short_code)
);

