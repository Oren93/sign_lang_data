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
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturedChunks, setCapturedChunks] = useState<Blob[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    generateRandomWord();
    document.documentElement.requestFullscreen();
  }, []);

  const generateRandomWord = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
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
    }
  };

  const handleLeaveRecording = () => {
    document.exitFullscreen();
    navigate('/');
  };

  return (
    <div className={styles.fullscreenContainer}>
      <div className={styles.overlay}>
        <h2 className={styles.word}>{word}</h2>
        <Webcam className={styles.webcam} audio={false} ref={webcamRef} />
        <div className={styles.buttonContainer}>
          {recording ? (
            <button className={styles.startButton} onClick={handleStopRecording}>Stop Recording</button>
          ) : (
            <button className={styles.startButton} onClick={handleStartRecording}>Start Recording</button>
          )}
          <button className={styles.leaveButton} onClick={handleLeaveRecording}>Leave Recording</button>
        </div>
        {videoUrl && (
          <div>
            <h3>Recorded Video:</h3>
            <video className={styles.video} src={videoUrl} controls />
          </div>
        )}
      </div>
    </div>
  );
};

export default Record;
