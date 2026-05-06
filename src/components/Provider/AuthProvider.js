import axios from "axios";
import React, { useState, useEffect } from "react";
import { API_URL } from "../api_url/api-url";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

const AuthProvider = (props) => {
  const [loggedInStatus, setLoggedInStatus] = useState("NOT_LOGGED_IN");
  const [permissions, setPermissions] = useState("");

  const navigate = useNavigate();

useEffect(() => {
    axios({
      method: "get",
      url: `${API_URL}api/v1/logged-in`,
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.employees_permissions) {
          setLoggedInStatus("LOGGED_IN");
          setPermissions(response.data.employees_permissions);
          navigate("/clients");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  // eslint-disable-next-line
  }, []);

  const handleSuccessfulLogout = () => {
    axios({
      method: "post",
      url: `${API_URL}api/v1/logout`,
      withCredentials: true,
    })
      .then(() => {
        setLoggedInStatus("NOT_LOGGED_IN");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSuccessfulLogin = (permissionsData) => {
    setLoggedInStatus("LOGGED_IN");
    setPermissions(permissionsData);
    navigate("/clients");
  };

  const state = {
    loggedInStatus,
    setLoggedInStatus,
    permissions,
    setPermissions,
    handleSuccessfulLogin,
    handleSuccessfulLogout,
  };

  return (
    <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;