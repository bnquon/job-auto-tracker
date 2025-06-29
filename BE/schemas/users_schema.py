from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
  email: EmailStr

class UserCreateStandard(UserBase):
  password: str
  
  class Config:
    from_attributes = True
  
# class UserCreateOauth(UserBase):
#   oauth_provider: str
#   oauth_sub: str
  
# class UserResponse(UserBase):
#   id: int

#   class Config:
#       from_attributes = True