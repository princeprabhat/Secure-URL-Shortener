import { handleCopy } from "../utils.js";

const UrlList = ({ urlData, handleRedirect, handleAnalytics }) => {
  return (
    <section className="list-box">
      <span>History - Generated URLs</span>

      <section className="list-area">
        {urlData.map((item, idx) => (
          <div key={idx} className="list-item">
            <span>
              {idx + 1}. {item?.original_url}
            </span>
            <div className="btn-container">
              <button
                className="link-copy-btn"
                onClick={() => handleCopy(item.short_url)}
              >
                copy short url
              </button>
              <button
                className="redirect-btn"
                onClick={() => handleRedirect(item?.short_code)}
              >
                redirect
              </button>
              <button
                className="analytics-btn"
                onClick={() => handleAnalytics(item?.short_code)}
              >
                analytics
              </button>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
};

export default UrlList;
