import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Webcam from 'react-webcam';
import Modal from 'react-modal';

// Example words
const words = ['hello', 'world', 'sign', 'language', 'video', 'record'];

const Upload: React.FC = () => {
  const [word, setWord] = useState<string>('');
  const [recording, setRecording] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [showInstructions, setShowInstructions] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [showReview, setShowReview] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturedChunks, setCapturedChunks] = useState<Blob[]>([]);
  const recordingContainerRef = useRef<HTMLDivElement>(null);
  const history = useHistory();

  useEffect(() => {
    generateRandomWord();
  }, []);

  const generateRandomWord = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
  };

  const handleStartRecording = () => {
    setRecording(true);
    setShowControls(false);
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
    setShowControls(true);
  };

  const handleStart = () => {
    setShowModal(true);
  };

  const handleGrantAccess = () => {
    setShowModal(false);
    setShowInstructions(false);
    enterFullScreen();
  };

  const enterFullScreen = () => {
    if (recordingContainerRef.current) {
      const elem = recordingContainerRef.current;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
      }
    }
  };

  const handleSaveRecording = () => {
    // Logic to save the recording to the database
    // This is a placeholder and should be replaced with actual implementation
    alert('Recording saved!');

    // Allow the user to choose another word or leave
    setVideoUrl(null);
    setCapturedChunks([]);
    generateRandomWord();
    setShowControls(false);
  };

  const handleRepeatRecording = () => {
    setVideoUrl(null);
    setCapturedChunks([]);
    setRecording(false);
    setShowControls(false);
  };

  const handleNewWord = () => {
    generateRandomWord();
    setVideoUrl(null);
    setCapturedChunks([]);
    setRecording(false);
    setShowControls(false);
  };

  const handleLeaveRecording = () => {
    history.push('/thank-you');
  };

  useEffect(() => {
    if (capturedChunks.length > 0) {
      const blob = new Blob(capturedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
      setShowReview(true); // Show review after stopping recording
    }
  }, [capturedChunks]);

  return (
    <div ref={recordingContainerRef} className={showInstructions ? '' : 'fullscreen'}>
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '100px', paddingBottom: '50px' }}>
        {showInstructions ? (
          <section style={{ textAlign: 'center', width: '100%', maxWidth: '600px' }}>
            <h2>How to Record Your Sign Language</h2>
            <p>Please follow the instructions below to record your sign language videos:</p>
            <ul>
              <li>Ensure you are in a well-lit environment.</li>
              <li>Face the camera directly.</li>
              <li>Perform the sign language clearly.</li>
            </ul>
            <button style={{ margin: '20px', padding: '10px 20px', fontSize: '16px' }} onClick={handleStart}>Let's Start!</button>
          </section>
        ) : (
          <section>
            <h2>Record Your Sign Language</h2>
            <p>Current word: <strong>{word}</strong></p>
            <div className="webcam-wrapper">
              <Webcam audio={true} ref={webcamRef} />
            </div>
            {showReview ? (
              <div>
                <h3>Recorded Video:</h3>
                <video src={videoUrl} controls style={{ width: '100%', maxWidth: '600px' }} />
                <div className="button-group">
                  <button className="save-button" onClick={handleSaveRecording}>Save Recording</button>
                  <button className="repeat-button" onClick={handleRepeatRecording}>Repeat Recording</button>
                  <button className="new-word-button" onClick={handleNewWord}>Another Word</button>
                  <button className="leave-button" onClick={handleLeaveRecording}>Leave Recording</button>
                </div>
              </div>
            ) : (
              <div className="button-group">
                {recording ? (
                  <button className="stop-button" onClick={handleStopRecording}>Stop Recording</button>
                ) : (
                  <button className="start-button" onClick={handleStartRecording}>Start Recording</button>
                )}
                <button className="leave-button" onClick={handleLeaveRecording}>Leave Recording</button>
              </div>
            )}
          </section>
        )}

        <Modal
          isOpen={showModal}
          onRequestClose={() => setShowModal(false)}
          contentLabel="Camera Access"
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)'
            }
          }}
        >
          <h2>Camera Access Required</h2>
          <p>We need access to your camera to start recording. Please grant permission.</p>
          <button onClick={handleGrantAccess} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>Grant Access</button>
        </Modal>
      </main>
    </div>
  );
};

export default Upload;
