import axios from "axios";
import React, { useState } from "react";

import { API_URL } from "../api_url/api-url"

const Duration = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [id] = useState(props.id);

  const handleSubmit = (e) => {
    axios({
      method: "post",
      url: `${API_URL}add-client-duration/${id}`,
      data: {
        name: name,
        description: description,
      },
      withCredentials: true
    })
    .then((response) => {
      setName("");
      setDescription("");
    })
    .catch((error) => {
      console.log("error in add Duration: ", error)
    })

    e.preventDefault()
  }


  return (
      <div className="trial-form-wrapper" >
        <form className="trial-form" onSubmit={(e) => {handleSubmit(e)}}>
          <p>Name</p>
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
          <p>Description</p>
          <textarea
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="trial-description"
            value={description}
          />
          <button>Submit</button>
        </form>
      </div>
  );
};

export default Duration;