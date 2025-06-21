from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from schemas.users_schema import UserCreateStandard, UserCreateOauth
from services.users_service import create_user_standard, create_user_oauth, login_user_standard
from db.database import get_db

router = APIRouter(
  prefix="/users",
  tags=["users"],
)

@router.post("/standard", status_code=status.HTTP_201_CREATED)
def create_user_standard_route(user: UserCreateStandard, db: Session = Depends(get_db)):
  token = create_user_standard(db, user)
  return {"access_token": token, "token_type": "bearer"}

@router.post("/oauth")
def create_user_oauth_route(user: UserCreateOauth, db: Session = Depends(get_db)):
  return create_user_oauth(db, user)

@router.post("/login", status_code=status.HTTP_200_OK)
def login_user_standard_route(user: UserCreateStandard, db: Session = Depends(get_db)):
  token = login_user_standard(db, user)
  return {"access_token": token, "token_type": "bearer"}