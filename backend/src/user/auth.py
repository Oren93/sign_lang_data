from fastapi import Depends, HTTPException, security
import jwt
from sqlalchemy import orm, exc
from passlib.hash import bcrypt

from src.database import database
from src.database import models 
from src.database import schemas
from src.utils.logging import get_logger

logger = get_logger()

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
            logger.warning(f"Attempt to create user with existing username: {user.username}")
            raise HTTPException(status_code=400, detail="Username already in use")
        logger.error(f"Error creating user: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    logger.info(f"New user created: {user.email}")
    return user_obj

async def authenticate_user(email: str, password: str, db: orm.Session):
    user = await get_user_by_email(db=db, email=email)

    if not user:
        logger.warning(f"Authentication attempt with non-existent email: {email}")
        raise HTTPException(status_code=401, detail="Email does not exist")

    if not bcrypt.verify(password, user.password_hash):
        logger.warning(f"Failed authentication attempt for user: {email}")
        raise HTTPException(status_code=401, detail="Incorrect password")

    logger.info(f"User authenticated successfully: {email}")
    return user

async def create_token(user: models.User):
    user_obj = schemas.User.from_orm(user)
    token = jwt.encode(user_obj.dict(), JWT_SECRET)
    logger.info(f"Token created for user: {user.email}")
    return {"access_token": token, "token_type": "bearer"}

async def get_current_user(
    db: orm.Session = Depends(get_db),
    token: str = Depends(oauth2schema),
):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        user = db.query(models.User).get(payload["id"])
    except jwt.ExpiredSignatureError:
        logger.warning("Attempt to use expired token")
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        logger.warning("Attempt to use invalid token")
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception as e:
        logger.error(f"Error decoding token: {str(e)}")
        raise HTTPException(status_code=401, detail="Could not validate credentials")

    if user is None:
        logger.warning(f"Token used for non-existent user. Payload: {payload}")
        raise HTTPException(status_code=401, detail="User not found")

    logger.info(f"User authenticated via token: {user.email}")
    return user
