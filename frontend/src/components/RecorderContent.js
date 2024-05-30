import React from "react";

const RecorderContent = ({
  recording,
  handleStartRecording,
  handleStopRecording,
  renderWords,
  videoRef,
  handleSubmit,
  handleSkip,
  recordedBlob,
}) => (
  <div className="recorder-wrapper">
    <h1>Sign Language Video Recorder</h1>
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
            Stop Recording
          </button>
        ) : (
          <button id="startButton" onClick={handleStartRecording}>
            Start Recording
          </button>
        )}
        <button
          id="submitButton"
          onClick={handleSubmit}
          disabled={!recordedBlob}
        >
          Submit
        </button>
        <button id="skipButton" onClick={handleSkip}>
          Skip
        </button>
      </div>
      {renderWords()}
    </div>
  </div>
);

export default RecorderContent;
