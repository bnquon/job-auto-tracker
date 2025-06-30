from fastapi import APIRouter, Depends, status, Response
from sqlalchemy.orm import Session
from schemas.users_schema import UserCreateStandard
from services.users_service import create_user_standard, login_user_standard
from services.job_cycle_service import create_default_job_cycle
from db.database import get_db

router = APIRouter(
  prefix="/users",
  tags=["users"],
)

def set_auth_cookie(response: Response, token: str):
  """Helper function to set authentication cookie with all required attributes"""
  response.set_cookie(
    key="token",
    value=token,
    samesite="none",    # Allow cross-site cookies
    secure=False,       # Allow over HTTP (for development)
    httponly=True,      # Prevent JavaScript access (security)
    max_age=3600
  )

@router.post("/standard", status_code=status.HTTP_201_CREATED)
def create_user_standard_route(user: UserCreateStandard, response: Response, db: Session = Depends(get_db)):
  token = create_user_standard(db, user)
  set_auth_cookie(response, token)
  return {"message": "User created successfully"}

# @router.post("/oauth")
# def create_user_oauth_route(user: UserCreateOauth, response: Response, db: Session = Depends(get_db)):
#     # This will either create a new user or return existing user's token
#     token = create_user_oauth(db, user)
#     set_auth_cookie(response, token)
#     return {"message": "OAuth login successful"}

@router.post("/login", status_code=status.HTTP_200_OK)
def login_user_standard_route(user: UserCreateStandard, response: Response, db: Session = Depends(get_db)):
  token = login_user_standard(db, user)
  set_auth_cookie(response, token)
  return {"message": "Login successful"}

@router.post("/logout", status_code=status.HTTP_200_OK)
def logout_user_route(response: Response):
  response.delete_cookie(
    key="token",
    httponly=False,  # Set this to True in production
    samesite="none",
    secure=True,
  )
  return {"message": "Logout successful"}