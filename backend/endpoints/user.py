from fastapi import APIRouter, Depends, HTTPException, security
from sqlalchemy.orm import Session
from src.database.schemas import User, UserCreate
from src.database.database import get_db
from src.user import auth

router = APIRouter()

@router.post("/create")
async def create_user(
    user: UserCreate, db: Session = Depends(get_db)
):
    db_user = await auth.get_user_by_email(user.email, db)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already in use")
    user = await auth.create_user(user, db)
    return await auth.create_token(user)

@router.post("/login")
async def generate_token(
    form_data: security.OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(auth.get_db),
):
    try:
        user = await auth.authenticate_user(form_data.username, form_data.password, db)
        return await auth.create_token(user)
    except HTTPException as e:
        raise HTTPException(status_code=401, detail=e.detail)

@router.post("/token")
async def generate_token(
    form_data: security.OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    try:
        user = await auth.authenticate_user(form_data.username, form_data.password, db)
    except HTTPException as e:
        raise HTTPException(status_code=401, detail=e.detail)

    return await auth.create_token(user)

@router.get("/current", response_model = User)
async def get_user(user: User = Depends(auth.get_current_user)):
    print('foo')
    return user