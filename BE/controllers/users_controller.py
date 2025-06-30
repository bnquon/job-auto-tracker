from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from schemas.users_schema import UserCreateStandard
from services.users_service import create_user_standard, login_user_standard
from services.job_cycle_service import create_default_job_cycle
from db.database import get_db

router = APIRouter(
  prefix="/users",
  tags=["users"],
)

@router.post("/standard", status_code=status.HTTP_201_CREATED)
def create_user_standard_route(user: UserCreateStandard, db: Session = Depends(get_db)):
  token = create_user_standard(db, user)
  return {
    "message": "Signup successful",
    "access_token": token,
    "token_type": "bearer"
    }

# @router.post("/oauth")
# def create_user_oauth_route(user: UserCreateOauth, response: Response, db: Session = Depends(get_db)):
#     # This will either create a new user or return existing user's token
#     token = create_user_oauth(db, user)
#     set_auth_cookie(response, token)
#     return {"message": "OAuth login successful"}

@router.post("/login", status_code=status.HTTP_200_OK)
def login_user_standard_route(user: UserCreateStandard, db: Session = Depends(get_db)):
  token = login_user_standard(db, user)
  return {
    "message": "Login successful",
    "access_token": token,
    "token_type": "bearer"
    }

@router.post("/logout", status_code=status.HTTP_200_OK)
def logout_user_route():
  return {"message": "Logged out"}