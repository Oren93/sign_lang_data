import React from "react";

const RecorderContent = ({
  recording,
  handleStartRecording,
  handleStopRecording,
  renderWords,
  videoRef,
}) => (
  <div className="recorder-wrapper">
    <h1>Sign Language Video Recorder</h1>
    <div id="video-container">
      {recording ? (
        <div className="button-container">
          <button id="stopButton" onClick={handleStopRecording}>
            Stop Recording
          </button>
        </div>
      ) : (
        <div className="button-container">
          <button id="startButton" onClick={handleStartRecording}>
            Start Recording
          </button>
        </div>
      )}
      <video
        id="video"
        width="640"
        height="480"
        autoPlay
        ref={videoRef}
      ></video>
    </div>
    {recording && renderWords()}
    <div id="recorded-video-container">
      {!recording && <h2>Recorded Video</h2>}
      <video id="recordedVideo" width="640" height="480" controls></video>
    </div>
  </div>
);

export default RecorderContent;
