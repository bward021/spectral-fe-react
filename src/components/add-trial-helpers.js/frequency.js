import axios from "axios";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../api_url/api-url";

const Frequency = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [addAlert, setAddAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios({
      method: "post",
      url: `${API_URL}add-client-frequency/${props.id}`,
      data: { name, description },
      withCredentials: true,
    })
      .then(() => {
        setName("");
        setDescription("");
        setAddAlert(true);
        setTimeout(() => setAddAlert(false), 4000);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error in add frequency:", error);
        setIsLoading(false);
      });
  };

  return (
    <div className="program-form-card">
      <div className="program-form-header">
        <h2>New Frequency Program</h2>
        <p>Count how often a behavior occurs</p>
      </div>
      <form className="program-form" onSubmit={handleSubmit}>
        <div className="pf-field">
          <label>Program Name</label>
          <input
            type="text"
            placeholder="e.g. Hand Flapping"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="pf-field">
          <label>Description</label>
          <textarea
            placeholder="Describe what behavior is being tracked..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="program-form-footer">
          {addAlert && <span className="pf-success">✓ Frequency program added!</span>}
          <button className="btn-primary" type="submit" disabled={isLoading}>
            {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Add Program"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Frequency;