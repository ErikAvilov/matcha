CREATE TABLE users (
	id UUID PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	username VARCHAR(50) NOT NULL,
	email VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL,
	birthdate DATE NOT NULL,
	gender VARCHAR(1000),
	orientation VARCHAR(32),
	bio VARCHAR(1000),
	tags VARCHAR(1000)
);

-- All of NOT NULL parameters are here to signify that an instance of users cannot be created
-- without an empty parameter in these fields

CREATE TABLE profile_pictures (
	user_id UUID REFERENCES users(id),
	picture_data BYTEA[],
	PRIMARY KEY (user_id)
); -- Each user will have one of these

-- Don't put a comma at the end of your table lists