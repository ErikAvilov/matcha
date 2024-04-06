from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .models import User, create_user

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.post("/register")
async def register_user(user: User):
    user_id = await create_user(user)
    return ({'ok': True, 'id': user_id})
