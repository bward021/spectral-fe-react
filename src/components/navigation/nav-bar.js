import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const NavigationComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState("light");

  const {
    loggedInStatus,
    permissions,
    handleSuccessfulLogout,
  } = useContext(AuthContext);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(function () {
      setIsLoading(false);
    }, 7000);
    handleSuccessfulLogout();
  };

  const renderNavBarLinks = () => {
    if (loggedInStatus === "LOGGED_IN" && permissions === "Admin") {
      return (
        <div className="nav-wrapper">
          <div className="nav-brand">Spectral</div>
          <div className="nav-links">
            <div className="nav-link-wrapper">
              <NavLink to="/clients">Home</NavLink>
            </div>
            <div className="nav-link-wrapper">
              <NavLink to="/add-client">Add Client</NavLink>
            </div>
            <div className="nav-link-wrapper">
              <NavLink to="/employee-manager">Employees</NavLink>
            </div>
          </div>
          <div className="nav-actions">
            <button className="theme-toggle" onClick={toggleTheme}>
              <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
            </button>
            <button className="btn-danger logout-btn" onClick={handleSuccessfulLogout}>
              Logout
            </button>
          </div>
        </div>
      );
    } else if (loggedInStatus === "LOGGED_IN") {
      return (
        <div className="nav-wrapper">
          <div className="nav-brand">Spectral</div>
          <div className="nav-links">
            <div className="nav-link-wrapper">
              <NavLink to="/clients">Home</NavLink>
            </div>
          </div>
          <div className="nav-actions">
            <button className="theme-toggle" onClick={toggleTheme}>
              <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
            </button>
            <button className="btn-danger logout-btn" onClick={() => handleClick()}>
              {!isLoading ? "Logout" : <FontAwesomeIcon icon={faSpinner} spin />}
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="nav-wrapper nav-wrapper--minimal">
          <div className="nav-brand">Spectral</div>
          <button className="theme-toggle" onClick={toggleTheme}>
            <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
          </button>
        </div>
      );
    }
  };

  return <nav className="navbar">{renderNavBarLinks()}</nav>;
};

export default NavigationComponent;