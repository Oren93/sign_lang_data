import React, { useState, useEffect } from 'react';

const Recorder = () => {
  const [recording, setRecording] = useState(false);
  const [words, setWords] = useState(["Hello", "World", "React", "Component"]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const startRecording = () => {
    setRecording(true);
    setCurrentWordIndex(0);
    // Start recording logic goes here
  };

  const stopRecording = () => {
    setRecording(false);
    // Stop recording logic goes here
  };

  useEffect(() => {
    if (recording && currentWordIndex < words.length) {
      const timer = setTimeout(() => {
        setCurrentWordIndex(currentWordIndex + 1);
      }, 2000); // 2 seconds per word
      return () => clearTimeout(timer);
    } else if (currentWordIndex >= words.length) {
      stopRecording();
    }
  }, [recording, currentWordIndex]);

  return (
    <div>
      <button onClick={startRecording} disabled={recording}>Start Recording</button>
      {recording && <p>Sign the word: {words[currentWordIndex]}</p>}
    </div>
  );
};

export default Recorder;
