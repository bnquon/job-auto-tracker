import os
from dotenv import load_dotenv
import jwt
from datetime import datetime, timedelta

load_dotenv()

def format_key(key: str) -> str:
  if not key:
    return ""
  # Replace literal \n with actual newlines
  formatted_key = key.replace("\\n", "\n")
  
  # Ensure the key starts and ends with proper newlines if they're missing
  if not formatted_key.endswith('\n'):
    formatted_key += '\n'
  
  return formatted_key

# Apply the formatting here
public_key = format_key(os.getenv("JWT_PUBLIC_KEY", ""))
private_key = format_key(os.getenv("JWT_PRIVATE_KEY", ""))

def create_jwt_token(user_id: int) -> str:
  if not private_key:
    raise Exception("No private key found")
  
  now = datetime.now()
  
  payload = {
    "user_id": user_id,
    "exp": now + timedelta(days=1),
    "iat": now
  }
  
  try:
    return jwt.encode(payload, private_key, algorithm="RS256")
  except Exception as e:
    raise

def decode_jwt_token(token: str) -> dict:
  if not public_key:
    raise Exception("No public key found")
  
  try:
    return jwt.decode(token, public_key, algorithms=["RS256"])
  except Exception as e:
    raise