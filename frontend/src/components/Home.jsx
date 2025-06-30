import UrlShortener from "./UrlShortener.jsx";
import UrlList from "./UrlList.jsx";
import AnalyticsCard from "./AnalyticsCard.jsx";
import { useEffect, useState } from "react";
import api from "../api.js";

const Home = () => {
  const [urls, setUrls] = useState([]);
  const [urlAnalytics, setUrlAnalytics] = useState(null);
  // Get data from localstorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("urls") || "[]");
    setUrls(saved);
  }, []);

  // Trigger fresh data for list to render
  const updateLocalStorageData = () => {
    const stored = JSON.parse(localStorage.getItem("urls") || "[]");
    setUrls(stored);
  };

  // handling redirect from frontend to hit /:shortCode endpoint
  const handleRedirect = async (shortCode) => {
    const fullRedirectUrl = `${process.env.REACT_APP_REDIRECT_BASE_URL}/${shortCode}`;
    window.open(fullRedirectUrl, "_blank");
  };

  const handleAnalytics = async (shortCode) => {
    try {
      const res = await api.get(`/analytics/${shortCode}`);
      const data = res.data.data;
      setUrlAnalytics(data);
    } catch (error) {
      alert("Can't fetch analytics, please try later");
      console.error("Error fetching analytics: ", error);
    }
  };

  return (
    <main className="home-layout">
      <section className="left-box">
        <UrlShortener refreshLocalData={updateLocalStorageData} />

        <UrlList
          urlData={urls}
          handleRedirect={handleRedirect}
          handleAnalytics={handleAnalytics}
        />
      </section>
      <section className="right-box">
        <h4>Analytics Board</h4>
        <AnalyticsCard urlData={urlAnalytics} />
      </section>
    </main>
  );
};

export default Home;
