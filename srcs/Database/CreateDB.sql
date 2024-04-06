CREATE TABLE users (
	id UUID PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	username VARCHAR(50) NOT NULL,
	email VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL,
	gender VARCHAR(1000) NOT NULL,
	orientation VARCHAR(32) NOT NULL,
	birthdate DATE NOT NULL
);

-- Don't put a comma at the end (line 10)