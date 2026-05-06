import axios from "axios";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../api_url/api-url";

const Trial = (props) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [addAlert, setAddAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios({
      method: "post",
      url: `${API_URL}add-client-trial/${props.id}`,
      data: { name, category, description },
      withCredentials: true,
    })
      .then(() => {
        setName("");
        setCategory("");
        setDescription("");
        setAddAlert(true);
        setTimeout(() => setAddAlert(false), 4000);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error in add trial:", error);
        setIsLoading(false);
      });
  };

  return (
    <div className="program-form-card">
      <div className="program-form-header">
        <h2>New Trial Program</h2>
        <p>Discrete trial training program</p>
      </div>
      <form className="program-form" onSubmit={handleSubmit}>
        <div className="pf-field">
          <label>Program Name</label>
          <input
            type="text"
            placeholder="e.g. Color Identification"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="pf-field">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select category</option>
            <option value="Motor Skills">Motor Skills</option>
            <option value="Fine Motor Skills">Fine Motor Skills</option>
            <option value="Critical Thinking">Critical Thinking</option>
            <option value="Educational">Educational</option>
          </select>
        </div>
        <div className="pf-field">
          <label>Description</label>
          <textarea
            placeholder="Describe the goal of this program..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="program-form-footer">
          {addAlert && <span className="pf-success">✓ Trial program added!</span>}
          <button className="btn-primary" type="submit" disabled={isLoading}>
            {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Add Program"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Trial;