import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../api_url/api-url";

const EmployeeForm = (props) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [permissions, setPermissions] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (props.employee) {
      setFirstname(props.employee.employees_first_name);
      setLastname(props.employee.employees_last_name);
      setEmail(props.employee.employees_email);
      setPermissions(props.employee.employees_permissions);
      setPassword("");
    } else {
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      setPermissions("");
    }
  }, [props.employee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const isEdit = !!props.employee;
    axios({
      method: isEdit ? "patch" : "post",
      url: `${API_URL}${isEdit ? "edit-employee" : "add-employee"}`,
      data: isEdit
        ? { id: props.employee.employees_id, firstname, lastname, email, password, permissions }
        : { firstname, lastname, email, password, permissions },
      withCredentials: true,
    })
      .then((response) => {
        props.setEmployees(response.data);
        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");
        setPermissions("");
        setIsLoading(false);
        if (props.onClose) props.onClose();
      })
      .catch((error) => {
        console.log("error in EmployeeForm:", error);
        setIsLoading(false);
      });
  };

  return (
    <div className="employee-form-body">
      <form className="employee-form" onSubmit={handleSubmit}>

        <div className="ef-section-label">Personal Info</div>

        <div className="ef-row">
          <div className="ef-field">
            <label>First Name</label>
            <input
              type="text"
              placeholder="Jane"
              value={firstname || ""}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>
          <div className="ef-field">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Doe"
              value={lastname || ""}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="ef-field">
          <label>Email</label>
          <input
            type="email"
            placeholder="jane@example.com"
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="ef-section-label">Security</div>

        <div className="ef-field">
          <label>{props.employee ? "New Password" : "Password"} <span className="ef-hint">{props.employee ? "(leave blank to keep current)" : ""}</span></label>
          <input
            type="password"
            placeholder="••••••••"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
            required={!props.employee}
          />
        </div>

        <div className="ef-section-label">Permissions</div>

        <div className="ef-field">
          <label>Role</label>
          <select
            value={permissions || ""}
            onChange={(e) => setPermissions(e.target.value)}
            required
          >
            <option value="">Select role</option>
            <option value="Admin">Admin</option>
            <option value="Employee">Employee</option>
          </select>
        </div>

        <div className="ef-footer">
          {props.onClose && (
            <button type="button" className="ef-btn-cancel" onClick={props.onClose}>
              Cancel
            </button>
          )}
          <button type="submit" className="ef-btn-submit" disabled={isLoading}>
            {isLoading
              ? <FontAwesomeIcon icon={faSpinner} spin />
              : props.employee ? "Save Changes" : "Add Employee"
            }
          </button>
        </div>

      </form>
    </div>
  );
};

export default EmployeeForm;