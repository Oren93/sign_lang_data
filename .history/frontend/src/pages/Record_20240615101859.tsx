import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import styles from './Record.module.css'; // Import the CSS module
import { useTranslation } from 'react-i18next';

const Record: React.FC = () => {
  const { t } = useTranslation();
  const [word, setWord] = useState<string>('');
  const [recording, setRecording] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [permissionsGranted, setPermissionsGranted] = useState<boolean>(false);
  const [cameraEnabled, setCameraEnabled] = useState<boolean>(false);
  const [permissionDenied, setPermissionDenied] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturedChunks, setCapturedChunks] = useState<Blob[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWords();
    document.documentElement.requestFullscreen();
    requestCameraPermission();
  }, [navigate]);

  const fetchWords = async () => {
    try {
      const response = await fetch('http://localhost:8001/api/words');
      const data = await response.json();
      if (data.words && data.words.length > 0) {
        setWord(data.words[Math.floor(Math.random() * data.words.length)]);
      }
    } catch (error) {
      console.error('Error fetching words:', error);
    }
  };

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setPermissionsGranted(true);
      setPermissionDenied(false);
      stream.getTracks().forEach(track => track.stop()); // Stop all tracks to release the camera
    } catch (error) {
      setPermissionsGranted(false);
      setPermissionDenied(true);
      console.error('Camera permissions check failed:', error);
      alert('Camera permissions are required to proceed.');
    }
  };

  const handleActivateCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraEnabled(true);
      setPermissionDenied(false);
      stream.getTracks().forEach(track => track.stop()); // Stop all tracks to release the camera
    } catch (error) {
      setPermissionDenied(true);
      console.error('Error activating camera:', error);
      alert('Camera permissions are required to proceed.');
    }
  };

  const handleStartRecording = () => {
    setCountdown(3);
    setIsRecording(true);
  };

  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      startRecording();
      setCountdown(null);
    }
  }, [countdown]);

  const startRecording = () => {
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
    setIsRecording(false);
    mediaRecorderRef.current?.stop();
    if (webcamRef.current?.stream) {
      webcamRef.current.stream.getTracks().forEach(track => track.stop()); // Stop the camera feed
    }
  };

  const handleLeaveRecording = () => {
    if (webcamRef.current?.stream) {
      webcamRef.current.stream.getTracks().forEach(track => track.stop()); // Stop the camera feed
    }
    document.exitFullscreen();
    navigate('/thank-you'); // Navigate to the Thank You page
  };

  useEffect(() => {
    if (!recording && capturedChunks.length > 0) {
      const blob = new Blob(capturedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
      setCameraEnabled(false); // Hide the webcam feed
    }
  }, [recording, capturedChunks]);

  const generateRandomWord = () => {
    fetchWords();
  };

  const handleNextWord = async () => {
    if (capturedChunks.length > 0) {
      const blob = new Blob(capturedChunks, { type: 'video/webm' });
      await uploadVideo(blob);
    }
    setVideoUrl(null);
    generateRandomWord();
    setCameraEnabled(true);
  };

  const handleRepeatWord = () => {
    setVideoUrl(null);
    setCameraEnabled(true);
  };

  const uploadVideo = async (videoBlob: Blob) => {
    const formData = new FormData();
    formData.append('video', videoBlob);

    try {
      const response = await fetch('http://localhost:8001/api/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log('Upload successful', data);
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  return (
    <div className={styles.fullscreenContainer}>
      <div className={styles.overlay}>
        {permissionDenied && !permissionsGranted && (
          <div className={styles.confirmation}>
            <p className={styles.permissionMessage}>{t('permission_required')}</p>
            <button className={styles.startButton} onClick={requestCameraPermission}>{t('grant_permission')}</button>
          </div>
        )}
        {permissionsGranted && !cameraEnabled && !videoUrl && (
          <div className={styles.confirmation}>
            <p className={styles.permissionMessage}>{t('permission_granted')}</p>
            <button className={styles.startButton} onClick={handleActivateCamera}>{t('activate_camera')}</button>
          </div>
        )}
        {cameraEnabled && !videoUrl && (
          <>
            <h2 className={styles.word}>{word}</h2>
            {countdown !== null ? (
              <div className={styles.countdown}>{countdown}</div>
            ) : (
              <>
                {isRecording && <div className={styles.recordingMessage}>Recording</div>}
                <Webcam className={styles.webcam} audio={false} ref={webcamRef} />
                <div className={styles.buttonContainer}>
                  {recording ? (
                    <button className={styles.stopButton} onClick={handleStopRecording}>{t('stop_recording')}</button>
                  ) : (
                    <button className={styles.startButton} onClick={handleStartRecording}>{t('start_recording')}</button>
                  )}
                  <button className={styles.leaveButton} onClick={handleLeaveRecording}>{t('leave_recording')}</button>
                </div>
              </>
            )}
          </>
        )}
        {videoUrl && (
          <div className={styles.videoContainer}>
            <h3>Recorded Video:</h3>
            <video className={styles.video} src={videoUrl} controls autoPlay />
            <div className={styles.buttonContainer}>
              <button className={styles.nextButton} onClick={handleNextWord}>{t('next_word')}</button>
              <button className={styles.repeatButton} onClick={handleRepeatWord}>{t('repeat_word')}</button>
              <button className={styles.leaveButton} onClick={handleLeaveRecording}>{t('leave_recording')}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Record;
