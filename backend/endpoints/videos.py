from fastapi import File, UploadFile, APIRouter, Depends, HTTPException, Form
import cv2
import os
from sqlalchemy.orm import Session
from src.database.database import get_db
from src.database.models import User, Video, GlossVideo, Gloss
from src.user.auth import get_current_user

router = APIRouter()

UPLOAD_DIR = "uploaded_videos"
FILE_NAME_LENGTH = 6

if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

@router.post("/submit")
async def upload_video(
    video: UploadFile = File(...),
    gloss_id: int = Form(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    gloss = db.query(Gloss).filter(Gloss.id == gloss_id).first()
    if not gloss:
        raise HTTPException(status_code=404, detail="Gloss not found")

    # Create a new Video entry in the database
    db_video = Video(signer=current_user.id)
    db.add(db_video)
    db.commit()
    db.refresh(db_video)

    # Create a new GlossVideo entry to link the video with the gloss
    db_gloss_video = GlossVideo(gloss_id=gloss_id, video_id=db_video.id)
    db.add(db_gloss_video)
    db.commit()

    # Use the database ID as the unique identifier
    unique_id = str(db_video.id)
    unique_id = '0' * (FILE_NAME_LENGTH - len(unique_id)) + unique_id
    file_extension = os.path.splitext(video.filename)[1]
    file_name = f"{unique_id}{file_extension}"
    temp_file_path = os.path.join(os.getcwd(), UPLOAD_DIR, f"temp_{file_name}")

    # Save the uploaded file temporarily
    with open(temp_file_path, "wb") as buffer:
        buffer.write(await video.read())

    # Read the video using OpenCV
    cap = cv2.VideoCapture(temp_file_path)

    # Get the video properties
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = int(cap.get(cv2.CAP_PROP_FPS))

    # Define the codec and create VideoWriter object
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    output_path = os.path.join(os.getcwd(), UPLOAD_DIR, f"{unique_id}.mp4")
    out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

    # Read frames from the input video and write them to the output video
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        out.write(frame)

    # Release resources
    cap.release()
    out.release()

    # Remove the temporary original video file
    os.remove(temp_file_path)

    # Update the Video entry with the file path
    db_video.url = output_path
    db_video.fps = fps
    db.commit()

    return {
        "id": db_video.id,
        "filename": f"{unique_id}.mp4",
        "saved_path": output_path,
        "gloss_id": gloss_id
    }