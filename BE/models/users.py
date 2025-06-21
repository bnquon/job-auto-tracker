from sqlalchemy import Column, Integer, String
from db.database import Base

class User(Base):
  __tablename__ = "users"
  id = Column(Integer, primary_key=True, autoincrement=True)
  email = Column(String, unique=True, nullable=False)
  password = Column(String, nullable=True) # Oauth users will be null
  username = Column(String, nullable=True)
  oauth_provider = Column(String, nullable=True)
  oauth_sub = Column(String, nullable=True)