from fastapi import Depends, Header, HTTPException
from auth.jwt import decode_jwt_token

def read_token_from_header(authorization: str = Header(...)) -> str:
  if not authorization.startswith("Bearer "):
    raise HTTPException(status_code=401, detail="Invalid auth header")
  return authorization.split(" ")[1]

def get_current_user_id(token: str = Depends(read_token_from_header)) -> int:
  try:
    payload = decode_jwt_token(token)
    return payload["user_id"]
  except Exception:
    raise HTTPException(status_code=401, detail="Invalid or expired token")