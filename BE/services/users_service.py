from fastapi import HTTPException
from auth.jwt import create_jwt_token
from models.users import User
from schemas.users_schema import UserCreateStandard, UserCreateOauth
from repository import users_repository
from services.job_cycle_service import create_default_job_cycle
from sqlalchemy.orm import Session
import bcrypt

def hash_password(plain_password: str) -> str:
  return bcrypt.hashpw(plain_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
  return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def create_user_standard(db: Session, user: UserCreateStandard) -> str:
  user.password = hash_password(user.password)
  created_user_id = users_repository.create_user_standard(db, user)
  
  if not created_user_id:
    raise HTTPException(status_code=400, detail="User creation failed")
  
  token = create_jwt_token(created_user_id)
  create_default_job_cycle(db, created_user_id)

  return token

def create_user_oauth(db: Session, user: UserCreateOauth) -> int:
  return users_repository.create_user_oauth(db, user)

def login_user_standard(db: Session, user: UserCreateStandard) -> str:
    db_user = users_repository.login_user(db, user)

    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    if not verify_password(user.password, getattr(db_user, "password")):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    token = create_jwt_token(getattr(db_user, "id"))
    return token