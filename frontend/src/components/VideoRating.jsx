import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Star, Send, AlertCircle } from "lucide-react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "/app/src/config";

const CustomStar = ({
  filled,
  hovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  return (
    <Star
      size={35}
      fill={filled ? "#FCD34D" : "none"}
      stroke={hovered ? "#FCD34D" : "#D1D5DB"}
      className="cursor-pointer transition-colors duration-200"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    />
  );
};

const VideoRating = () => {
  const { t } = useTranslation("rating");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchRandomVideo();
    }
  }, [user, navigate]);

  const fetchRandomVideo = async () => {
    setError(null);
    setMessage("");

    if (!user || !user.token) {
      setError("No authentication token found. Please log in.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/ratings/random`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const videoUrl = `${API_BASE_URL}${data.url}`;
      setVideo({ ...data, url: videoUrl });
    } catch (error) {
      console.error("Error fetching video:", error);
      setError(`${t("error.fetchVideo")}: ${error.message}`);
    }
  };

  const handleRating = async () => {
    if (!video) {
      setError(t("error.noVideo"));
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/ratings/rate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          video_id: video.id,
          rating: rating,
          comment_text: comment,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setMessage(t("success.ratingSubmitted"));
      setRating(0);
      setComment("");
      fetchRandomVideo();
    } catch (error) {
      console.error("Error submitting rating:", error);
      setError(`${t("error.submitRating")}: ${error.message}`);
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

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {t("rateVideo")}
        </h2>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg flex items-center">
            <AlertCircle className="mr-2" />
            {error}
          </div>
        )}

        {!video ? (
          <div className="text-center text-gray-600">{t("loading")}</div>
        ) : (
          <>
            <div className="mb-6">
              <video src={video.url} controls className="w-full rounded-lg">
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="mb-4 flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map(renderStar)}
            </div>
            <p className="text-center mb-4 text-gray-700">
              {t("currentRating")}: {rating}
            </p>
            <textarea
              className="w-full p-2 border rounded-lg mb-4 focus:ring-2 focus:ring-primary-500"
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t("commentPlaceholder")}
            />
            <button
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
              onClick={handleRating}
            >
              <Send className="mr-2" />
              {t("submitRating")}
            </button>
            {message && (
              <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
                {message}
              </div>
            )}
            {video.average_rating !== null && (
              <p className="mt-4 text-center text-gray-700">
                {t("averageRating")}: {video.average_rating.toFixed(1)}{" "}
                {t("outOf5")} ({video.ratings_count} {t("ratings")})
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VideoRating;
