import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Duration from "../add-trial-helpers.js/duration";
import Frequency from "../add-trial-helpers.js/frequency";
import Trial from "../add-trial-helpers.js/trial";

const AddClientTrial = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [trialType, setTrialType] = useState("");

  const renderComponent = () => {
    if (trialType === "Trial")     return <Trial id={slug} />;
    if (trialType === "Frequency") return <Frequency id={slug} />;
    if (trialType === "Duration")  return <Duration id={slug} />;
    return null;
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>Add Program</h1>
        <p>Select a program type and fill out the form below.</p>
      </div>

      <div className="add-trial-layout">

        <div className="add-trial-sidebar">
          <div className="trial-type-card">
            <div className="trial-type-label">Program Type</div>
            <div className="trial-type-options">
              {["Trial", "Duration", "Frequency"].map((type) => (
                <button
                  key={type}
                  className={`trial-type-btn ${trialType === type ? "active" : ""}`}
                  onClick={() => setTrialType(type)}
                  type="button"
                >
                  <span className="trial-type-icon">
                    {type === "Trial" && "📋"}
                    {type === "Duration" && "⏱"}
                    {type === "Frequency" && "📊"}
                  </span>
                  <span>{type}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            className="btn-secondary full-width"
            onClick={() => navigate(`/clients/${slug}`)}
            type="button"
          >
            ← Back to Client Portal
          </button>
        </div>

        <div className="add-trial-main">
          {trialType === "" ? (
            <div className="trial-empty-state">
              <div className="trial-empty-icon">👈</div>
              <p>Select a program type to get started</p>
            </div>
          ) : (
            renderComponent()
          )}
        </div>

      </div>
    </div>
  );
};

export default AddClientTrial;