import React, { useState, useRef, useEffect } from "react";
import "../styles/Recorder.css";
import RecorderContent from "../components/RecorderContent";

const Recorder = () => {
  const [recording, setRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [currentWord, setCurrentWord] = useState("");
  const [wordsArray, setWordsArray] = useState([]);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const wordIndex = useRef(0);

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      const response = await fetch("http://localhost:8001/words");
      const data = await response.json();
      setWordsArray(data.words);
      setCurrentWord(data.words[0]);
      wordIndex.current = 0;
    } catch (error) {
      console.error("Error fetching words:", error);
    }
  };

  const startRecording = () => {
    setRecording(true);
  };

  const stopRecording = () => {
    setRecording(false);
    mediaRecorderRef.current.stop();
  };

  const renderWords = () => (
    <div>
      <h3>Word to Sign</h3>
      <ul>
        <li>{currentWord}</li>
      </ul>
    </div>
  );

  const handleStartRecording = () => {
    startRecording();
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        mediaRecorderRef.current = new MediaRecorder(stream);
        const chunks = [];

        mediaRecorderRef.current.ondataavailable = (e) => {
          chunks.push(e.data);
        };

        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(chunks, { type: "video/mp4" });
          setRecordedBlob(blob);
          videoRef.current.srcObject = null;
          videoRef.current.src = URL.createObjectURL(blob);
          videoRef.current.controls = true;
          videoRef.current.play();
        };

        mediaRecorderRef.current.start();
      })
      .catch((error) => console.error("getUserMedia error:", error));
  };

  const handleStopRecording = () => {
    stopRecording();
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
  };

  const handleSubmit = async () => {
    if (!recordedBlob) {
      return;
    }

    const formData = new FormData();
    formData.append("video", recordedBlob, "recorded_video.mp4");

    try {
      const response = await fetch("http://localhost:8001/submit", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("Video uploaded successfully!");
      } else {
        console.error("Failed to upload video:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading video:", error);
    }

    setRecordedBlob(null);
    videoRef.current.src = "";

    wordIndex.current = (wordIndex.current + 1) % wordsArray.length;
    setCurrentWord(wordsArray[wordIndex.current]);

    if (wordIndex.current === 0) {
      fetchWords();
    }
  };

  const handleSkip = () => {
    wordIndex.current = (wordIndex.current + 1) % wordsArray.length;
    setCurrentWord(wordsArray[wordIndex.current]);

    if (wordIndex.current === 0) {
      fetchWords();
    }
  };

  return (
    <RecorderContent
      handleStartRecording={handleStartRecording}
      recording={recording}
      handleStopRecording={handleStopRecording}
      renderWords={renderWords}
      videoRef={videoRef}
      handleSubmit={handleSubmit}
      handleSkip={handleSkip}
      recordedBlob={recordedBlob}
    />
  );
};

export default Recorder;
