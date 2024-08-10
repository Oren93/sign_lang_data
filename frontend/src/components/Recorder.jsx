import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Video, Play, Pause, Send, SkipForward, RotateCcw } from 'lucide-react';

const Recorder = () => {
  const { t } = useTranslation("record_page");
  const [recording, setRecording] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [currentWord, setCurrentWord] = useState("");
  const [currentWordId, setCurrentWordId] = useState("");
  const [wordsObject, setWordsObject] = useState({});
  const [protectedMessage, setProtectedMessage] = useState("");
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const wordIds = useRef([]);
  const wordIndex = useRef(0);

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
      wordIndex.current = 1;
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
    setReviewing(false);
    setRecordedBlob(null);
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
          setReviewing(true);
        };

        mediaRecorderRef.current.start();
      })
      .catch((error) => console.error("getUserMedia error:", error));
  };

  const stopRecording = () => {
    setRecording(false);
    mediaRecorderRef.current.stop();
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
      setProtectedMessage("No authentication token found. Please log in again.");
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
        setProtectedMessage(`Video submitted successfully. ID: ${data.id}, Filename: ${data.filename}, Gloss ID: ${data.gloss_id}`);
        setRecordedBlob(null);
        setReviewing(false);
        videoRef.current.src = "";
        videoRef.current.controls = false;
        loadNextWord();
      } else {
        const errorData = await response.json();
        setProtectedMessage(`Failed to submit video. Status: ${response.status}. Error: ${errorData.detail}`);
      }
    } catch (error) {
      console.error("Error submitting video:", error);
      setProtectedMessage(`Error submitting video: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">{t("sign_lang_record")}</h1>
        <div className="space-y-6">
          <div className="flex justify-center">
            <video
              ref={videoRef}
              width="640"
              height="480"
              autoPlay
              className="border-2 border-gray-300 rounded-lg"
            ></video>
          </div>
          <div className="flex justify-center space-x-4">
            {!recording && !reviewing && (
              <button
                onClick={startRecording}
                className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors duration-300 flex items-center"
              >
                <Play size={18} className="mr-2" />
                {t("start_recording")}
              </button>
            )}
            {recording && (
              <button
                onClick={stopRecording}
                className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors duration-300 flex items-center"
              >
                <Pause size={18} className="mr-2" />
                {t("stop_recording")}
              </button>
            )}
            {reviewing && (
              <>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 flex items-center"
                >
                  <Send size={18} className="mr-2" />
                  {t("submit_recording")}
                </button>
                <button
                  onClick={startRecording}
                  className="bg-yellow-600 text-white px-4 py-2 rounded-full hover:bg-yellow-700 transition-colors duration-300 flex items-center"
                >
                  <RotateCcw size={18} className="mr-2" />
                  {t("re_record")}
                </button>
              </>
            )}
            {!recording && !reviewing && (
              <button
                onClick={loadNextWord}
                className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors duration-300 flex items-center"
              >
                <SkipForward size={18} className="mr-2" />
                {t("skip_gloss")}
              </button>
            )}
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">{t("gloss_to_sign")}</h3>
            <p className="text-2xl font-bold text-primary-600">{currentWord}</p>
          </div>
          {protectedMessage && (
            <div className="mt-4 p-4 bg-blue-100 text-blue-700 rounded-lg">
              {protectedMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recorder;