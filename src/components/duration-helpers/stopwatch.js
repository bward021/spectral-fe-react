import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../api_url/api-url";

const displayTime = (time) => {
  const ms = time % 1000;
  const seconds = Math.floor(time / 1000) % 60;
  const minutes = Math.floor(time / 60000) % 60;
  const hours = Math.floor(time / 3600000);
  const pad = (n) => String(n).padStart(2, "0");
  if (hours > 0) return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(Math.floor(ms / 10))}`;
  return `${pad(minutes)}:${pad(seconds)}.${pad(Math.floor(ms / 10))}`;
};

const StopWatch = (props) => {
  const [counting, setCounting] = useState(false);
  const [firstClick, setFirstClick] = useState(false);
  const [overallTime, setOverallTime] = useState(0);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let timerId;
    if (counting) {
      timerId = setInterval(() => setOverallTime((t) => t + 10), 10);
    }
    return () => clearInterval(timerId);
  });

  const handleReset = () => {
    setCounting(false);
    setFirstClick(false);
    setOverallTime(0);
    setSaved(false);
  };

  const handleSave = () => {
    axios({
      method: "post",
      url: `${API_URL}new-duration-instance`,
      data: { id: props.data.duration_id, date: props.date, data: overallTime },
      withCredentials: true,
    })
      .then(() => { setCounting(false); setOverallTime(0); setFirstClick(false); setSaved(true); setTimeout(() => setSaved(false), 3000); })
      .catch((error) => console.log("error in stopwatch:", error));
  };

  return (
    <div className="stopwatch-item">
      <div className="stopwatch-name">{props.data.duration_name}</div>
      <div className="stopwatch-display">{displayTime(overallTime)}</div>
      <div className="stopwatch-controls">
        {!counting && !firstClick ? (
          <button className="sw-btn start" onClick={() => { setCounting(true); setFirstClick(true); }}>Start</button>
        ) : (
          <>
            <button className="sw-btn" onClick={() => setCounting(!counting)}>
              {counting ? "Stop" : "Resume"}
            </button>
            <button className="sw-btn reset" onClick={handleReset}>Reset</button>
            <button className="sw-btn save" onClick={handleSave}>Save</button>
          </>
        )}
      </div>
      {saved && <div className="sw-saved">✓ Saved!</div>}
    </div>
  );
};

export default StopWatch;