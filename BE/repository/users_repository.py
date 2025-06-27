from sqlalchemy.orm import Session
from models.users import User
from schemas.users_schema import UserCreateStandard, UserCreateOauth

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

def create_user_oauth(db: Session, user: UserCreateOauth) -> int:
  db_user = User(**user.model_dump())
  db.add(db_user)
  db.commit()
  db.refresh(db_user)
  return getattr(db_user, 'id')

def login_user(db: Session, login_user: UserCreateStandard) -> User | None:
  db_user = db.query(User).filter(User.email == login_user.email).first()
  if not db_user:
    return None
  
  return db_user