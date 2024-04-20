from .login import create_token
from fastapi import Request, APIRouter, Depends
from ..models import oauth2_scheme, find_user, update_profile_first
from fastapi.encoders import jsonable_encoder

from typing import Annotated

from ..globals import *
import jwt

router = APIRouter()

def correct_gender(gender): # In case someone makes a manual request and 500's the server
	authorized_gender = ['Male', 'Female', 'Non-binary']
	for gen in authorized_gender:
		if gender == gen:
			return True
	return False

def orientation_validator(orientation):
	return orientation.isalpha()

def validator(data):
	if not correct_gender(data.get('gender')):
		raise Exception('Incorrect gender')
	if not data.get('orientation') and not data.get('orientation_other'):
		raise Exception('Empty orientation')
	true_orientation = data.get('orientation') if data.get('orientation') else data.get('orientation_other')
	return true_orientation

@router.post('/profile_save_one')
async def save_profile_info(request: Request, token: str = Depends(oauth2_scheme)):
	try:
		payload = jwt.decode(token, SECRET_KEY, algorithms=[ACCESS_ALGORITHM])
		user_id = payload.get('sub')
		if user_id is None:
			raise Exception('User not found')
		json_data = await request.json()
		try:
			true_orientation = validator(json_data)
		except Exception as e:
			raise Exception(e)
		values = {
			'gender' : json_data.get('gender'),
			'orientation' : true_orientation
		}
		return {'ok': True, 'message': values}
	except Exception as e:
		return {'ok': False, 'message': e}
	