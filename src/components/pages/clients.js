import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../api_url/api-url";

const Clients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `${API_URL}clients`,
      withCredentials: true,
    })
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.log("error in Clients: ", error);
      });
  }, []);

  const renderClients = () => {
    return clients.map((client) => {
      const clientId = client.client_id;
      return (
        <div key={clientId} className="client-row">
          <Link to={`/data/${clientId}`} className="client-row-data">
            <div>{client.client_firstname}</div>
            <div>{client.client_lastname}</div>
            <div>{client.client_age}</div>
            <div>{client.client_supervisor}</div>
          </Link>
          <Link to={`/clients/${clientId}`} className="client-portal-btn">
            View Portal
          </Link>
        </div>
      );
    });
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>Clients</h1>
      </div>
      <div className="clients-table">
        <div className="clients-table-header">
          <div>First Name</div>
          <div>Last Name</div>
          <div>Age</div>
          <div>Supervisor</div>
          <div>Portal</div>
        </div>
        {clients.length === 0 ? (
          <div className="clients-empty">No clients found. Add one to get started!</div>
        ) : (
          renderClients()
        )}
      </div>
    </div>
  );
};

export default Clients;