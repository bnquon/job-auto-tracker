from fastapi import APIRouter, Depends
from auth.auth import get_current_user_id

router = APIRouter(prefix="/auth", tags=["auth"])

@router.get("/me")
def auth_me(user_id: int = Depends(get_current_user_id)):
  return {"user_id": user_id}
