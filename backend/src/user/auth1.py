from passlib.context import CryptContext
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from models import User  # Import your User model
from schemas import UserCreate  # Assuming you have a Pydantic schema for creating users
from database import get_db  # Assuming you have a function to get the database session

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_user(db: Session, user: UserCreate):
    db_user = User(email=user.email, hashed_password=get_password_hash(user.password))  # Hash the password before saving it to the database
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
import auth  # Assuming you have a file named "auth.py" that contains the create_access_token, authenticate_user functions

router = APIRouter()
@router.post("/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(data={"sub": user.email}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}
