// src/pages/Record.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import styles from './Record.module.css'; // Import the CSS module

const words = ['hello', 'world', 'sign', 'language', 'video', 'record']; // Example words

const Record: React.FC = () => {
  const [word, setWord] = useState<string>('');
  const [recording, setRecording] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [permissionsGranted, setPermissionsGranted] = useState<boolean>(false);
  const [cameraEnabled, setCameraEnabled] = useState<boolean>(false);
  const [permissionDenied, setPermissionDenied] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturedChunks, setCapturedChunks] = useState<Blob[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    generateRandomWord();
    document.documentElement.requestFullscreen();

    requestCameraPermission();
  }, [navigate]);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setPermissionsGranted(true);
      setPermissionDenied(false);
      stream.getTracks().forEach(track => track.stop()); // Stop all tracks to release the camera
    } catch (error) {
      setPermissionDenied(true);
      alert('Camera permissions are required to proceed.');
    }
  };

  const generateRandomWord = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
  };

  const handleActivateCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraEnabled(true);
      setPermissionDenied(false);
    } catch (error) {
      setPermissionDenied(true);
      alert('Camera permissions are required to proceed.');
    }
  };

  const handleStartRecording = () => {
    setRecording(true);
    setCapturedChunks([]);
    if (webcamRef.current?.stream) {
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: 'video/webm',
      });
      mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
      mediaRecorderRef.current.start();
    }
  };

  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data.size > 0) {
      setCapturedChunks((prev) => [...prev, event.data]);
    }
  };

  const handleStopRecording = () => {
    setRecording(false);
    mediaRecorderRef.current?.stop();
    if (capturedChunks.length) {
      const blob = new Blob(capturedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
      setCameraEnabled(false); // Hide the webcam feed
    }
  };

  const handleLeaveRecording = () => {
    document.exitFullscreen();
    navigate('/');
  };

  return (
    <div className={styles.fullscreenContainer}>
      <div className={styles.overlay}>
        {permissionDenied && !permissionsGranted && (
          <div className={styles.confirmation}>
            <p className={styles.permissionMessage}>Camera permissions are required to proceed.</p>
            <button className={styles.startButton} onClick={requestCameraPermission}>Grant Camera Permission</button>
          </div>
        )}
        {permissionsGranted && !cameraEnabled && (
          <div className={styles.confirmation}>
            <p className={styles.permissionMessage}>Camera permissions granted. Click "Activate Camera" to start the camera.</p>
            <button className={styles.startButton} onClick={handleActivateCamera}>Activate Camera</button>
          </div>
        )}
        {cameraEnabled && (
          <>
            <h2 className={styles.word}>{word}</h2>
            <Webcam className={styles.webcam} audio={false} ref={webcamRef} />
            <div className={styles.buttonContainer}>
              {recording ? (
                <button className={styles.stopButton} onClick={handleStopRecording}>Stop Recording</button>
              ) : (
                <button className={styles.startButton} onClick={handleStartRecording}>Start Recording</button>
              )}
              <button className={styles.leaveButton} onClick={handleLeaveRecording}>Leave Recording</button>
            </div>
          </>
        )}
        {videoUrl && (
          <div className={styles.videoContainer}>
            <h3>Recorded Video:</h3>
            <video className={styles.video} src={videoUrl} controls />
          </div>
        )}
      </div>
    </div>
  );
};

export default Record;






