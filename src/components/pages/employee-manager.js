import axios from "axios";
import React, { useEffect, useState } from "react";
import EmployeeForm from "../employee-helpers/employee-form";
import { API_URL } from "../api_url/api-url";

const EmployeeManager = () => {
  const [employees, setEmployees] = useState([]);
  const [renderForm, setRenderForm] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: `${API_URL}get-all-employees`,
      withCredentials: true,
    })
      .then((response) => setEmployees(response.data))
      .catch((error) => console.log("error in EmployeeManager:", error));
  }, []);

  const handleDelete = (employee) => {
    axios({
      method: "delete",
      url: `${API_URL}delete-employee`,
      data: { id: employee.employees_id },
      withCredentials: true,
    })
      .then((response) => setEmployees(response.data))
      .catch((error) => console.log("error in E-Manager:", error));
  };

  const handleEditClick = (employee) => {
    setEmployeeToEdit(employee);
    setRenderForm(true);
  };

  const handleAddClick = () => {
    setEmployeeToEdit(null);
    setRenderForm(true);
  };

  const handleCloseForm = () => {
    setRenderForm(false);
    setEmployeeToEdit(null);
  };

  const getRoleBadgeClass = (permission) => {
    if (!permission) return "";
    const p = permission.toLowerCase();
    if (p.includes("admin")) return "role-admin";
    if (p.includes("supervisor")) return "role-supervisor";
    if (p.includes("therapist")) return "role-therapist";
    return "role-default";
  };

  const getInitials = (first, last) => {
    return `${first?.[0] ?? ""}${last?.[0] ?? ""}`.toUpperCase();
  };

  const renderEmployees = () => {
    if (employees.length === 0) {
      return (
        <div className="employees-empty">
          No employees found. Add one to get started!
        </div>
      );
    }
    return employees.map((employee) => (
      <div key={employee.employees_id} className="employee-row">
        <div className="employee-row-name">
          <div className="employee-avatar">
            {getInitials(employee.employees_first_name, employee.employees_last_name)}
          </div>
          <div>
            <div className="employee-name">
              {employee.employees_first_name} {employee.employees_last_name}
            </div>
            <div className="employee-email">{employee.employees_email}</div>
          </div>
        </div>
        <div className="employee-row-permission">
          <span className={`role-badge ${getRoleBadgeClass(employee.employees_permissions)}`}>
            {employee.employees_permissions}
          </span>
        </div>
        <div className="employee-row-actions">
          <button className="btn-edit" onClick={() => handleEditClick(employee)}>
            Edit
          </button>
          <button className="btn-delete" onClick={() => handleDelete(employee)}>
            Delete
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>Employees</h1>
        <p>Manage staff accounts and permissions.</p>
      </div>

      <div className={`employee-manager-layout ${renderForm ? "form-open" : ""}`}>

        <div className="employee-table-card">
          <div className="employee-table-toolbar">
            <span className="employee-count">
              {employees.length} {employees.length === 1 ? "employee" : "employees"}
            </span>
            <button className="btn-primary" onClick={handleAddClick}>
              + Add Employee
            </button>
          </div>

          <div className="employee-table-header">
            <div>Employee</div>
            <div>Role</div>
            <div>Actions</div>
          </div>

          <div className="employee-list">
            {renderEmployees()}
          </div>
        </div>

        {renderForm && (
          <div className="employee-form-panel">
            <div className="form-panel-header">
              <h3>{employeeToEdit ? "Edit Employee" : "New Employee"}</h3>
              <button className="form-panel-close" onClick={handleCloseForm}>✕</button>
            </div>
            <EmployeeForm
              employee={employeeToEdit}
              setEmployees={setEmployees}
              onClose={handleCloseForm}
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default EmployeeManager;