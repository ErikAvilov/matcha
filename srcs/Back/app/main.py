from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .models import create_pool, close_pool
from .authentication.login import router as user_router
from .authentication.registration import router as auth_router
from .authentication.profile import router as profile_router

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

@app.on_event("startup")
async def startup_event():
	await create_pool()

@app.on_event("shutdown")
async def shutdown():
	await close_pool()


app.include_router(user_router)
app.include_router(auth_router)
app.include_router(profile_router)

