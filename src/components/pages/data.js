import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DurationData from "../data-helpers/duration-data";
import FrequencyData from "../data-helpers/frequency-data";
import TrialData from "../data-helpers/trial-data";

const Data = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);

  return (
    <div className="page-wrapper">
      <div className="data-page-header">
        <div className="data-page-title">
          <h1>Data Collection</h1>
          <p>Recording data for {date}</p>
        </div>
        <div className="data-page-controls">
          <input
            type="date"
            className="date-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button className="btn-secondary" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>
      </div>

      <div className="data-grid">
        <div className="data-grid-main">
          <TrialData id={slug} date={date} />
        </div>
        <div className="data-grid-side">
          <FrequencyData id={slug} date={date} />
          <DurationData id={slug} date={date} />
        </div>
      </div>
    </div>
  );
};

export default Data;