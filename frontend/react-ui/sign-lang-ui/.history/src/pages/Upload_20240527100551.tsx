// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <main>
      <section>
        <h2>Welcome to our Video Data Collection Portal</h2>
        <p>This portal is designed to facilitate the collection of video data for research and training purposes.</p>
        <p>Please navigate through the website to contribute or access our resources.</p>
      </section>
      <section>
        <h3>Contribute Data</h3>
        <p>If you have video data that you would like to contribute to our repository, please follow the instructions below:</p>
        <ol>
          <li>Ensure your data complies with our submission guidelines.</li>
          <li>Upload your files using the form provided.</li>
        </ol>
        <Link to="/upload">Go to Upload Page</Link>
      </section>
      <section>
        <h3>Access Data</h3>
        <p>If you are looking to access data from our repository for your research, please follow the steps below:</p>
        <Link to="/browse">Browse Available Data</Link>
      </section>
    </main>
  );
};

export default Home;


