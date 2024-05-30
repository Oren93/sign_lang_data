from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from endpoints import videos, vocabulary

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

app.include_router(vocabulary.router)
app.include_router(videos.router)

