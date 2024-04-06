from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from .models import User, create_user, create_pool, close_pool
from .validators.register_valid import validator

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

@app.post("/register")
async def register_user(request: Request):
	json_data = await request.json()
	if validator(json_data) is False:
		return ({'ok': False, 'message': "Something's wrong with your form data"})
	try:
		user_id = await create_user(json_data)
	except Exception as e:
		print(e)
		return ({'ok': False, 'message': 'Something broke, refresh the page or something'})
	return ({'ok': True, 'id': user_id})
