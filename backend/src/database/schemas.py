from pydantic import BaseModel

class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    username: str
    password_salted: str

    class Config:
        from_attributes = True

class User(UserBase):
    id: int
    username: str

    class Config:
        from_attributes = True
