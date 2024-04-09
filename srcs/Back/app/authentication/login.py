from fastapi import Request, APIRouter, Depends
from ..models import log_user, find_user, oauth2_scheme
from typing import Annotated
from datetime import datetime, timedelta, timezone
from ..globals import *
import jwt

router = APIRouter()
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7 # a week basically

def create_token(data: dict, algorithm, expired_delta: timedelta):
	to_encode = data.copy()
	current_time_utc = datetime.now(timezone.utc)
	expire = current_time_utc + expired_delta
	to_encode.update({"exp": expire})
	encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=algorithm)
	return encoded_jwt

@router.get('/whoami')
async def get_user(token: Annotated[str, Depends(oauth2_scheme)]):
	try:
		payload = jwt.decode(token, SECRET_KEY, algorithms=[ACCESS_ALGORITHM])
		user_id = payload.get('sub')
		print(payload.get('sub'))
		username = await find_user('username', user_id)
	except jwt.ExpiredSignatureError:
		print("Token has expired")
		return {'message': "Token has expired", 'code': 401}
	except jwt.InvalidTokenError:
		print("Invalid token")
		return {'message': "Invalid token", 'code': 401}
	except jwt.DecodeError:
		print("Error decoding token")
		return {'message': "Error decoding token"} # Idk why it's unreachable
	except Exception as e:
		print(f"An unexpected error occurred: {e}")
		return {'message': f"An unexpected error occurred: {e}", }
	print(f'You are {username}!')
	return {'message': f'You are {username}!'}

@router.post('/login')
async def login_user(request: Request):
	json_data = await request.json()
	values = (json_data.get('username'), json_data.get('password'))
	user_id = await log_user(values)
	if user_id is not None:
		access_token = create_token(data={"sub": str(user_id)}, algorithm=ACCESS_ALGORITHM, expired_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
		refresh_token = create_token(data={"sub": str(user_id)}, algorithm=REFRESH_ALGORITHM, expired_delta=timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES))
		return {'ok': True, 'message': 'Authentication successful!', 'access_token': access_token, 'refresh_token': refresh_token}
	return ({'ok': False, 'message': 'Error: Incorrect credentials'})

@router.post('/logout')
async def logout_user(token: Annotated[str, Depends(oauth2_scheme)]):
	try:
		payload = jwt.decode(token, SECRET_KEY, algorithms=[ACCESS_ALGORITHM])
	except Exception as e:
		print(f"An unexpected error occurred: {e}")
		return {'ok': False, 'message': f"An unexpected error occurred: {e}", }
	return {'ok': True, 'message': f"User logged out!"}

@router.get('/refresh_token')
async def refresh_token(token: Annotated[str, Depends(oauth2_scheme)]):
	try:
		payload = jwt.decode(token, SECRET_KEY, algorithms=[REFRESH_ALGORITHM])
		user_id = payload.get('sub')
	except Exception as e:
		print(f"An unexpected error occurred: {e}")
		return {'ok': False, 'message': f"An unexpected error occurred: {e}", }
	new_token = create_token(data={"sub": str(user_id)}, algorithm=ACCESS_ALGORITHM, expired_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
	return {'ok': True, 'token': new_token}
	