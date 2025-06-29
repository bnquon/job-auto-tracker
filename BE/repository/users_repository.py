from sqlalchemy.orm import Session
from models.users import User
from schemas.users_schema import UserCreateStandard

def create_user_standard(db: Session, user: UserCreateStandard) -> int:
  try:
    db_user = User(**user.model_dump())
    print("🔔 THIS IS THE NEW DB_USER: ", db_user)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return getattr(db_user, 'id')
  except Exception as e:
    db.rollback()
    return False

# def create_user_oauth(db: Session, user: UserCreateOauth) -> User | None:
#   '''
#   - If user exists with same oauth_provider and oauth_sub, return token
#   - If user exists with same email but different provider, link accounts
#   - If user doesn't exist, create new user
#   '''
  
#   existing_user = db.query(User).filter(User.oauth_provider == user.oauth_provider, User.oauth_sub == user.oauth_sub).first()
#   if existing_user:
#     return existing_user

#   existing_user = db.query(User).filter(User.email == user.email).first()
#   if existing_user:
#     setattr(existing_user, 'oauth_provider', user.oauth_provider)
#     setattr(existing_user, 'oauth_sub', user.oauth_sub)
#     db.commit()
#     db.refresh(existing_user)
#     return existing_user
  
#   db_user = User(
#     email=user.email,
#     oauth_provider=user.oauth_provider,
#     oauth_sub=user.oauth_sub,
#     password=None,
#   )

#   db.add(db_user)
#   db.commit()
#   db.refresh(db_user)
#   return db_user

def login_user(db: Session, login_user: UserCreateStandard) -> User | None:
  db_user = db.query(User).filter(User.email == login_user.email).first()
  if not db_user:
    return None
  
  return db_user