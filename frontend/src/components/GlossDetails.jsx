import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Loader } from "lucide-react";
import API_BASE_URL from "/app/src/config";

const GlossDetails = ({ gloss }) => {
  const { t } = useTranslation("data_access");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGlossVideos();
  }, [gloss]);

  const fetchGlossVideos = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/gloss/${gloss.id}/videos`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("signLangRecToken")}`,
        },
      });
      const data = await response.json();
      setVideos(data.videos);
    } catch (error) {
      console.error("Error fetching gloss videos:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader className="animate-spin" size={24} />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{gloss.gloss}</h2>
      {videos.length > 0 ? (
        <div className="space-y-4">
          {videos.map((video) => (
            <div key={video.id} className="border rounded-md p-4">
              <video src={video.url} controls className="w-full rounded-md">
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">{t("no_videos")}</p>
      )}
    </div>
  );
};

export default GlossDetails;
