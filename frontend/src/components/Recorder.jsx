import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../styles/Recorder.css";
import RecorderContent from "../components/RecorderContent";

const Recorder = () => {
  const [recording, setRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [currentWord, setCurrentWord] = useState("");
  const [currentWordId, setCurrentWordId] = useState("");
  const [wordsObject, setWordsObject] = useState({});
  const [protectedMessage, setProtectedMessage] = useState("");
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const wordIds = useRef([]);
  const wordIndex = useRef(0);

  const { t } = useTranslation("record_page");

  useEffect(() => {
    fetchWords();
  }, []);

  useEffect(() => {
    if (Object.keys(wordsObject).length > 0) {
      initializeWord();
    }
  }, [wordsObject]);

  const fetchWords = async () => {
    try {
      const response = await fetch("http://localhost:8001/words", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("signLangRecToken")}`,
        },
      });
      const data = await response.json();
      setWordsObject(data.words);
      wordIds.current = Object.keys(data.words);
    } catch (error) {
      console.error("Error fetching words:", error);
    }
  };

  const initializeWord = () => {
    if (wordIds.current.length > 0) {
      const firstId = wordIds.current[0];
      setCurrentWordId(firstId);
      setCurrentWord(wordsObject[firstId]);
      wordIndex.current = 1; // Set to 1 as we've loaded the first word
    } else {
      console.log("No words available");
      setCurrentWord("No words available");
      setCurrentWordId("");
    }
  };

  const loadNextWord = () => {
    if (wordIndex.current < wordIds.current.length) {
      const nextId = wordIds.current[wordIndex.current];
      setCurrentWordId(nextId);
      setCurrentWord(wordsObject[nextId]);
      wordIndex.current += 1;
    } else {
      console.log("No more words to display");
      setCurrentWord("");
      setCurrentWordId("");
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
    if (!recordedBlob || !currentWordId) {
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
    formData.append("gloss_id", currentWordId);

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
          `Video submitted successfully. ID: ${data.id}, Filename: ${data.filename}, Gloss ID: ${data.gloss_id}`
        );
        // Clear the recorded video
        setRecordedBlob(null);
        videoRef.current.src = "";
        videoRef.current.controls = false;
        // Load the next word
        loadNextWord();
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
    loadNextWord();
    // Clear the recorded video if any
    setRecordedBlob(null);
    if (videoRef.current) {
      videoRef.current.src = "";
      videoRef.current.controls = false;
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
