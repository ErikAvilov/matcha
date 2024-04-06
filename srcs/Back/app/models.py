import asyncpg
from asyncpg import Pool
from pydantic import BaseModel, Field
from fastapi import FastAPI
from uuid import UUID, uuid4

app = FastAPI()

DATABASE_URL = "postgresql://eavilov:1234@database/postgres"

pool = None

async def get_pool() -> Pool:
	global pool
	if pool is None:
		pool = await asyncpg.create_pool(DATABASE_URL)
	return pool

class User(BaseModel):
	id: UUID = Field(default_factory=uuid4)
	username: str
	email: str
	password: str

async def create_user(user: User) -> UUID:
	async with await get_pool() as pool:
		async with pool.acquire() as connection:
			query = """
				INSERT INTO users (id, username, email, pasword)
				VALUES ($1, $2, $3, $4)
			"""
		await connection.execute(query, user.id, user.username, user.email, user.password)
		return user.id

async def get_user(user_id: int) -> User:
	async with get_pool() as connection:
		query = "SELECT id, username, email FROM users WHERE id = $1"
		row = await connection.fetchrow(query, user_id)
		return User(**row)

async def read_user(user_id: int):
	return await get_user(user_id)