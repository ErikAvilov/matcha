from ..validators.register_valid import validator
from ..models import create_user
from fastapi import Request, APIRouter

router = APIRouter()

@router.post("/register")
async def register_user(request: Request):
	json_data = await request.json()
	try:
		validator(json_data)
	except Exception as e:
		return ({'ok': False, 'message': f'Error during validation: {e}'})
	try:
		name = await create_user(json_data)
	except Exception as e:
		return ({'ok': False, 'message': f'Error: {e.detail}\nYou might need to refresh the page.'})
	return ({'ok': True, 'message': f'account for {name} created!'})