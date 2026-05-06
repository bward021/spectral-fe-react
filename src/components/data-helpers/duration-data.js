import axios from "axios";
import React, { useEffect, useState } from "react";
import StopWatch from "../duration-helpers/stopwatch";
import { API_URL } from "../api_url/api-url";

const DurationData = (props) => {
  const [durationData, setDurationData] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `${API_URL}get-all-client-duration/${props.id}`,
      withCredentials: true,
    })
      .then((response) => setDurationData(response.data))
      .catch((error) => console.log("error in DurationData:", error));
  }, []);

  return (
    <div className="side-data-card">
      <div className="side-data-header">
        <h3>Duration</h3>
      </div>
      <div className="side-data-body">
        {durationData.length === 0 && (
          <div className="side-data-empty">No duration programs found.</div>
        )}
        {durationData.map((duration) => (
          <StopWatch key={duration.duration_id} data={duration} date={props.date} />
        ))}
      </div>
    </div>
  );
};

export default DurationData;