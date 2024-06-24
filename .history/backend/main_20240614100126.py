from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from endpoints import videos, vocabulary

app = FastAPI()

origins = [
    "http://localhost:3001",  # Your frontend URL
    "http://sign_ui:3000"    # Docker service name
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

