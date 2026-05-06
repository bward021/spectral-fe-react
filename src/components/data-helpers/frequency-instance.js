import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../api_url/api-url";

const FrequencyInstance = (props) => {
  const [data, setData] = useState(0);
  const [firstInstance, setFirstInstance] = useState(false);

  useEffect(() => {
    axios({
      method: "get",
      url: `${API_URL}get-frequency-instance?id=${props.id}&date=${props.date}`,
      withCredentials: true,
    })
      .then((response) => {
        if (response.data === "No data found") {
          setFirstInstance(true);
          setData(0);
        } else {
          setData(response.data.frequency_instance_data);
        }
      })
      .catch((error) => console.log("error in FrequencyInstance:", error));
  }, [props.id, props.date]);

  const handleClick = (num) => {
    if (firstInstance) {
      axios({ method: "post", url: `${API_URL}new-frequency-instance`, data: { id: props.id, data: data + num, date: props.date }, withCredentials: true })
        .then(() => { setData(data + num); setFirstInstance(false); })
        .catch((e) => console.log(e));
    } else {
      axios({ method: "patch", url: `${API_URL}update-frequency-instance/${props.id}`, data: { data: data + num, date: props.date }, withCredentials: true })
        .then(() => setData(data + num))
        .catch((e) => console.log(e));
    }
  };

  return (
    <div className="frequency-item">
      <div className="frequency-item-name">{props.name}</div>
      <div className="frequency-item-controls">
        <button className="freq-btn minus" onClick={() => handleClick(-1)} disabled={data <= 0}>−</button>
        <span className="frequency-item-count">{data}</span>
        <button className="freq-btn plus" onClick={() => handleClick(1)}>+</button>
      </div>
    </div>
  );
};

export default FrequencyInstance;