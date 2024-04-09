from fastapi import Request
from datetime import datetime
from email_validator import validate_email, EmailNotValidError
import re

def password_validator(password):
	pattern = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?!.*\s)[A-Za-z\d@$!%*?&]{8,}$" # who tf uses spaces in a password? grow up
	regex = re.compile(pattern)
	if not regex.fullmatch(password):
		return False
	return True

def email_validator(email):
	try:
		validate_email(email)
		return True
	except EmailNotValidError:
		return False

def username_validator(username):
	authorized_characters = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ0123456789" # pretty basic
	for char in username:
		if char not in authorized_characters:
			return False
	return True

def name_validator(name):
	authorized_characters = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ" # If your dad is elon musk, you get no pussy
	for char in name:
		if char not in authorized_characters:
			return False
	return True

def calculate_age(birthdate): # Returns the exact age, yes it's chatgpt code
	birthdate = datetime.strptime(birthdate, "%Y-%m-%d")
	current_date = datetime.now()
	age = current_date.year - birthdate.year - ((current_date.month, current_date.day) < (birthdate.month, birthdate.day))
	return age

def correct_gender(gender): # In case someone makes a manual request and 500's the server
	authorized_gender = ['Male', 'Female', 'Non-binary']
	for gen in authorized_gender:
		if gender == gen:
			return True
	return False

def validator(data): # Shouldn't be async or else it skips the function in the endpoint
	if len(data.get('email')) > 100 or len(data.get('username')) > 50 or len(data.get('password')) > 100 \
		or len(data.get('first_name')) > 50 or len(data.get('last_name')) > 50:
		raise Exception("One of the parameters is too long")
	for key, info in data.items(): # Checks if an item has a space or is empty
		if ' ' in info or not info: # There is a much proper way of coding it but I needed the "key" for debugging
			raise Exception(f'{key} is empty')
	if not password_validator(data.get('password')): # Validates the password format, spaces are forbidden and i don't care
		raise Exception("wrong password format")
	if not email_validator(data.get('email')):
		raise Exception("wrong email format")
	if not all(name_validator(data.get(field, '')) for field in ['first_name', 'last_name']):
		raise Exception("first or last name is invalid, or both idk")
	if not username_validator(data.get('username')):
		raise Exception('username is invalid')
	user_age = calculate_age(data.get('birthdate'))
	if user_age < 18 or user_age > 80: # Grooming preventer
		raise Exception("she's underage or barely standing")
	return True


# Apparently validators are forbidden so I gotta code the entire thing by hand... IN PYTHON???