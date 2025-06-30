import { useState } from "react";
import api from "../api.js";
import { isValidHttpUrl } from "../utils.js";
import { handleCopy } from "../utils.js";

const UrlShortener = ({ refreshLocalData }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // isValidHttpUrl() - helper method to check valid url before making request
    if (!inputValue || !isValidHttpUrl(inputValue)) {
      setError(true);
      setShortUrl("");
      return;
    }
    // axios call to create url
    try {
      const res = await api.post("/shorten", { originalUrl: inputValue });
      // Terminate if url is already sorted
      if (res.data.message === "Short URL already exists") {
        alert(res.data.message);
        return;
      }

      const data = res.data.data;

      // Set localstorage data
      const existing = JSON.parse(localStorage.getItem("urls") || "[]");
      localStorage.setItem("urls", JSON.stringify([data, ...existing]));

      setInputValue("");
      setError(false);
      setShortUrl(data?.short_url);
      refreshLocalData();
    } catch (error) {
      console.error("Some error occured: ", error);
      setError(true);
      setShortUrl("");
    }
  };

  return (
    <section className="url-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Paste URL"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Generate</button>
      </form>
      {shortUrl && (
        <p className="result">
          {shortUrl}
          <button onClick={() => handleCopy(shortUrl)} className="copy-btn">
            copy
          </button>
        </p>
      )}
      {error && <p className="error">Not able to process this request!</p>}
    </section>
  );
};

export default UrlShortener;
