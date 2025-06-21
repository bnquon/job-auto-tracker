import os
from dotenv import load_dotenv
import jwt
from datetime import datetime, timedelta

load_dotenv()

public_key = os.getenv("JWT_PUBLIC_KEY")
private_key = os.getenv("JWT_PRIVATE_KEY")

def create_jwt_token(user_id: int) -> str:
  if not private_key:
    raise Exception("No private key found")
  
  payload = {
    "user_id": user_id,
    "exp": datetime.now() + timedelta(days=1),
    "iat": datetime.now()
  }
  
  return jwt.encode(payload, private_key, algorithm="RS256")

def decode_jwt_token(token: str) -> dict:
  if not public_key:
    raise Exception("No public key found")

  return jwt.decode(token, public_key, algorithms=["RS256"])