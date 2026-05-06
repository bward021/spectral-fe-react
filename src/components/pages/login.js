import React, { useState, useContext } from "react";
import axios from "axios";
import { API_URL } from "../api_url/api-url";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../Context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { handleSuccessfulLogin } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios({
      method: "post",
      url: `${API_URL}login`,
      data: {
        username: { username },
        password: { password },
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.id || response.data.id === 1) {
          handleSuccessfulLogin(response.data.permissions);
          setIsLoading(false);
          setError(false);
        } else {
          setError(true);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log("Some error occured", error);
        setError(true);
        setIsLoading(false);
      });
  };
  return (
    <div className="login-page-container">
      <div className="login-left-column">
        <div className="login-left-content">
          <div className="login-puzzle">
            <div className="puzzle-piece piece-blue"></div>
            <div className="puzzle-piece piece-red"></div>
            <div className="puzzle-piece piece-yellow"></div>
            <div className="puzzle-piece piece-green"></div>
          </div>
          <h1>Spectral</h1>
          <p>Behavior tracking for ABA therapy professionals</p>
        </div>
        <div className="login-card">
          <h2>Welcome Back</h2>
          <p>Sign in to your Spectral account</p>
          {error && <p className="login-error">Incorrect Username or Password</p>}
          <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
            <div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Email"
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <div>
              <button onClick={() => setIsLoading(true)}>
                {!isLoading ? "Sign In" : <FontAwesomeIcon icon={faSpinner} spin />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}