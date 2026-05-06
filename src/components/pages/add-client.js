import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api_url/api-url";

const AddClient = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [addressOne, setAddressOne] = useState("");
  const [addressTwo, setAddressTwo] = useState("");
  const [city, setCity] = useState("");
  const [st, setSt] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${API_URL}add-client`,
      data: { firstName, lastName, age, gender, supervisor, addressOne, addressTwo, city, st, postalCode },
      withCredentials: true
    })
      .then(() => {
        setSubmitted(true);
        setTimeout(() => navigate("/clients"), 1200);
      })
      .catch(error => console.log("error:", error));
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>Add Client</h1>
        <p>Fill out the form below to add a new client to the system.</p>
      </div>

      <div className="add-client-card">

        <div className="card-section">
          <p className="section-label">Personal Information</p>
          <div className="form-grid">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" placeholder="Jane" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Age</label>
              <input type="number" placeholder="8" value={age} onChange={(e) => setAge(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="form-group">
              <label>Supervisor</label>
              <input type="text" placeholder="Supervisor name" value={supervisor} onChange={(e) => setSupervisor(e.target.value)} required />
            </div>
          </div>
        </div>

        <div className="card-section">
          <p className="section-label">Address</p>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Address Line 1</label>
              <input type="text" placeholder="123 Main St" value={addressOne} onChange={(e) => setAddressOne(e.target.value)} required />
            </div>
            <div className="form-group full-width">
              <label>Address Line 2 <span className="optional">(optional)</span></label>
              <input type="text" placeholder="Apt, suite, etc." value={addressTwo} onChange={(e) => setAddressTwo(e.target.value)} />
            </div>
            <div className="form-group">
              <label>City</label>
              <input type="text" placeholder="Salt Lake City" value={city} onChange={(e) => setCity(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>State</label>
              <select value={st} onChange={(e) => setSt(e.target.value)} required>
                <option value="">Select state</option>
                <option value="UT">UT</option>
              </select>
            </div>
            <div className="form-group">
              <label>Postal Code</label>
              <input type="text" placeholder="84101" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
            </div>
          </div>
        </div>

        <div className="card-footer">
          {submitted && <span className="submit-success">✓ Client added! Redirecting...</span>}
          <button className="btn-secondary" type="button" onClick={() => navigate("/clients")}>Cancel</button>
          <button className="btn-primary" onClick={handleSubmit}>Add Client</button>
        </div>

      </div>
    </div>
  );
};

export default AddClient;