import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import GlossDetails from "../components/GlossDetails";
import API_BASE_URL from "/app/src/config";

const DataAccess = () => {
  const { t } = useTranslation("data_access");
  const [glosses, setGlosses] = useState([]);
  const [selectedGloss, setSelectedGloss] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchGlosses();
  }, []);

  const fetchGlosses = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/glosses`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("signLangRecToken")}`,
        },
      });
      const data = await response.json();
      setGlosses(data.glosses);
    } catch (error) {
      console.error("Error fetching glosses:", error);
    }
  };

  const filteredGlosses = glosses.filter((gloss) =>
    gloss.gloss.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        {t("title")}
      </h1>
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder={t("search_placeholder")}
            className="w-full p-2 pl-10 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">{t("gloss_list")}</h2>
          <ul className="space-y-2">
            {filteredGlosses.map((gloss) => (
              <li
                key={gloss.id}
                className={`p-2 rounded-md cursor-pointer flex justify-between items-center ${
                  gloss.video_count > 0
                    ? "bg-green-100 hover:bg-green-200"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => setSelectedGloss(gloss)}
              >
                <span>{gloss.gloss}</span>
                <span className="text-sm text-gray-600">
                  {gloss.video_count}{" "}
                  {gloss.video_count === 1 ? t("video") : t("videos")}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          {selectedGloss ? (
            <GlossDetails gloss={selectedGloss} />
          ) : (
            <p className="text-center text-gray-600">{t("select_gloss")}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataAccess;
