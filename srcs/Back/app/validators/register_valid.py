from fastapi import Request
from datetime import datetime

def password_validator(password):
	authorized_characters = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ0123456789~`!@#$%^&*()_-+={[}]|\:;\"'<,>.?/" # who tf uses spaces in a password? grow up
	for char in password:
		if char not in authorized_characters:
			return False
	return True

def username_validator(username):
	authorized_characters = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ0123456789" # pretty basic
	for char in username:
		if char not in authorized_characters:
			return False
	return True

def name_validator(name):
	authorized_characters = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ" # Unless your dad is elon musk, you get pussy
	for char in name:
		if char not in authorized_characters:
			return False
	return True

def calculate_age(birthdate): # Returns the exact age, yes it's chatgpt code
	birthdate = datetime.strptime(birthdate, "%Y-%m-%d")
	current_date = datetime.now()
	age = current_date.year - birthdate.year - ((current_date.month, current_date.day) < (birthdate.month, birthdate.day))
	return age

def validator(data): # Shouldn't be async or else it skips the function in the endpoint
	if len(data.get('email')) > 100 or len(data.get('username')) > 50 or len(data.get('password')) > 100:
		return False
	if password_validator(data.get('password')) is False: # Validates the password format, spaces are forbidden and i don't care
		return False
	if name_validator(data.get('first_name')) is False or name_validator(data.get('last_name')) is False:
		return False
	if username_validator(data.get('username')) is False:
		return False
	if calculate_age(data.get('birthdate')) < 18: # Grooming preventer
		return False
	for key, info in data.items(): # Checks if an item has a space or is empty
		if ' ' in info or not info:
			print(f'{key} is empty')
			return False
	return True


# Apparently validators are forbidden so I gotta code the entire thing by hand... IN PYTHON???