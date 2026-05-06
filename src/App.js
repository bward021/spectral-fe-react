import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Clients from "./components/pages/clients";
import Login from "./components/pages/login";
import ClientPortal from "./components/pages/client-portal";
import Data from "./components/pages/data";
import NavigationComponent from "./components/navigation/nav-bar";
import AddClient from "./components/pages/add-client";
import AddClientTrial from "./components/pages/add-client-trial";
import EmployeeManager from "./components/pages/employee-manager";
import AuthContext from "./components/Context/AuthContext";

function App() {
  const { loggedInStatus, permissions } = useContext(AuthContext);

  return (
    <div className="App">
      <NavigationComponent />
      <div>
        <Routes>
          <Route path="/" element={<Login />} />

          {loggedInStatus === "LOGGED_IN" && (
            <>
              <Route path="/clients" element={<Clients />} />
              <Route path="/clients/:slug" element={<ClientPortal />} />
              <Route path="/data/:slug" element={<Data />} />
            </>
          )}

          {loggedInStatus === "LOGGED_IN" && permissions === "Admin" && (
            <>
              <Route path="/add-client" element={<AddClient />} />
              <Route path="/add-client-trial/:slug" element={<AddClientTrial />} />
              <Route path="/employee-manager" element={<EmployeeManager />} />
            </>
          )}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;