import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Simple Alert component
const Alert = ({ children, variant = 'default' }) => {
  const bgColor = variant === 'default' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700';
  return (
    <div className={`p-4 mb-4 text-sm rounded-lg ${bgColor}`} role="alert">
      {children}
    </div>
  );
};

// Custom Star component using SVG
const CustomStar = ({ filled, hovered, onMouseEnter, onMouseLeave, onClick }) => {
  return (
    <svg
      className="cursor-pointer"
      width="35"
      height="35"
      viewBox="0 0 24 24"
      fill={filled ? "#FCD34D" : "none"}
      stroke={hovered ? "#FCD34D" : "#D1D5DB"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};

const VideoRating = () => {
  const { t } = useTranslation('rating');
  const [video, setVideo] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:8001'; // Make this configurable

  useEffect(() => {
    fetchRandomVideo();
  }, []);

  const fetchRandomVideo = async () => {
    setError(null);
    setMessage('');
    const token = localStorage.getItem('signLangRecToken');
    
    if (!token) {
      setError('No authentication token found. Please log in.');
      return;
    }

    try {
      const url = `${API_BASE_URL}/ratings/random`;
      console.log('Fetching from URL:', url);
      
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response body:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log('Fetched video data:', data);
      
      // Construct the full video URL
      const videoUrl = `${API_BASE_URL}${data.url}`;
      setVideo({ ...data, url: videoUrl });
    } catch (error) {
      console.error('Error fetching video:', error);
      setError(`${t('error.fetchVideo')}: ${error.message}`);
    }
  };

  const handleRating = async () => {
    if (!video) {
      setError(t('error.noVideo'));
      return;
    }

    try {
      const url = `${API_BASE_URL}/ratings/rate`;
      console.log('Submitting rating to URL:', url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('signLangRecToken')}`,
        },
        body: JSON.stringify({
          video_id: video.id,
          rating: rating,
          comment_text: comment,
        }),
      });

      console.log('Rating submission response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response body:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log('Rating submission response:', data);

      setMessage(t('success.ratingSubmitted'));
      setRating(0);
      setComment('');
      fetchRandomVideo();
    } catch (error) {
      console.error('Error submitting rating:', error);
      setError(`${t('error.submitRating')}: ${error.message}`);
    }
  };

  const renderStar = (index) => {
    return (
      <CustomStar
        key={index}
        filled={index <= rating}
        hovered={index <= hoveredRating}
        onMouseEnter={() => setHoveredRating(index)}
        onMouseLeave={() => setHoveredRating(0)}
        onClick={() => setRating(index)}
      />
    );
  };

  if (error) {
    return <Alert variant="error">{error}</Alert>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">{t('rateVideo')}</h2>
      

      {!video ? (
        <div>{t('loading')}</div>
      ) : (
        <>
          {video.url ? (
            <video src={video.url} controls className="w-full mb-4">
              Your browser does not support the video tag.
            </video>
          ) : (
            <p>Error: No video URL available</p>
          )}
          <div className="mb-4 flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map(renderStar)}
          </div>
          <p className="text-center mb-4">{t('currentRating')}: {rating}</p>
          <textarea
            className="w-full p-2 border rounded mb-4"
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t('commentPlaceholder')}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleRating}
          >
            {t('submitRating')}
          </button>
          {message && (
            <Alert variant="default">
              {message}
            </Alert>
          )}
          {video.average_rating !== null && (
            <p className="mt-4">
              {t('averageRating')}: {video.average_rating.toFixed(1)} {t('outOf5')} ({video.ratings_count} {t('ratings')})
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default VideoRating;