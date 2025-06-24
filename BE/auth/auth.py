from fastapi import Depends, HTTPException, Request
from jwt import ExpiredSignatureError, InvalidTokenError
from auth.jwt import decode_jwt_token

def read_token_from_cookie(request: Request) -> str:
    token = request.cookies.get("token")
    if not token:
        raise HTTPException(status_code=401, detail="Authentication token not found")
    return token

def get_current_user_id(token: str = Depends(read_token_from_cookie)) -> int:
    try:
        payload = decode_jwt_token(token)
        return payload["user_id"]
    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")