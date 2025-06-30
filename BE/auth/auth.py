from fastapi import Depends, HTTPException, Header
from jwt import ExpiredSignatureError, InvalidTokenError
from auth.jwt import decode_jwt_token

def read_token_from_header(authorization: str = Header(...)) -> str:
  if not authorization.startswith("Bearer "):
    raise HTTPException(status_code=401, detail="Invalid auth header")

  return authorization.split(" ")[1]

def get_current_user_id(token: str = Depends(read_token_from_header)) -> int:
    try:
        payload = decode_jwt_token(token)
        return payload["user_id"]
    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")