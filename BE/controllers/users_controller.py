from fastapi import APIRouter, Depends, status, Response
from sqlalchemy.orm import Session
from schemas.users_schema import UserCreateStandard, UserCreateOauth
from services.users_service import create_user_standard, create_user_oauth, login_user_standard
from services.job_cycle_service import create_default_job_cycle
from db.database import get_db

router = APIRouter(
  prefix="/users",
  tags=["users"],
)

@router.post("/standard", status_code=status.HTTP_201_CREATED)
def create_user_standard_route(user: UserCreateStandard, response: Response, db: Session = Depends(get_db)):
  token = create_user_standard(db, user)

  response.set_cookie(
    key="token",
    value=token,
    httponly=False, # Set this to True in production
    max_age=60 * 60 * 24, # 1 day
    samesite="none",
    secure=True
  )
  return {"message": "User created successfully"}

@router.post("/oauth")
def create_user_oauth_route(user: UserCreateOauth, db: Session = Depends(get_db)):
  return create_user_oauth(db, user)

@router.post("/login", status_code=status.HTTP_200_OK)
def login_user_standard_route(user: UserCreateStandard, response: Response, db: Session = Depends(get_db)):
  token = login_user_standard(db, user)

  response.set_cookie(
    key="token",
    value=token,
    httponly=False, # Set this to True in production
    max_age=60 * 60 * 24, # 1 day
    samesite="none",
    secure=True
  )
  return {"message": "Login successful"}

@router.post("/logout", status_code=status.HTTP_200_OK)
def logout_user_route(response: Response):
  response.delete_cookie(
    key="token",
    httponly=False, # Set this to True in production
    samesite="none",
    secure=True
  )
  return {"message": "Logout successful"}