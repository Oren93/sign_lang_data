// Recorder.js
import React, { useState, useRef } from "react";
import "../styles/Recorder.css";
import RecorderContent from "../components/RecorderContent";

const Recorder = () => {
  const [recording, setRecording] = useState(false);
  const [words, setWords] = useState([]);
  const videoRef = useRef(null);

  const startRecording = () => {
    // Start recording logic here
    setRecording(true);
    const wordsArray = [
      "Word 1",
      "Word 2",
      "Word 3",
      "Word 4",
      "Word 5",
      "Word 6",
    ];
    let index = 0;
    setInterval(() => {
      setWords((prevWords) => {
        if (index < wordsArray.length) {
          return [wordsArray[index++]];
        } else {
          index = 0; // Reset index to loop through words again
          return [];
        }
      });
    }, 2000); // Change the delay as needed
  };

  const stopRecording = () => {
    // Stop recording logic here
    setRecording(false);
  };

  const renderWords = () => {
    return (
      <div>
        <h3>Words to Sign</h3>
        <ul>
          {words.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </div>
    );
  };

  const handleStartRecording = () => {
    startRecording();
    // Start video capture
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((error) => console.error("getUserMedia error:", error));
  };

  const handleStopRecording = () => {
    stopRecording();
    // Stop video capture
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
  };

  return (
    <RecorderContent
      handleStartRecording={handleStartRecording}
      recording={recording}
      handleStopRecording={handleStopRecording}
      renderWords={renderWords}
      videoRef={videoRef}
    />
  );
};

export default Recorder;
