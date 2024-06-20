from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from endpoints import videos, vocabulary, user
#from src.database.database import engine
#from src.database.models import Base

#Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "sign_ui",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

app.include_router(user.router, prefix="/user")
app.include_router(vocabulary.router)
app.include_router(videos.router)

