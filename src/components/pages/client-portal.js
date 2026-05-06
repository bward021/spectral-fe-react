import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from "react-router-dom";
import ClientInfo from "../client-portal-helpers/client-information";
import FrequencyGraph from '../client-portal-helpers/frequency-graph';
import { API_URL } from "../api_url/api-url";
import AuthContext from '../Context/AuthContext';

const ClientPortal = () => {
  const { permissions } = useContext(AuthContext);
  const { slug } = useParams();
  const [clientInfo, setClientInfo] = useState({});
  const [trials, setTrials] = useState([]);
  const [editingTrial, setEditingTrial] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: `${API_URL}clients/${slug}`,
      withCredentials: true
    })
      .then((response) => setClientInfo(response.data))
      .catch((error) => console.log("error in ClientPortal:", error));

    axios({
      method: "get",
      url: `${API_URL}get-all-client-trials/${slug}`,
      withCredentials: true
    })
      .then((response) => setTrials(response.data))
      .catch((error) => console.log("error fetching trials:", error));
  }, [slug]);

  const handleEditSave = (trial) => {
    axios({
      method: "patch",
      url: `${API_URL}edit-trial/${trial.trial_id}`,
      data: {
        name: trial.trial_name,
        category: trial.trial_category,
        description: trial.trial_description,
      },
      withCredentials: true,
    })
      .then(() => {
        setTrials(trials.map((t) => t.trial_id === trial.trial_id ? trial : t));
        setEditingTrial(null);
      })
      .catch((error) => console.log("error editing trial:", error));
  };

  const handleDelete = (trialId) => {
    axios({
      method: "delete",
      url: `${API_URL}delete-trial/${trialId}`,
      withCredentials: true,
    })
      .then(() => setTrials(trials.filter((t) => t.trial_id !== trialId)))
      .catch((error) => console.log("error deleting trial:", error));
  };

  const getInitials = (first, last) => {
    return `${first?.[0] ?? ""}${last?.[0] ?? ""}`.toUpperCase();
  };

  return (
    <div className="page-wrapper">
      <div className="portal-hero">
        <div className="portal-hero-avatar">
          {getInitials(clientInfo.client_firstname, clientInfo.client_lastname)}
        </div>
        <div className="portal-hero-info">
          <h1>{clientInfo.client_firstname} {clientInfo.client_lastname}</h1>
          <p>Client ID: {slug} &mdash; Supervisor: {clientInfo.client_supervisor}</p>
        </div>
        {permissions === "Admin" && (
          <Link to={`/add-client-trial/${slug}`} className="btn-primary">
            + Add Program
          </Link>
        )}
      </div>

      <div className="portal-grid">
        <div className="portal-card">
          <ClientInfo clientInfo={clientInfo} />
        </div>
        <div className="portal-card">
          <div className="portal-card-header">
            <h3>Frequency Graph</h3>
          </div>
          <div className="portal-card-body">
            <FrequencyGraph id={slug} />
          </div>
        </div>
      </div>

      {permissions === "Admin" && (
        <div className="portal-trials-section">
          <div className="portal-trials-header">
            <h3>Programs</h3>
            <span className="portal-trials-count">{trials.length} programs</span>
          </div>

          {trials.length === 0 ? (
            <div className="portal-trials-empty">
              No programs found. <Link to={`/add-client-trial/${slug}`}>Add one →</Link>
            </div>
          ) : (
            <div className="portal-trials-list">
              {trials.map((trial) => (
                <div key={trial.trial_id} className="portal-trial-item">
                  {editingTrial?.trial_id === trial.trial_id ? (
                    <div className="trial-edit-form">
                      <div className="trial-edit-fields">
                        <input
                          type="text"
                          value={editingTrial.trial_name}
                          onChange={(e) => setEditingTrial({ ...editingTrial, trial_name: e.target.value })}
                        />
                        <select
                          value={editingTrial.trial_category}
                          onChange={(e) => setEditingTrial({ ...editingTrial, trial_category: e.target.value })}
                        >
                          <option value="Motor Skills">Motor Skills</option>
                          <option value="Fine Motor Skills">Fine Motor Skills</option>
                          <option value="Critical Thinking">Critical Thinking</option>
                          <option value="Educational">Educational</option>
                          <option value="DTT">DTT</option>
                          <option value="Natural">Natural</option>
                        </select>
                        <input
                          type="text"
                          value={editingTrial.trial_description}
                          onChange={(e) => setEditingTrial({ ...editingTrial, trial_description: e.target.value })}
                        />
                      </div>
                      <div className="trial-edit-actions">
                        <button className="btn-primary" onClick={() => handleEditSave(editingTrial)}>Save</button>
                        <button className="btn-secondary" onClick={() => setEditingTrial(null)}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="portal-trial-info">
                        <span className="portal-trial-name">{trial.trial_name}</span>
                        <span className="portal-trial-category">{trial.trial_category}</span>
                        <span className="portal-trial-desc">{trial.trial_description}</span>
                      </div>
                      <div className="portal-trial-actions">
                        <button className="btn-edit" onClick={() => setEditingTrial({ ...trial })}>Edit</button>
                        <button className="btn-delete" onClick={() => handleDelete(trial.trial_id)}>Delete</button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientPortal;