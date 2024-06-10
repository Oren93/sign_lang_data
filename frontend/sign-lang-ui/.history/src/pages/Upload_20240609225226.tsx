// src/pages/Upload.tsx
import React from 'react';

const Upload: React.FC = () => {
  return (
    <main>
      <section>
        <h2>Upload Your Video Files</h2>
        <p>Please upload your video files using the form below. Make sure your videos meet our submission guidelines.</p>
        <form action="/submit-video" method="post" encType="multipart/form-data">
          <label htmlFor="videoFile">Select video file to upload:</label>
          <input type="file" id="videoFile" name="videoFile" accept="video/*" />
          <button type="submit">Upload Video</button>
        </form>
      </section>
    </main>
  );
};

export default Upload;
