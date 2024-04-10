from .login import create_token
from fastapi import Request, APIRouter, Depends
from ..models import oauth2_scheme, find_user
from fastapi.encoders import jsonable_encoder

from typing import Annotated

from ..globals import *
import jwt

router = APIRouter()

@router.post('/profile_save_one')
async def save_profile_info(request: Request, token: str = Depends(oauth2_scheme)):
	print('--------------------------------------------------------------')
	try:
		payload = jwt.decode(token, SECRET_KEY, algorithms=[ACCESS_ALGORITHM])
		user_id = payload.get('sub')
		if user_id is None:
			raise Exception('User not found')
		json_data = await request.json()
		values = (json_data.get('gender'), json_data.get('orientation'), json_data.get('pictures'))
		print(values)
		return {'ok': True, 'message': values}
	except Exception as e:
		print('**************************************')
		return {'ok': False, 'message': e}
	