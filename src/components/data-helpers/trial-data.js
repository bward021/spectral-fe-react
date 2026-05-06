import React, { useEffect, useState } from "react";
import axios from "axios";
import TrialInstanceData from "./trial-instance";
import { API_URL } from "../api_url/api-url";

const TrialData = (props) => {
  const [trials, setTrials] = useState([]);
  const [trialSelect, setTrialSelect] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: `${API_URL}get-all-client-trials/${props.id}`,
      withCredentials: true,
    })
      .then((response) => setTrials(response.data))
      .catch((error) => console.log("Error in get trials:", error));
  }, [props.id, props.date]);

  return (
    <div className="trial-data-card">
      <div className="trial-data-header">
        <h3>Trial Programs</h3>
      </div>
      <div className="trial-data-body">
        <div className="trial-list">
          {trials.length === 0 && (
            <div className="trial-list-empty">No trial programs found.</div>
          )}
          {trials.map((trial) => (
            <button
              key={trial.trial_id}
              className={`trial-list-item ${trialSelect?.trial_id === trial.trial_id ? "active" : ""}`}
              onClick={() => setTrialSelect(trial)}
            >
              <span className="trial-list-name">{trial.trial_name}</span>
              <span className="trial-list-category">{trial.trial_category}</span>
            </button>
          ))}
        </div>
        <div className="trial-instance-panel">
          {trialSelect ? (
            <TrialInstanceData date={props.date} trial={trialSelect} />
          ) : (
            <div className="trial-select-prompt">
              <p>👈 Select a trial program to record data</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrialData;