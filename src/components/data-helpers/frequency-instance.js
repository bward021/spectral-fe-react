import React, { useState, useEffect } from "react";
import axios from "axios";

import { API_URL } from "../api_url/api-url"

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
      .catch((error) => {
        console.log("error in Clients: ", error);
      });
  }, [props.id, props.date]);

  const handleClick = (num) => {
    if (firstInstance === true) {
      axios({
          method: "post",
          url: `${API_URL}new-frequency-instance`,
          data: {
            id: props.id,
            data: data + num,
            date: props.date,
          },
          withCredentials: true,
        })
        .then(() => {
          setData(data + num);
          setFirstInstance(false);
        })
        .catch((error) => {
          console.log("error in new frequency: ", error);
        });
    } else {
      axios({
        method: "patch",
        url: `${API_URL}update-frequency-instance/${props.id}`,
        data: {
          data: data + num,
          date: props.date,
        },
        withCredentials: true,
      })
        .then(() => {
          setData(data + num);
        })
        .catch((error) => {
          console.log("error in frequency update: ", error);
        });
    }
  };

  return (
    <div className="frequency-button-wrapper">
      <input
        type="button"
        onClick={() => {
          handleClick(-1);
        }}
        value="-"
        disabled={data <= 0 ? true : false}
      />
      <p>
        {props.name}
        <div>{data}</div>
      </p>

      <input
        type="button"
        onClick={() => {
          handleClick(1);
        }}
        value="+"
      />
    </div>
  );
};

export default FrequencyInstance;
