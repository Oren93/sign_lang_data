import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../styles/Recorder.css";
import RecorderContent from "../components/RecorderContent";

const Recorder = () => {
  const [recording, setRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [currentWord, setCurrentWord] = useState("");
  const [wordsArray, setWordsArray] = useState([]);
  const [protectedMessage, setProtectedMessage] = useState("");
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const wordIndex = useRef(0);

  const { t } = useTranslation("record_page");

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      const response = await fetch("http://localhost:8001/words", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("signLangRecToken")}`,
        },
      });
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
      <h3>{t("gloss_to_sign")}</h3>
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

    const token = localStorage.getItem("signLangRecToken");
    if (!token) {
      console.error("No token found");
      setProtectedMessage(
        "No authentication token found. Please log in again."
      );
      return;
    }

    const formData = new FormData();
    formData.append("video", recordedBlob, "recorded_video.mp4");

    try {
      const response = await fetch("http://localhost:8001/submit", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setProtectedMessage(
          `Video submitted successfully. ID: ${data.id}, Filename: ${data.filename}`
        );
      } else {
        const errorData = await response.json();
        setProtectedMessage(
          `Failed to submit video. Status: ${response.status}. Error: ${errorData.detail}`
        );
      }
    } catch (error) {
      console.error("Error submitting video:", error);
      setProtectedMessage(`Error submitting video: ${error.message}`);
    }
  };

  const handleSkip = () => {
    if (wordIndex.current < wordsArray.length - 1) {
      wordIndex.current += 1;
      setCurrentWord(wordsArray[wordIndex.current]);
    } else {
      // Handle reaching the end of the words array
      console.log("No more words to display");
    }
  };

  const testProtectedRoute = async () => {
    console.log(localStorage.getItem("signLangRecToken"));
    try {
      const response = await fetch("http://localhost:8001/protected", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("signLangRecToken")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProtectedMessage(
          `Protected route access successful. Message: ${data.message}`
        );
      } else {
        setProtectedMessage(
          `Failed to access protected route. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error accessing protected route:", error);
      setProtectedMessage(`Error accessing protected route: ${error.message}`);
    }
  };

  return (
    <div>
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
      <div>
        <button onClick={testProtectedRoute}>Test Protected Route</button>
        {protectedMessage && <p>{protectedMessage}</p>}
      </div>
    </div>
  );
};

export default Recorder;
