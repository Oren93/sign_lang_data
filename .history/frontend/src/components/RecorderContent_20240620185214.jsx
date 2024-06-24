// src/components/RecorderContent.jsx
import React from "react";
import { useTranslation } from 'react-i18next';

const RecorderContent = ({
  recording,
  handleStartRecording,
  handleStopRecording,
  renderWords,
  videoRef,
  handleSubmit,
  handleSkip,
  recordedBlob,
}) => {
  const { t } = useTranslation('record_page');

  return (
    <div className="recorder-wrapper">
      <h1>{t('sign_lang_record')}</h1>
      <div id="video-container">
        <video
          id="video"
          width="640"
          height="480"
          autoPlay
          ref={videoRef}
          controls={recordedBlob ? true : false}
        ></video>
        <div className="button-container">
          {recording ? (
            <button id="stopButton" onClick={handleStopRecording}>
              {t('stop_recording')}
            </button>
          ) : (
            <button id="startButton" onClick={handleStartRecording}>
              {t('start_recording')}
            </button>
          )}
          <button
            id="submitButton"
            onClick={handleSubmit}
            disabled={!recordedBlob || recording}
          >
            {t('submit_recording')}
          </button>
          <button id="skipButton" onClick={handleSkip} disabled={recording}>
            {t('skip_gloss')}
          </button>
        </div>
        {renderWords()}
      </div>
    </div>
  );
};

export default RecorderContent;
