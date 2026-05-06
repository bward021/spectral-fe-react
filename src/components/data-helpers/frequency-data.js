import React, { useState, useEffect } from "react";
import axios from "axios";
import FrequencyInstance from "./frequency-instance";
import { API_URL } from "../api_url/api-url";

const FrequencyData = (props) => {
  const [frequencyData, setFrequencyData] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `${API_URL}get-frequency/${props.id}`,
      withCredentials: true,
    })
      .then((response) => setFrequencyData(response.data))
      .catch((error) => console.log("Error in FrequencyData:", error));
  }, [props.id, props.date]);

  return (
    <div className="side-data-card">
      <div className="side-data-header">
        <h3>Frequency</h3>
      </div>
      <div className="side-data-body">
        {frequencyData.length === 0 && (
          <div className="side-data-empty">No frequency programs found.</div>
        )}
        {frequencyData.map((frequency) => (
          <FrequencyInstance
            key={frequency.frequency_id}
            id={frequency.frequency_id}
            name={frequency.frequency_name}
            date={props.date}
          />
        ))}
      </div>
    </div>
  );
};

export default FrequencyData;