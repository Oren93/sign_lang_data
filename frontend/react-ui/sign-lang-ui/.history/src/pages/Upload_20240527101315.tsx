// src/pages/Upload.tsx
import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import './src/Upload.css'; // Import the CSS file

const words = ['hello', 'world', 'sign', 'language', 'video', 'record']; // Example words

const Upload: React.FC = () => {
  const [word, setWord] = useState<string>('');
  const [recording, setRecording] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturedChunks, setCapturedChunks] = useState<Blob[]>([]);

  useEffect(() => {
    generateRandomWord();
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

  return (
    <main>
      <section>
        <h2>Record Your Sign Language</h2>
        <p>Current word: <strong>{word}</strong></p>
        <button onClick={generateRandomWord}>Next Word</button>
        <div>
          <Webcam audio={true} ref={webcamRef} />
        </div>
        <div>
          {recording ? (
            <button onClick={handleStopRecording}>Stop Recording</button>
          ) : (
            <button onClick={handleStartRecording}>Start Recording</button>
          )}
        </div>
        {videoUrl && (
          <div>
            <h3>Recorded Video:</h3>
            <video src={videoUrl} controls />
          </div>
        )}
      </section>
    </main>
  );
};

export default Upload;


