import React from "react";
import { formatDate } from "../utils";

const AnalyticsCard = ({ urlData }) => {
  if (!urlData) return <p className="no-data">No Data...</p>;
  const date = formatDate(urlData.created_at);

  return (
    <section className="analytics-card">
      <p>
        Short Url : <span>{urlData.short_url}</span>
      </p>
      <p>
        Created At : <span>{date}</span>
      </p>
      <p>
        Total Clicks :<span> {urlData.clicks}</span>
      </p>
    </section>
  );
};

export default AnalyticsCard;
