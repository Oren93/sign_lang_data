from fastapi import Depends, HTTPException, security
import jwt
from sqlalchemy import orm, exc  # Import exc for catching IntegrityError
from passlib.hash import bcrypt

from src.database import database
from src.database import models 
from src.database import schemas

oauth2schema = security.OAuth2PasswordBearer(tokenUrl="/user/token")

JWT_SECRET = "myjwtsecret"

def createdatabase():
    return database.Base.metadata.create_all(bind=database.engine)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def get_user_by_email(email: str, db: orm.Session):
    return db.query(models.User).filter(models.User.email == email).first()

async def create_user(user: schemas.UserCreate, db: orm.Session):
    user_obj = models.User(
        email=user.email, 
        username=user.username,
        password_hash=bcrypt.hash(user.password_salted)
    )
    db.add(user_obj)
    try:
        db.commit()
        db.refresh(user_obj)
    except exc.IntegrityError as e:
        db.rollback()
        if 'unique constraint' in str(e.orig):
            raise HTTPException(status_code=400, detail="Username already in use")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    return user_obj

async def authenticate_user(email: str, password: str, db: orm.Session):
    user = await get_user_by_email(db=db, email=email)

    if not user:
        raise HTTPException(status_code=401, detail="Email does not exist")

    if not bcrypt.verify(password, user.password_hash):
        raise HTTPException(status_code=401, detail="Incorrect password")

    return user

async def create_token(user: models.User):
    user_obj = schemas.User.from_orm(user)

    token = jwt.encode(user_obj.dict(), JWT_SECRET)

    return dict(access_token=token, token_type="bearer")

async def get_current_user(
    db: orm.Session = Depends(get_db),
    token: str = Depends(oauth2schema),
):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        user = db.query(models.User).get(payload["id"])
    except:
        raise HTTPException(
            status_code=401, detail="Invalid Email or Password"
        )

    return schemas.User.from_orm(user)
