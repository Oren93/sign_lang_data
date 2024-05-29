from fastapi import File, UploadFile
from fastapi import APIRouter
import cv2
import os

router = APIRouter()

# Define the directory to save the uploaded videos
UPLOAD_DIR = "uploaded_videos"

# Check if the directory exists, create it if not
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

@router.post("/submit")
async def upload_video(video: UploadFile = File(...)):
    # Save the uploaded video with its original filename
    file_path = os.path.join(os.getcwd(), UPLOAD_DIR, video.filename)
    print(file_path)
    with open(file_path, "wb") as buffer:
        buffer.write(video.file.read())

    # Read the video using OpenCV
    cap = cv2.VideoCapture(file_path)

    # Get the video properties
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = int(cap.get(cv2.CAP_PROP_FPS))
    print(width,height,fps)

    # Define the codec and create VideoWriter object
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    output_path = os.path.splitext(file_path)[0] + "_transcoded.mp4"
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

    # Remove the original video file
    os.remove(file_path)

    return {"filename": video.filename, "saved_path": output_path}
