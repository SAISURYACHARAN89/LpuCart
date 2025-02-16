import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { backendContext } from "./AuthContext";
import "./css/Formcss.css";

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const {backendurl} = useContext(backendContext);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Both email and password are required");
      return;
    }

    try {
      const response = await fetch(`${backendurl}/verse/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Invalid credentials");
      }

      const data = await response.json();
      login(data.tokens.access.token);
      alert("Login successful!");
      navigate("/products");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="Formcontainer">
      <form>
        <p className="signup">Login</p>
        <div className="input-container">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-container">
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="button" className="btn" onClick={handleLogin}>Login</button>
        <p>Don't have an account? <Link to="/">Signup</Link></p>
      </form>
    </div>
  );
}

export default Login;
