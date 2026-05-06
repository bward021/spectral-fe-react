import axios from "axios";
import React, { useState, useEffect } from "react";
import { API_URL } from "../api_url/api-url";

const TrialInstanceData = (props) => {
  const [firstInstance, setFirstInstance] = useState(false);
  const [incorrect, setIncorrect] = useState(0);
  const [prompted, setPrompted] = useState(0);
  const [correct, setCorrect] = useState(0);

  useEffect(() => {
    let cancelled = false;

    setCorrect(0);
    setIncorrect(0);
    setPrompted(0);
    setFirstInstance(false);

    axios({
      method: "get",
      url: `${API_URL}check-trial-instance?id=${props.trial.trial_id}&date=${props.date}`,
      withCredentials: true,
    })
      .then((response) => {
        if (cancelled) return;
        if (response.data === "No data found") {
          setFirstInstance(true);
        } else {
          setCorrect(response.data.trial_instance_correct);
          setIncorrect(response.data.trial_instance_incorrect);
          setPrompted(response.data.trial_instance_prompted);
        }
      })
      .catch((error) => {
        if (cancelled) return;
        if (error.response?.status === 404) {
          setFirstInstance(true);
        } else {
          console.log("error in trial instance:", error);
        }
      });

    return () => { cancelled = true; };
  }, [props.trial.trial_id, props.date]);

  const handleIncorrect = (num) => {
    console.log("firstInstance:", firstInstance, "incorrect:", incorrect, "num:", num);
    if (firstInstance) {
      axios({ method: "post", url: `${API_URL}new-trial-instance`, data: { id: props.trial.trial_id, date: props.date, incorrect: incorrect + num, prompted: 0, correct: 0 }, withCredentials: true })
        .then(() => { setFirstInstance(false); setIncorrect(incorrect + num); })
        .catch((e) => console.log(e));
    } else {
      axios({ method: "patch", url: `${API_URL}update-trial-instance-incorrect`, data: { id: props.trial.trial_id, data: incorrect + num, date: props.date }, withCredentials: true })
        .then(() => setIncorrect(incorrect + num))
        .catch((e) => console.log(e));
    }
  };

  const handlePrompted = (num) => {
    if (firstInstance) {
      axios({ method: "post", url: `${API_URL}new-trial-instance`, data: { id: props.trial.trial_id, date: props.date, incorrect: 0, prompted: prompted + num, correct: 0 }, withCredentials: true })
        .then(() => { setFirstInstance(false); setPrompted(prompted + num); })
        .catch((e) => console.log(e));
    } else {
      axios({ method: "patch", url: `${API_URL}update-trial-instance-prompted`, data: { id: props.trial.trial_id, data: prompted + num, date: props.date }, withCredentials: true })
        .then(() => setPrompted(prompted + num))
        .catch((e) => console.log(e));
    }
  };

  const handleCorrect = (num) => {
    if (firstInstance) {
      axios({ method: "post", url: `${API_URL}new-trial-instance`, data: { id: props.trial.trial_id, date: props.date, incorrect: 0, prompted: 0, correct: correct + num }, withCredentials: true })
        .then(() => { setFirstInstance(false); setCorrect(correct + num); })
        .catch((e) => console.log(e));
    } else {
      axios({ method: "patch", url: `${API_URL}update-trial-instance-correct`, data: { id: props.trial.trial_id, data: correct + num, date: props.date }, withCredentials: true })
        .then(() => setCorrect(correct + num))
        .catch((e) => console.log(e));
    }
  };

  const total = incorrect + prompted + correct;
  const pct = (val) => total === 0 ? 0 : Math.round((val / total) * 100);

  return (
    <div className="trial-instance-wrap">
      <div className="trial-instance-title">
        <h2>{props.trial.trial_name}</h2>
        <p>{props.trial.trial_description}</p>
      </div>

      <div className="trial-counters">
        <div className="trial-counter incorrect">
          <div className="counter-label">Incorrect</div>
          <div className="counter-value">{incorrect}</div>
          <div className="counter-pct">{pct(incorrect)}%</div>
          <div className="counter-btns">
            <button onClick={() => handleIncorrect(-1)} disabled={incorrect <= 0}>−</button>
            <button onClick={() => handleIncorrect(1)}>+</button>
          </div>
        </div>
        <div className="trial-counter prompted">
          <div className="counter-label">Prompted</div>
          <div className="counter-value">{prompted}</div>
          <div className="counter-pct">{pct(prompted)}%</div>
          <div className="counter-btns">
            <button onClick={() => handlePrompted(-1)} disabled={prompted <= 0}>−</button>
            <button onClick={() => handlePrompted(1)}>+</button>
          </div>
        </div>
        <div className="trial-counter correct">
          <div className="counter-label">Correct</div>
          <div className="counter-value">{correct}</div>
          <div className="counter-pct">{pct(correct)}%</div>
          <div className="counter-btns">
            <button onClick={() => handleCorrect(-1)} disabled={correct <= 0}>−</button>
            <button onClick={() => handleCorrect(1)}>+</button>
          </div>
        </div>
      </div>

      {total > 0 && (
        <div className="trial-progress-bar">
          <div className="progress-incorrect" style={{ width: `${pct(incorrect)}%` }} />
          <div className="progress-prompted" style={{ width: `${pct(prompted)}%` }} />
          <div className="progress-correct" style={{ width: `${pct(correct)}%` }} />
        </div>
      )}
    </div>
  );
};

export default TrialInstanceData;