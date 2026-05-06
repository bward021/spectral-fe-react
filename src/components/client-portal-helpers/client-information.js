import React from "react";
import Address from '../client-portal-helpers/address';

const ClientInfo = ({ clientInfo }) => {
  const {
    client_id,
    client_age,
    client_firstname,
    client_lastname,
    client_gender,
    client_supervisor,
  } = clientInfo;

  return (
    <div className="client-info-card">
      <div className="portal-card-header">
        <h3>Client Information</h3>
      </div>
      <div className="portal-card-body">
        <div className="client-info-grid">
          <div className="client-info-item">
            <span className="info-label">First Name</span>
            <span className="info-value">{client_firstname}</span>
          </div>
          <div className="client-info-item">
            <span className="info-label">Last Name</span>
            <span className="info-value">{client_lastname}</span>
          </div>
          <div className="client-info-item">
            <span className="info-label">Age</span>
            <span className="info-value">{client_age}</span>
          </div>
          <div className="client-info-item">
            <span className="info-label">Gender</span>
            <span className="info-value">{client_gender}</span>
          </div>
          <div className="client-info-item">
            <span className="info-label">Supervisor</span>
            <span className="info-value">{client_supervisor}</span>
          </div>
        </div>
        <Address id={client_id} />
      </div>
    </div>
  );
};

export default ClientInfo;