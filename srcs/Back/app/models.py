import asyncpg
import asyncpg.pool
from fastapi import FastAPI
from uuid import UUID
from datetime import datetime
import uuid
import os

POSTGRES_USER = os.getenv("POSTGRES_USER")
POSTGRES_HOST = os.getenv("POSTGRES_HOST")
POSTGRES_NAME = os.getenv("POSTGRES_NAME")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
POSTGRES_PORT = os.getenv("POSTGRES_PORT")

app = FastAPI()

DATABASE_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_NAME}"

pool: asyncpg.pool.Pool = None

async def create_pool():
	global pool
	print('===================HELLO====================')
	pool = await asyncpg.create_pool(DATABASE_URL)

async def close_pool():
	print('===================CLOSING====================')
	await pool.close()

async def create_user(data) -> UUID:
	query = "INSERT INTO users (id, first_name, last_name, username, email, password, birthdate) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id"
	date_string = data.get('birthdate')
	date_object = datetime.strptime(date_string, '%Y-%m-%d')
	values = (str(data.get('id')), data.get('first_name'), data.get('last_name'), data.get('username'), data.get('email'), data.get('password'), date_object)
	async with pool.acquire() as conn:
		await conn.fetchval(query, *values)
		return data.get('first_name')

async def connect_to_db():
	return await asyncpg.connect(DATABASE_URL)

async def disconnect_from_db(conn):
	await conn.close()

async def read_user(user_id: int):
	return await get_user(user_id)